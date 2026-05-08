<script lang="ts">
  import { browser } from '$app/environment';
  import { untrack } from 'svelte';
  import Hls from 'hls.js';
  import { playerState } from '$lib/stores/player.svelte';
  import { getAlbumArt, getArtistFanart } from '$lib/utils/artwork';
  import type { ArtworkSizes, ArtistFanart } from '$lib/utils/artwork';

  let audioEl = $state<HTMLAudioElement | undefined>(undefined);
  let hlsInstance: Hls | null = null;
  let isPlaying = $state(false);
  let loading = $state(false);
  let error = $state<string | null>(null);

  // Artwork state — updated on each song change
  let artwork = $state<ArtworkSizes | null>(null);
  let artistFanart = $state<ArtistFanart | null>(null);

  // Now-playing polling internals (non-reactive, internal bookkeeping)
  let nowPlayingText = ''; // tracks last seen "artist - title" string to detect changes
  let isFetching = false;
  let fetchDebounceTimeout: ReturnType<typeof setTimeout> | null = null;

  // Stream retry internals
  let retryTimeout: ReturnType<typeof setTimeout> | null = null;
  let userPaused = false; // true when user explicitly paused; prevents retry loop

  function clearRetry() {
    if (retryTimeout) {
      clearTimeout(retryTimeout);
      retryTimeout = null;
    }
  }

  function scheduleRetry() {
    clearRetry();
    retryTimeout = setTimeout(() => {
      retryTimeout = null;
      if (!audioEl || isPlaying || userPaused) return;
      if (hlsInstance) {
        hlsInstance.stopLoad();
        hlsInstance.startLoad(-1); // reload from live edge
      } else if (audioEl.src) {
        audioEl.load();
      }
      audioEl.play().catch(() => {});
      scheduleRetry(); // keep retrying until playing or paused
    }, 10_000);
  }

  // Reload button — shown after 5s of stuck loading, or on fatal error
  let showReload = $state(false);
  let showReloadTimer: ReturnType<typeof setTimeout> | null = null;

  function armReloadBtn() {
    if (showReloadTimer || showReload) return;
    showReloadTimer = setTimeout(() => {
      showReload = true;
      showReloadTimer = null;
    }, 5000);
  }

  function hideReloadBtn() {
    if (showReloadTimer) {
      clearTimeout(showReloadTimer);
      showReloadTimer = null;
    }
    showReload = false;
  }

  // Manual reconnect — reinitialises HLS and attempts playback
  let reconnectKey = $state(0);
  let reconnectShouldPlay = false;
  let wasPlayingBeforeDisconnect = false;

  function reconnect(shouldPlay = true) {
    if (!audioEl) return;
    error = null;
    loading = true;
    hideReloadBtn();
    clearRetry();
    reconnectShouldPlay = shouldPlay;
    reconnectKey++;
  }

  const NOW_PLAYING_URL = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.json';
  const NOW_PLAYING_SIMPLE_URL = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.txt';
  const IGNORE_ARTISTS = ['radio roža', 'radio roza', 'jingl'];

  // --- Artwork helpers ---

  function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  }

  async function preloadArtworkImages(art: ArtworkSizes | null, fanart: ArtistFanart | null) {
    const urls: string[] = [];
    if (art) {
      if (art.thumbnail) urls.push(art.thumbnail);
      if (art.medium) urls.push(art.medium);
      if (art.large) urls.push(art.large);
    }
    if (fanart?.banner) urls.push(fanart.banner);
    else if (fanart?.fanart) urls.push(fanart.fanart);
    await Promise.all(urls.map(preloadImage));
  }

  // --- MediaSession ---

  function updateMediaSessionMetadata() {
    if (!browser || !('mediaSession' in navigator)) return;

    const getMime = (src: string): string => (src.endsWith('.png') ? 'image/png' : 'image/jpeg');

    const artworkEntries: MediaImage[] = artwork
      ? [
          { src: artwork.thumbnail, sizes: '128x128', type: getMime(artwork.thumbnail) },
          { src: artwork.medium, sizes: '300x300', type: getMime(artwork.medium) },
          { src: artwork.large, sizes: '600x600', type: getMime(artwork.large) },
        ]
      : [];

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playerState.title || 'Live Stream',
        artist: playerState.artist,
        artwork: artworkEntries,
      });
    } catch (e) {
      console.warn('MediaSession metadata failed:', e);
    }
  }

  function skipToLive() {
    if (!audioEl) return;
    const d = audioEl.duration;
    if (d && isFinite(d)) {
      audioEl.currentTime = Math.max(0, d - 5);
    } else if (hlsInstance && hlsInstance.liveSyncPosition != null) {
      audioEl.currentTime = hlsInstance.liveSyncPosition;
    }
  }

  // Checked once at setup — capability doesn't change at runtime
  let canSetPositionState = false;

  function updatePositionState() {
    if (!canSetPositionState || !audioEl) return;
    const d = audioEl.duration;
    const t = audioEl.currentTime;
    if (!d || !isFinite(d) || !isFinite(t)) return;
    try {
      navigator.mediaSession.setPositionState({ duration: d, position: Math.min(t, d), playbackRate: 1 });
    } catch {
      canSetPositionState = false;
    }
  }

  function setupMediaSessionHandlers() {
    if (!browser || !('mediaSession' in navigator)) return;
    canSetPositionState = !!navigator.mediaSession.setPositionState;
    try {
      navigator.mediaSession.setActionHandler('play', () => {
        userPaused = false;
        audioEl?.play().catch(() => {});
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        userPaused = true;
        audioEl?.pause();
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        userPaused = true;
        audioEl?.pause();
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        if (audioEl) audioEl.currentTime = Math.max(0, audioEl.currentTime - 30);
      });
      navigator.mediaSession.setActionHandler('seekforward', skipToLive);
      navigator.mediaSession.setActionHandler('nexttrack', skipToLive);
    } catch (e) {
      console.warn('MediaSession handlers failed:', e);
    }
  }

  // --- Now-playing polling ---

  const fetchNowPlaying = async () => {
    if (isFetching) return;
    isFetching = true;

    try {
      const res = await fetch(NOW_PLAYING_URL);
      const data: { now_playing?: { song?: { artist: string; title: string; text: string } } } =
        await res.json();

      if (!data?.now_playing?.song) return;

      const { artist, title, text } = data.now_playing.song;

      // Skip if nothing changed
      if (text === nowPlayingText) return;

      let newArtwork: ArtworkSizes | null = null;
      let newFanart: ArtistFanart | null = null;

      if (artist && !IGNORE_ARTISTS.includes(artist.toLowerCase())) {
        [newArtwork, newFanart] = await Promise.all([
          getAlbumArt(artist, title),
          getArtistFanart(artist),
        ]);
        // Preload before updating state to avoid flash
        await preloadArtworkImages(newArtwork, newFanart);
      }

      // Atomic state update
      nowPlayingText = text;
      playerState.artist = artist;
      playerState.title = title;
      artwork = newArtwork;
      artistFanart = newFanart;

      updateMediaSessionMetadata();
    } catch (e) {
      console.error('Error fetching now playing:', e);
    } finally {
      isFetching = false;
    }
  };

  const fetchNowPlayingSimple = async () => {
    try {
      const res = await fetch(NOW_PLAYING_SIMPLE_URL);
      const text = await res.text();
      if (text && text.trim() !== nowPlayingText) {
        // Debounce: wait 3s for metadata to stabilize before full fetch
        if (fetchDebounceTimeout) clearTimeout(fetchDebounceTimeout);
        fetchDebounceTimeout = setTimeout(fetchNowPlaying, 3000);
      }
    } catch (e) {
      console.error('Error polling now playing:', e);
    }
  };

  // Reset HLS to live edge when tab regains focus while paused.
  // detachMedia() removes the MediaSource from the element (clears stale buffer),
  // then loadSource + attachMedia restart from live edge without destroying the HLS instance.
  $effect(() => {
    if (!browser) return;

    let resetPending = false;

    function resetToLiveEdge() {
      if (resetPending) return;
      resetPending = true;
      setTimeout(() => { resetPending = false; }, 500);

      hlsInstance!.stopLoad();
      hlsInstance!.detachMedia();
      hlsInstance!.loadSource(playerState.src);
      hlsInstance!.attachMedia(audioEl!);
    }

    function onRegainFocus() {
      if (document.visibilityState !== 'visible') return;
      if (isPlaying || !playerState.isLive || !hlsInstance || !audioEl) return;
      resetToLiveEdge();
    }

    document.addEventListener('visibilitychange', onRegainFocus);
    window.addEventListener('focus', onRegainFocus);

    return () => {
      document.removeEventListener('visibilitychange', onRegainFocus);
      window.removeEventListener('focus', onRegainFocus);
    };
  });

  // Auto-reconnect when browser comes back online after suspension.
  // HLS destroys itself on fatal network errors, so when we get the `online`
  // event we reinitialise only if the player is in an error/broken state.
  // Delay 1.5s: `online` fires when the network interface comes up, but DNS
  // resolution can still fail for a second or two after that.
  $effect(() => {
    if (!browser) return;

    let onlineTimer: ReturnType<typeof setTimeout> | null = null;

    function onOnline() {
      if (error || !hlsInstance) {
        if (onlineTimer) clearTimeout(onlineTimer);
        onlineTimer = setTimeout(() => {
          onlineTimer = null;
          reconnect(wasPlayingBeforeDisconnect);
          wasPlayingBeforeDisconnect = false;
        }, 1500);
      }
    }

    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
      if (onlineTimer) clearTimeout(onlineTimer);
    };
  });

  $effect(() => {
    if (!browser) return;

    if (!playerState.isLive) {
      artwork = null;
      artistFanart = null;
      updateMediaSessionMetadata();
      return;
    }

    setupMediaSessionHandlers();
    updateMediaSessionMetadata();
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlayingSimple, 5000);

    return () => {
      clearInterval(interval);
      if (fetchDebounceTimeout) clearTimeout(fetchDebounceTimeout);
    };
  });

  $effect(() => {
    if (!browser || !audioEl) return;

    const src = playerState.src;
    const _key = reconnectKey; // re-run on manual reconnect
    const wasPlaying = untrack(() => isPlaying) || reconnectShouldPlay;
    reconnectShouldPlay = false;

    hlsInstance?.destroy();
    hlsInstance = null;
    loading = false;
    error = null;

    const el = audioEl;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 20,
        maxMaxBufferLength: 30,
      });

      hls.loadSource(src);
      hls.attachMedia(el);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (wasPlaying) el.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          } else {
            wasPlayingBeforeDisconnect = isPlaying;
            error = 'Stream nije dostupan.';
            loading = false;
            clearRetry();
            hideReloadBtn();
            hls.destroy();
            if (hlsInstance === hls) hlsInstance = null;
          }
        }
      });

      hlsInstance = hls;
    } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = src;
      if (wasPlaying) el.play().catch(() => {});
    } else {
      error = 'Vaš preglednik ne podržava HLS stream.';
    }

    const onPlaying = () => {
      isPlaying = true;
      loading = false;
      error = null;
      userPaused = false;
      clearRetry();
      hideReloadBtn();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
        updateMediaSessionMetadata();
      }
    };
    const onPause = () => {
      isPlaying = false;
      clearRetry();
      hideReloadBtn();
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
    };
    const onWaiting = () => {
      loading = true;
      scheduleRetry();
      armReloadBtn();
    };
    const onCanPlay = () => {
      loading = false;
      error = null;
      clearRetry();
      hideReloadBtn();
    };

    // Throttled timeupdate — ~4 FPS is enough for lock-screen position state
    let lastPositionUpdate = 0;
    const onTimeUpdate = () => {
      const now = Date.now();
      if (now - lastPositionUpdate > 250) {
        lastPositionUpdate = now;
        updatePositionState();
      }
    };

    el.addEventListener('playing', onPlaying);
    el.addEventListener('pause', onPause);
    el.addEventListener('waiting', onWaiting);
    el.addEventListener('canplay', onCanPlay);
    el.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      clearRetry();
      hideReloadBtn();
      hlsInstance?.destroy();
      hlsInstance = null;
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('waiting', onWaiting);
      el.removeEventListener('canplay', onCanPlay);
      el.removeEventListener('timeupdate', onTimeUpdate);
    };
  });

  // Pause HLS when Mixcloud embed takes over
  $effect(() => {
    if (playerState.mixcloudShow && audioEl && isPlaying) {
      userPaused = true;
      audioEl.pause();
    }
  });

  function togglePlay() {
    if (!audioEl) return;
    error = null;
    if (isPlaying) {
      userPaused = true;
      audioEl.pause();
    } else {
      userPaused = false;
      loading = true;
      scheduleRetry();
      audioEl.play().catch((e: unknown) => {
        loading = false;
        clearRetry();
        error = 'Reprodukcija nije moguća.';
        console.error('play() failed:', e);
      });
    }
  }
