<script lang="ts">
  import { untrack } from 'svelte';
  import type Hls from 'hls.js';
  import { playerState } from '$lib/stores/player.svelte';
  import { getAlbumArt } from '$lib/utils/artwork';
  import type { ArtworkSizes } from '$lib/utils/artwork';

  const NOW_PLAYING_URL = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.json';
  const NOW_PLAYING_SIMPLE_URL = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.txt';
  const LIVE_MP3_FALLBACK = 'https://radio.radio-roza.org/listen/radioroza/live.mp3';
  const IGNORE_ARTISTS = ['radio roža', 'radio roza', 'jingl'];

  const STALL_TIMEOUT_MS = 8000; // no audio within this window counts as a failed attempt
  const MAX_ATTEMPTS = 12; // ~2 min of automatic retrying before giving up
  const LONG_OUTAGE_ATTEMPT = 3; // after this many attempts the message switches to "unavailable"

  type Status = 'idle' | 'loading' | 'retrying' | 'playing' | 'failed' | 'unsupported';

  let audioEl = $state<HTMLAudioElement | undefined>(undefined);
  let status = $state<Status>('idle');
  let attempt = $state(0);
  let artwork = $state<ArtworkSizes | null>(null);

  const isActive = $derived(status === 'playing' || status === 'loading' || status === 'retrying');

  const statusMessage = $derived.by(() => {
    if (status === 'retrying') {
      return attempt <= LONG_OUTAGE_ATTEMPT
        ? 'Povezivanje sa streamom…'
        : 'Stream je trenutno nedostupan — pokušavamo se ponovno spojiti…';
    }
    if (status === 'failed') {
      return 'Stream trenutno nije dostupan. Pritisnite play za novi pokušaj.';
    }
    if (status === 'unsupported') {
      return 'Vaš preglednik ne podržava reprodukciju streama.';
    }
    return null;
  });

  // --- Playback (non-reactive bookkeeping) ---

  type HlsClass = (typeof import('hls.js'))['default'];

  let hls: Hls | null = null;
  let hlsLoadPromise: Promise<HlsClass | null> | null = null;
  let wantsPlaying = false; // the user's intent — all recovery logic works to satisfy it
  let usingNativeSrc = false; // native HLS / MP3 fallback path (no MSE)
  let stallTimer: ReturnType<typeof setTimeout> | null = null;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;

  function clearTimers() {
    if (stallTimer) {
      clearTimeout(stallTimer);
      stallTimer = null;
    }
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
  }

  // While a stall/retry timer is armed, any `pause` event is our own teardown,
  // not the user or OS pausing playback.
  function internalPausePending() {
    return stallTimer !== null || retryTimer !== null;
  }

  function destroyHls() {
    hls?.destroy();
    hls = null;
  }

  function armStallWatchdog() {
    if (stallTimer) clearTimeout(stallTimer);
    stallTimer = setTimeout(() => {
      stallTimer = null;
      if (wantsPlaying && status !== 'playing') handleFailure();
    }, STALL_TIMEOUT_MS);
  }

  function handleFailure() {
    if (!wantsPlaying) return;
    attempt += 1;
    if (attempt >= MAX_ATTEMPTS) {
      wantsPlaying = false;
      stopStream();
      status = 'failed';
      return;
    }
    status = 'retrying';
    clearTimers();
    retryTimer = setTimeout(tryPlay, Math.min(attempt * 1000, 5000));
  }

  function onPlayRejected(e: unknown) {
    const name = (e as DOMException)?.name;
    if (name === 'AbortError') return; // our own teardown interrupted play(); the retry cycle handles it
    if (name === 'NotAllowedError') {
      // Autoplay blocked — a fresh user gesture is required, so stop trying quietly
      pauseIntent();
      return;
    }
    // Anything else: the stall watchdog will schedule the next attempt
  }

  // hls.js is ~160 KB gzipped, so it stays out of the initial bundle and loads
  // on the first play attempt. A failed download resets the promise so the
  // regular retry cycle can try fetching it again.
  function loadHls(): Promise<HlsClass | null> {
    if (!hlsLoadPromise) {
      hlsLoadPromise = import('hls.js').then(
        (m) => m.default,
        () => {
          hlsLoadPromise = null;
          return null;
        }
      );
    }
    return hlsLoadPromise;
  }

  // Starts playback fresh from the live edge. Live radio has no resume position,
  // so every attempt tears down the old connection — this also clears any stale
  // buffer left behind by an idle tab.
  function tryPlay() {
    const el = audioEl;
    if (!el) return;

    clearTimers();
    status = attempt === 0 ? 'loading' : 'retrying';
    armStallWatchdog(); // armed before teardown, so pause events fired by teardown are ignored

    destroyHls();
    usingNativeSrc = false;
    const src = playerState.src;

    // Native HLS (Safari, iOS) plays the stream without hls.js — no download needed
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      usingNativeSrc = true;
      el.src = src;
      el.load();
      el.play().catch(onPlayRejected);
      return;
    }

    attachMse(el, src);
  }

  async function attachMse(el: HTMLAudioElement, src: string) {
    const HlsMod = await loadHls();
    // The attempt may have been paused or superseded while the module downloaded
    if (!wantsPlaying || el !== audioEl || src !== playerState.src) return;

    if (HlsMod?.isSupported()) {
      const instance = new HlsMod({
        enableWorker: true,
        maxBufferLength: 20,
        maxMaxBufferLength: 30,
        backBufferLength: 30,
        liveDurationInfinity: true,
      });
      let mediaErrorRecovered = false;

      hls = instance;
      instance.loadSource(src);
      instance.attachMedia(el);
      instance.on(HlsMod.Events.ERROR, (_, data) => {
        if (instance !== hls || !data.fatal) return;
        if (data.type === HlsMod.ErrorTypes.MEDIA_ERROR && !mediaErrorRecovered) {
          mediaErrorRecovered = true;
          instance.recoverMediaError();
        } else {
          handleFailure();
        }
      });
    } else if (playerState.isLive) {
      usingNativeSrc = true;
      el.src = LIVE_MP3_FALLBACK;
      el.load();
    } else {
      clearTimers();
      wantsPlaying = false;
      status = 'unsupported';
      return;
    }

    el.play().catch(onPlayRejected);
  }

  function stopStream() {
    clearTimers();
    destroyHls();
    const el = audioEl;
    if (!el) return;
    el.pause();
    if (usingNativeSrc) {
      // Actually stop the network connection, not just playback
      el.removeAttribute('src');
      el.load();
      usingNativeSrc = false;
    }
  }

  function playIntent() {
    wantsPlaying = true;
    attempt = 0;
    tryPlay();
  }

  function pauseIntent() {
    wantsPlaying = false;
    stopStream();
    status = 'idle';
  }

  function togglePlay() {
    if (wantsPlaying) pauseIntent();
    else playIntent();
  }

  function onOnline() {
    if (wantsPlaying && status !== 'playing') {
      clearTimers();
      // `online` fires when the interface comes up; give DNS a moment
      retryTimer = setTimeout(tryPlay, 1000);
    }
  }

  function onVisibilityChange() {
    if (document.hidden) return;
    if (playerState.isLive) refreshNowPlaying();
    if (wantsPlaying && status !== 'playing') {
      // Timers were throttled while the tab was hidden — reconnect right away
      tryPlay();
    }
  }

  // --- MediaSession ---

  let mediaSessionReady = false;

  function setupMediaSessionHandlers() {
    if (mediaSessionReady || !('mediaSession' in navigator)) return;
    mediaSessionReady = true;
    const trySet = (action: MediaSessionAction, handler: MediaSessionActionHandler) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // action not supported by this browser
      }
    };
    trySet('play', playIntent);
    trySet('pause', pauseIntent);
    trySet('stop', pauseIntent);
  }

  function updateMediaSessionMetadata() {
    if (!('mediaSession' in navigator)) return;
    const mime = (src: string) => (src.endsWith('.png') ? 'image/png' : 'image/jpeg');
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playerState.title || playerState.artist,
        artist: playerState.title ? playerState.artist : '',
        artwork: artwork
          ? [
              { src: artwork.thumbnail, sizes: '128x128', type: mime(artwork.thumbnail) },
              { src: artwork.medium, sizes: '300x300', type: mime(artwork.medium) },
              { src: artwork.large, sizes: '600x600', type: mime(artwork.large) },
            ]
          : [],
      });
    } catch (e) {
      console.warn('MediaSession metadata failed:', e);
    }
  }

  // --- Now-playing polling ---

  let nowPlayingText = ''; // last seen "artist - title" string, used to detect changes
  let isFetching = false;
  let artworkRequestId = 0;

  async function refreshNowPlaying() {
    if (isFetching) return;
    isFetching = true;
    try {
      const res = await fetch(NOW_PLAYING_URL, { cache: 'no-store' });
      if (!res.ok) return;
      const data: { now_playing?: { song?: { artist: string; title: string; text: string } } } =
        await res.json();
      const song = data?.now_playing?.song;
      if (!song || song.text === nowPlayingText) return;

      // Show the text immediately — artwork loads in the background
      nowPlayingText = song.text;
      playerState.artist = song.artist;
      playerState.title = song.title;
      artwork = null;
      updateMediaSessionMetadata();
      loadArtwork(song.artist, song.title);
    } catch (e) {
      console.error('Error fetching now playing:', e);
    } finally {
      isFetching = false;
    }
  }

  async function loadArtwork(artist: string, title: string) {
    const requestId = ++artworkRequestId;
    if (!artist || IGNORE_ARTISTS.includes(artist.toLowerCase())) return;
    const art = await getAlbumArt(artist, title).catch(() => null);
    if (requestId !== artworkRequestId) return; // a newer song superseded this lookup
    artwork = art;
    if (art) updateMediaSessionMetadata();
  }

  async function pollNowPlayingSimple() {
    if (document.hidden) return; // onVisibilityChange refreshes when the tab returns
    try {
      const res = await fetch(NOW_PLAYING_SIMPLE_URL, { cache: 'no-store' });
      const text = (await res.text()).trim();
      if (text && text !== nowPlayingText) refreshNowPlaying();
    } catch {
      // transient polling errors are fine — the next tick will retry
    }
  }

  // --- Effects ---

  // Audio element event wiring
  $effect(() => {
    const el = audioEl;
    if (!el) return;

    const onPlaying = () => {
      clearTimers();
      attempt = 0;
      status = 'playing';
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
    };

    const onPause = () => {
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
      if (!wantsPlaying) {
        if (status !== 'failed' && status !== 'unsupported') status = 'idle';
      } else if (!internalPausePending()) {
        // External pause (unplugged headphones, another app taking over) — respect it
        wantsPlaying = false;
        stopStream();
        status = 'idle';
      }
    };

    const onWaiting = () => {
      if (!wantsPlaying) return;
      if (status === 'playing') status = 'loading';
      armStallWatchdog();
    };

    const onError = () => {
      if (hls) return; // MSE errors are handled through hls.js events
      handleFailure();
    };

    el.addEventListener('playing', onPlaying);
    el.addEventListener('pause', onPause);
    el.addEventListener('waiting', onWaiting);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('waiting', onWaiting);
      el.removeEventListener('error', onError);
      clearTimers();
      destroyHls();
    };
  });

  // Restart playback when the source changes
  $effect(() => {
    void playerState.src;
    untrack(() => {
      if (wantsPlaying) {
        attempt = 0;
        tryPlay();
      }
    });
  });

  // Pause the live stream when a Mixcloud embed takes over
  $effect(() => {
    if (playerState.mixcloudShow) {
      untrack(() => {
        if (wantsPlaying) pauseIntent();
      });
    }
  });

  // Now-playing metadata — only relevant for the live stream
  $effect(() => {
    if (!playerState.isLive) {
      // Reset so the next return to live re-fetches even if the song is unchanged
      nowPlayingText = '';
      artworkRequestId += 1;
      artwork = null;
      return;
    }

    untrack(() => {
      setupMediaSessionHandlers();
      refreshNowPlaying();
    });
    const interval = setInterval(pollNowPlayingSimple, 5000);
    return () => clearInterval(interval);
  });
</script>

<svelte:window ononline={onOnline} />
<svelte:document onvisibilitychange={onVisibilityChange} />

<div class="player">
  <div class="player-bar">
    <button
      class="play-btn"
      onclick={togglePlay}
      aria-label={isActive ? 'Pauziraj' : 'Reproduciraj'}
    >
      {#if status === 'loading' || status === 'retrying'}
        <span class="spinner" aria-hidden="true"></span>
      {:else if status === 'playing'}
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

  {#if statusMessage}
    <div class="player-status" aria-live="polite">
      <span class="status-text">{statusMessage}</span>
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

  .status-text {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-brand);
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
