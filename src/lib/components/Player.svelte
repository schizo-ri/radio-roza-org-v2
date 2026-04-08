<script lang="ts">
  import { browser } from '$app/environment';
  import { untrack } from 'svelte';
  import Hls from 'hls.js';
  import { playerState } from '$lib/stores/player.svelte';
  import { getAlbumArt, getArtistFanart } from '$lib/utils/artwork';
  import type { ArtworkSizes, ArtistFanart } from '$lib/utils/artwork';
  import { slide } from 'svelte/transition';
  import { getCurrentShow, getNextShow, blocks } from '$lib/utils/program';

  let audioEl = $state<HTMLAudioElement | undefined>(undefined);
  let hlsInstance: Hls | null = null;
  let isPlaying = $state(false);
  let loading = $state(false);
  let error = $state<string | null>(null);
  let expanded = $state(false);

  const currentShow = $derived(playerState.isLive ? getCurrentShow() : null);
  const nextShow = $derived(playerState.isLive ? getNextShow() : null);
  const currentDescription = $derived(currentShow ? (blocks[currentShow.title] ?? null) : null);

  // Artwork state — updated on each song change
  let artwork = $state<ArtworkSizes | null>(null);
  let artistFanart = $state<ArtistFanart | null>(null);

  // Now-playing polling internals (non-reactive, internal bookkeeping)
  let nowPlayingText = ''; // tracks last seen "artist - title" string to detect changes
  let isFetching = false;
  let fetchDebounceTimeout: ReturnType<typeof setTimeout> | null = null;

  // Stream retry internals
  let retryTimeout: ReturnType<typeof setTimeout> | null = null;

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
      if (!audioEl || isPlaying) return;
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

  function setupMediaSessionHandlers() {
    if (!browser || !('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.setActionHandler('play', () => {
        audioEl?.play().catch(() => {});
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioEl?.pause();
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        audioEl?.pause();
      });
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
  // startLoad(-1) alone doesn't help — the audio element already has stale data buffered.
  // detachMedia() removes the MediaSource from the element (clears the buffer),
  // then loadSource + attachMedia restart from live edge without destroying the HLS instance.
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

    const onVisibilityChange = () => onRegainFocus();
    const onWindowFocus = () => onRegainFocus();

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('focus', onWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('focus', onWindowFocus);
    };
  });

  // Poll only when playing the live stream
  $effect(() => {
    if (!browser || !playerState.isLive) return;

    setupMediaSessionHandlers();
    updateMediaSessionMetadata(); // set default metadata immediately, don't wait for fetch
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlayingSimple, 5000);

    return () => {
      clearInterval(interval);
      if (fetchDebounceTimeout) clearTimeout(fetchDebounceTimeout);
    };
  });

  // Update MediaSession when switching to an archive source
  $effect(() => {
    if (!browser || playerState.isLive) return;
    // Clear artwork from previous live session
    artwork = null;
    artistFanart = null;
    updateMediaSessionMetadata();
  });

  $effect(() => {
    if (!browser || !audioEl) return;

    const src = playerState.src;
    const wasPlaying = untrack(() => isPlaying);

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
            error = 'Stream nije dostupan.';
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
      clearRetry();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
        updateMediaSessionMetadata();
      }
    };
    const onPause = () => {
      isPlaying = false;
      clearRetry();
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
    };
    const onWaiting = () => {
      loading = true;
      scheduleRetry();
    };
    const onCanPlay = () => {
      loading = false;
      clearRetry();
    };

    el.addEventListener('playing', onPlaying);
    el.addEventListener('pause', onPause);
    el.addEventListener('waiting', onWaiting);
    el.addEventListener('canplay', onCanPlay);

    return () => {
      clearRetry();
      hlsInstance?.destroy();
      hlsInstance = null;
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('waiting', onWaiting);
      el.removeEventListener('canplay', onCanPlay);
    };
  });

  function togglePlay() {
    if (!audioEl) return;
    error = null;
    if (isPlaying) {
      audioEl.pause();
    } else {
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

<div class="player" class:expanded>
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

    <button
      class="expand-btn"
      onclick={() => (expanded = !expanded)}
      aria-expanded={expanded}
      aria-label={expanded ? 'Smanji player' : 'Proširi player'}
    >
      {#if expanded}
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="1,6 6,1 11,6" />
        </svg>
      {:else}
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="1,1 6,6 11,1" />
        </svg>
      {/if}
    </button>
  </div>

  {#if error}
    <p class="player-error">{error}</p>
  {/if}

  {#if expanded}
    <div class="player-expanded" transition:slide={{ duration: 200 }}>
      {#if playerState.isLive}
        <div class="expanded-cover">
          {#if artwork}
            <img src={artwork.medium} alt={playerState.artist} />
          {:else}
            <div class="cover-placeholder" aria-hidden="true"></div>
          {/if}
        </div>
        <!-- <div class="expanded-content"> -->
        <div class="expanded-now">
          <span class="row-label">Sada</span>
          <div class="show-row">
            {#if currentShow}
              <span class="show-time">{currentShow.show_start}</span>
              <span class="show-title">{currentShow.title}</span>
            {:else}
              <span class="show-title">Radio Roža</span>
            {/if}
          </div>
        </div>
        <div class="expanded-desc">
          {#if currentDescription}
            <p>{currentDescription}</p>
          {/if}
        </div>
        <div class="expanded-next">
          <span class="row-label">Sljedeće</span>
          <div class="show-row">
            {#if nextShow}
              <span class="show-time">{nextShow.show_start}</span>
              <span class="show-title">{nextShow.title}</span>
            {:else}
              <span class="show-title">—</span>
            {/if}
          </div>
        </div>
        <div class="expanded-tags">
          <span class="tag">Hip hop</span>
          <span class="tag">Rap</span>
          <span class="tag">Underground</span>
        </div>
        <!-- </div> -->
      {:else}
        <div class="expanded-cover">
          <div class="cover-placeholder" aria-hidden="true"></div>
        </div>
        <div class="expanded-content">
          <div class="expanded-now">
            <span class="row-label">Arhiva</span>
            <div class="show-row">
              <span class="show-title">{playerState.artist}</span>
            </div>
          </div>
          <div class="expanded-tags">
            <span class="tag">Arhiva</span>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<audio bind:this={audioEl} preload="none"></audio>

<style>
  .player {
    position: sticky;
    top: 0;
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

  /* Expand button */
  .expand-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    color: var(--color-black);
  }

  .player-error {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-brand);
    padding: 0.25rem 1rem 0.5rem;
  }

  /* Expanded panel */
  .player-expanded {
    /*display: flex;*/
    border-top: 1px solid rgb(0 0 0 / 0.08);
    overflow: hidden;
    display: grid;
    grid-template-areas:
      'cover now'
      'cover next'
      'tags tags';
    grid-template-columns: 120px minmax(0, 1fr);
  }

  .expanded-cover {
    grid-area: cover;
    flex-shrink: 0;
    width: 120px;
    aspect-ratio: 1;
    /*align-self: stretch;*/
  }

  .expanded-cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-placeholder {
    width: 100%;
    height: 100%;
    min-height: 80px;
    background: rgb(0 0 0 / 0.07);
  }

  .expanded-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .expanded-now,
  .expanded-desc,
  .expanded-next,
  .expanded-tags {
    padding: 0.625rem 1rem;
  }

  .expanded-now {
    grid-area: now;
  }

  .expanded-next {
    grid-area: next;
  }

  .expanded-now,
  .expanded-next {
    border-bottom: 1px solid rgb(0 0 0 / 0.06);
  }

  .expanded-desc {
    grid-area: description;
    display: none;
    border-bottom: 1px solid rgb(0 0 0 / 0.06);
    font-size: var(--text-body);
    line-height: 1.5;
    color: rgb(0 0 0 / 0.55);
  }

  .expanded-desc p {
    margin: 0;
  }

  .row-label {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.4);
    margin-bottom: 0.125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .show-row {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .show-time {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    color: var(--color-black);
    flex-shrink: 0;
  }

  .show-title {
    font-family: var(--font-display);
    font-size: var(--text-body);
    color: var(--color-black);
  }

  .expanded-tags {
    grid-area: tags;
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-top: auto;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-white);
    background: var(--color-black);
    padding: 0.2rem 0.625rem;
    border-radius: 100px;
  }

  /* Tablet: show description */
  @media (min-width: 800px) {
    .expanded-desc {
      display: block;
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

    .expanded-cover {
      width: 180px;
    }

    .expanded-now,
    .expanded-desc,
    .expanded-next,
    .expanded-tags {
      padding: 0.875rem 1.25rem;
    }
  }
</style>
