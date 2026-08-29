<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import type Hls from 'hls.js';
  import MixcloudBar from '$lib/components/MixcloudBar.svelte';
  import PlayerMenu from '$lib/components/PlayerMenu.svelte';
  import { playerState } from '$lib/stores/player.svelte';
  import { playerSettings } from '$lib/stores/settings.svelte';
  import { getAlbumArt } from '$lib/utils/artwork';
  import type { ArtworkSizes } from '$lib/utils/artwork';

  const NOW_PLAYING_URL = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.json';
  const NOW_PLAYING_SIMPLE_URL = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.txt';
  const LIVE_MP3_FALLBACK = 'https://radio.radio-roza.org/listen/radioroza/live.mp3';
  const IGNORE_ARTISTS = ['radio roža', 'radio roza', 'jingl'];

  const STALL_TIMEOUT_MS = 8000; // no audio within this window counts as a failed attempt
  const MAX_ATTEMPTS = 12; // ~2 min of automatic retrying before giving up
  const LONG_OUTAGE_ATTEMPT = 3; // after this many attempts the message switches to "unavailable"

  // A pause now keeps the element loaded (see pauseStream), so it can last a long
  // time. Past this the buffer counts as stale and we seek to the live edge —
  // kept low because maxLiveSyncPlaybackRate absorbs drift at only 0.1s/s.
  const LIVE_RESYNC_AFTER_MS = 1500;
  const RESYNC_TIMEOUT_MS = 4000; // stop waiting for a live edge and unmute regardless
  const LIVE_EDGE_MARGIN_S = 3; // native HLS only — hls.liveSyncPosition has its own
  const FADE_OUT_MS = 120; // takes the click off a pause
  const FADE_IN_MS = 350; // and eases the jump back to the live edge in

  type Status = 'idle' | 'loading' | 'retrying' | 'playing' | 'failed' | 'unsupported';

  let audioEl = $state<HTMLAudioElement | undefined>(undefined);
  let playerEl = $state<HTMLDivElement | undefined>(undefined);
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
  let canResume = false; // paused with the source still attached — resumeStream can pick it up
  let pausedAt = 0; // start of the soft pause, to measure how far behind live we fell
  let loadStopped = false; // hls.stopLoad() actually ran — a cut-short fade never stops it
  let pendingResync = false; // waiting for a live edge to seek to
  let awaitingSeek = false; // our own resync seek is in flight, so `seeked` is ours
  let resyncTimer: ReturnType<typeof setTimeout> | null = null;
  let fadeTimer: ReturnType<typeof setInterval> | null = null;

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
      stopIntent();
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
    cancelFade();
    cancelResync();
    canResume = false;
    loadStopped = false;
    status = attempt === 0 ? 'loading' : 'retrying';
    armStallWatchdog(); // armed before teardown, so pause events fired by teardown are ignored

    destroyHls();
    usingNativeSrc = false;
    resetOutput(el); // a fade or resync cut short must not carry over
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
        // Small drift (a short pause, a stall) is eased out by nudging the rate
        // rather than seeking — inaudible, unlike a jump.
        maxLiveSyncPlaybackRate: 1.1,
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
      // A refreshed live playlist is the first point liveSyncPosition is current
      instance.on(HlsMod.Events.LEVEL_UPDATED, () => {
        if (instance === hls) resyncToLiveEdge();
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

  // Hard stop — empties the media element, which also drops the OS media session.
  // Only for cases where nothing should be left to resume.
  function stopStream() {
    clearTimers();
    cancelFade();
    cancelResync();
    canResume = false;
    loadStopped = false;
    destroyHls();
    const el = audioEl;
    if (!el) return;
    el.pause();
    resetOutput(el); // a fade or resync cut short must not carry over
    if (usingNativeSrc) {
      // Actually stop the network connection, not just playback
      el.removeAttribute('src');
      el.load();
      usingNativeSrc = false;
    }
  }

  // --- Soft pause ---

  // Emptying the element drops the OS media session with it, which is why a
  // lock-screen pause used to leave nothing to press play on. This keeps the
  // element loaded instead: hls.stopLoad() aborts every request but leaves
  // MediaSource attached, and the native path simply stops. The buffer goes stale
  // in exchange, so resumeStream rejoins the live edge.
  function pauseStream() {
    clearTimers();
    cancelResync();
    canResume = true;
    pausedAt = Date.now();
    const el = audioEl;
    if (!el) return;
    // fadeVolume always defers, so this never runs before pauseIntent finishes
    fadeVolume(0, FADE_OUT_MS, () => {
      if (wantsPlaying) return; // play was pressed again mid-fade
      el.pause();
      hls?.stopLoad();
      loadStopped = true;
      resetOutput(el); // inaudible now, and never left stuck muted or at volume 0
    });
  }

  // Returns false when there is nothing to resume — a hard stop emptied the
  // element, so the caller has to reconnect from scratch.
  function resumeStream() {
    const el = audioEl;
    if (!el || !canResume) return false;
    canResume = false;
    cancelFade();
    clearTimers();

    // Play pressed during the fade-out means nothing ever stopped: no startLoad
    // (it would re-init and re-seek a healthy stream) and no drift to make up.
    const wasStopped = loadStopped;
    loadStopped = false;
    if (wasStopped) hls?.startLoad();

    const stale = wasStopped && playerState.isLive && Date.now() - pausedAt > LIVE_RESYNC_AFTER_MS;

    if (stale) {
      pendingResync = true;
      // Muting suppresses the stale buffer on the MSE path — but NEVER on the
      // native one: iOS gives a muted element no audio session, so the lock screen
      // control empties and hands play to the last media app. That is what broke
      // resume on iPhone. volume 0 is all we do there (iOS ignores that too, so a
      // moment of stale audio is audible — far better than losing the session).
      if (hls) el.muted = true;
      el.volume = 0;
      resyncTimer = setTimeout(finishResync, RESYNC_TIMEOUT_MS);
    } else {
      fadeVolume(playerSettings.volume, FADE_IN_MS);
    }

    if (el.paused) {
      status = 'loading';
      armStallWatchdog();
      // Native HLS keeps its seekable range current, so it can land on the live
      // edge before making a sound. The MSE path waits for a refreshed playlist.
      if (!hls) resyncToLiveEdge();
      el.play().catch(onPlayRejected);
    } else {
      status = 'playing'; // the fade-out never got as far as pausing it
    }
    return true;
  }

  function cancelResync() {
    pendingResync = false;
    awaitingSeek = false;
    if (resyncTimer) {
      clearTimeout(resyncTimer);
      resyncTimer = null;
    }
  }

  // Called whenever a current live edge may have become known. Stays a no-op until
  // one is; the resync timer is the backstop for when none ever arrives.
  function resyncToLiveEdge() {
    const el = audioEl;
    if (!el || !pendingResync) return;
    // liveSyncPosition already sits a safety delay behind the edge; seekable.end()
    // is the raw edge, and landing exactly on it stalls, so back off by hand.
    const { seekable } = el;
    let target: number | null = null;
    if (hls) {
      target = hls.liveSyncPosition;
    } else if (seekable.length) {
      const last = seekable.length - 1;
      target = Math.max(seekable.start(last), seekable.end(last) - LIVE_EDGE_MARGIN_S);
    }
    if (target == null || !Number.isFinite(target)) return;
    pendingResync = false;
    try {
      el.currentTime = target;
      awaitingSeek = true;
    } catch {
      // not seekable yet — the backstop timer unmutes us where we are
    }
  }

  // Fades the live edge back in, on our own `seeked` or off the backstop timer,
  // so playback can never be left silently muted.
  function finishResync() {
    cancelResync();
    const el = audioEl;
    if (el) el.muted = false;
    fadeVolume(playerSettings.volume, FADE_IN_MS);
  }

  function resetOutput(el: HTMLAudioElement) {
    el.muted = false;
    el.volume = playerSettings.volume;
  }

  function cancelFade() {
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }

  // Time-based rather than per-step: a backgrounded tab throttles the interval,
  // and this way the fade still lands on the target instead of stalling part-way.
  // iOS ignores volume writes entirely, so there the fade is silently a no-op.
  function fadeVolume(to: number, ms: number, done?: () => void) {
    cancelFade();
    const el = audioEl;
    const from = el ? el.volume : to;
    const started = Date.now();
    fadeTimer = setInterval(() => {
      const p = ms > 0 ? Math.min(1, (Date.now() - started) / ms) : 1;
      if (el) el.volume = Math.min(1, Math.max(0, from + (to - from) * p));
      if (p === 1) {
        cancelFade();
        done?.();
      }
    }, 25);
  }

  function playIntent() {
    wantsPlaying = true;
    attempt = 0;
    if (!resumeStream()) tryPlay();
  }

  // The user or the OS pausing — keep the media session alive so play still works
  // from the lock screen. stopIntent is the hard version, for when it shouldn't.
  function pauseIntent() {
    wantsPlaying = false;
    pauseStream();
    status = 'idle';
  }

  function stopIntent() {
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
    trySet('stop', stopIntent);
  }

  // While the Mixcloud widget plays, its iframe owns the media session — our
  // handlers must not catch hardware keys and start the live stream underneath.
  function teardownMediaSession() {
    if (!mediaSessionReady || !('mediaSession' in navigator)) return;
    mediaSessionReady = false;
    try {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
    } catch {
      // action not supported by this browser
    }
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
    // While playing, keep polling even in the background so the media session
    // (lock screen / OS controls) stays current on song changes. When idle and
    // hidden, skip — onVisibilityChange refreshes when the tab returns.
    if (document.hidden && !wantsPlaying) return;
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
      // Native only: after stopLoad, hls.liveSyncPosition still points at the
      // pre-pause playlist, so the MSE path waits for LEVEL_UPDATED instead
      if (!hls) resyncToLiveEdge();
    };

    // hls.js seeks to the live edge on stall recovery too — only our own resync
    // seek should restart the fade-in
    const onSeeked = () => {
      if (!awaitingSeek) return;
      awaitingSeek = false;
      finishResync();
    };

    const onPause = () => {
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
      if (!wantsPlaying) {
        if (status !== 'failed' && status !== 'unsupported') status = 'idle';
      } else if (!internalPausePending()) {
        // External pause (unplugged headphones, another app taking over) — respect
        // it, but keep the source attached so play still works from the lock screen
        wantsPlaying = false;
        pauseStream();
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
    el.addEventListener('seeked', onSeeked);
    el.addEventListener('pause', onPause);
    el.addEventListener('waiting', onWaiting);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('seeked', onSeeked);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('waiting', onWaiting);
      el.removeEventListener('error', onError);
      clearTimers();
      cancelFade();
      cancelResync();
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
      // Hard stop: a soft-paused element would keep our media session in the
      // notification shade, competing with the widget's own
      untrack(stopIntent);
    }
  });

  // Autoplay preferencija — vrijedi samo za prvi dolazak (Player je u layoutu,
  // mounta se jednom). Ako browser traži gestu, onPlayRejected spusti na idle.
  onMount(() => {
    if (playerSettings.autoplayOnVisit && playerState.isLive) playIntent();
  });

  // Zapamćena glasnoća — pokriva i mount i pomicanje slidera u meniju
  $effect(() => {
    const el = audioEl;
    if (el) el.volume = playerSettings.volume;
  });

  // Sleep timer je istekao — pauziraj live stream ako svira
  let seenStopRequests = playerState.stopRequests;
  $effect(() => {
    const n = playerState.stopRequests;
    untrack(() => {
      if (n > seenStopRequests) {
        seenStopRequests = n;
        if (wantsPlaying) pauseIntent();
      }
    });
  });

  // "Natrag na live" or a Mixcloud show ending — start the live stream. If the
  // browser demands a fresh gesture, onPlayRejected degrades to the idle bar.
  let seenResumeRequests = playerState.liveResumeRequests;
  $effect(() => {
    const n = playerState.liveResumeRequests;
    untrack(() => {
      if (n > seenResumeRequests) {
        seenResumeRequests = n;
        playIntent();
      }
    });
  });

  // Both modes are 60px (70px on desktop), but live mode can add a status row,
  // so sticky UI below (program page) reads the real bottom edge from a CSS var.
  $effect(() => {
    const el = playerEl;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        '--player-offset',
        `calc(var(--nav-offset, 70px) + ${el.offsetHeight}px)`
      );
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty('--player-offset');
    };
  });

  // Now-playing metadata — only relevant for the live stream
  $effect(() => {
    if (!playerState.isLive) {
      // Reset so the next return to live re-fetches even if the song is unchanged
      nowPlayingText = '';
      artworkRequestId += 1;
      artwork = null;
      untrack(teardownMediaSession);
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

<div class="player" bind:this={playerEl}>
  {#if playerState.mixcloudShow}
    <MixcloudBar />
  {:else}
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

      <PlayerMenu mode="live" />
    </div>

    {#if statusMessage}
      <div class="player-status" aria-live="polite">
        <span class="status-text">{statusMessage}</span>
      </div>
    {/if}
  {/if}
</div>

<audio bind:this={audioEl} preload="none"></audio>

<style>
  .player {
    position: sticky;
    top: var(--nav-offset, 70px);
    transition: top 0.3s ease;
    z-index: 200;
    background: var(--color-white);
    border-bottom: 1px solid rgb(0 0 0 / 0.08);
  }

  /* 60px matches .mc-bar — the Mixcloud widget's own control row is a hard 60px,
     so the live bar meets it there and the bar height stays put across modes. */
  .player-bar {
    display: flex;
    align-items: center;
    height: 60px;
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