</script>

<div class="player">
  <div class="player-bar">
    <button
      class="play-btn"
      onclick={togglePlay}
      aria-label={isPlaying ? 'Pauziraj' : 'Reproduciraj'}
    >
      {#if loading}
        <span class="spinner" aria-hidden="true"></span>
      {:else if isPlaying}
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <rect x="2" y="2" width="4" height="12" />
          <rect x="10" y="2" width="4" height="12" />
        </svg>
      {:else}
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <polygon points="2,1 14,8 2,15" />
        </svg>
      {/if}
    </button>

    <div class="now-playing">
      <span class="source-badge">
        {#if playerState.isLive}
          <span class="live-dot" aria-hidden="true"></span>
          <span class="live-label">Live</span>
        {:else}
          <span class="archive-label">Arhiva</span>
        {/if}
      </span>
      <span class="track-info">
        {#if playerState.title}
          {playerState.artist} – {playerState.title}
        {:else}
          {playerState.artist}
        {/if}
      </span>
    </div>

  </div>

  {#if error || showReload}
    <div class="player-status">
      {#if error}
        <span class="player-error">{error}</span>
      {/if}
      <button class="reload-btn" onclick={() => reconnect()}>osvježi</button>
    </div>
  {/if}

</div>

<audio bind:this={audioEl} preload="none"></audio>

<style>
  .player {
    position: sticky;
    top: var(--nav-offset, 60px);
    transition: top 0.3s ease;
    z-index: 200;
    background: var(--color-white);
    border-bottom: 1px solid rgb(0 0 0 / 0.08);
  }

  .player-bar {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 1rem;
    gap: 0.75rem;
  }

  /* Play button */
  .play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: var(--color-black);
  }

  /* Loading spinner */
  .spinner {
    display: block;
    width: 16px;
    height: 16px;
    border: 2px solid rgb(0 0 0 / 0.15);
    border-top-color: var(--color-black);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Now playing area */
  .now-playing {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex: 1;
    min-width: 0;
  }

  /* Source badge — hidden on mobile, shown on desktop */
  .source-badge {
    display: none;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .live-dot {
    display: block;
    width: 7px;
    height: 7px;
    background: var(--color-brand);
    border-radius: 50%;
  }

  .live-label,
  .archive-label {
    font-family: var(--font-display);
    font-size: var(--text-meta);
    color: var(--color-black);
  }

  /* Track info */
  .track-info {
    font-family: var(--font-display);
    font-size: var(--text-body);
    color: var(--color-black);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-status {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.25rem 1rem 0.5rem;
  }

  .player-error {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-brand);
  }

  .reload-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-brand);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .reload-btn:hover {
    opacity: 0.7;
  }

  /* Tablet+: larger play/pause icons */
  @media (min-width: 640px) {
    .play-btn {
      width: 44px;
      height: 44px;
    }

    .play-btn svg {
      width: 32px;
      height: 32px;
    }

    .spinner {
      width: 32px;
      height: 32px;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .player-bar {
      height: 70px;
      padding: 0 1.25rem;
    }

    .source-badge {
      display: flex;
    }

    .track-info {
      font-size: var(--text-title);
    }

  }
</style>
