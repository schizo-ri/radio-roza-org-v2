<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { browser } from '$app/environment';
  import PlayerMenu from '$lib/components/PlayerMenu.svelte';
  import { playerState } from '$lib/stores/player.svelte';

  const show = $derived(playerState.mixcloudShow);

  let iframeEl = $state<HTMLIFrameElement | null>(null);

  // The Mixcloud iframe always exists — its Widget API is the only way to play a
  // cloudcast (there's no raw audio URL). On desktop (mouse/trackpad) we hide it
  // and render our own transport, driving it through the API. On touch we keep it
  // VISIBLE so the user taps Mixcloud's native play: that tap-gesture lives inside
  // the iframe, which is what iOS Safari requires to start audio — a programmatic
  // play() on a hidden iframe loses the gesture and is blocked. If the API never
  // loads (adblock, network), `apiUnavailable` falls back to the visible widget so
  // playback is still controllable. The live <audio> stream is never involved.
  let widget = $state<any>(null);
  let pollTimer: ReturnType<typeof setInterval> | null = null;
  let lastKey: string | null = null;
  let seenPlayRequests = playerState.mixcloudPlayRequests;

  // Desktop → our UI; touch (or a failed API) → the visible widget.
  let useCustomUI = $state(false);
  let apiUnavailable = $state(false);
  const showCustom = $derived(useCustomUI && !apiUnavailable);

  // Playback state, driven by Widget API events (custom UI only reads these).
  let position = $state(0);
  let duration = $state(0);
  let isPaused = $state(true);
  let isBuffering = $state(false);
  let seeking = $state(false);
  let seekValue = $state(0);

  const displayPos = $derived(seeking ? seekValue : position);
  const pct = $derived(duration > 0 ? Math.min(100, (displayPos / duration) * 100) : 0);

  function getMixcloudPath(key: string): string {
    return key.startsWith('/') ? key : `/${key}`;
  }

  function formatTime(s: number): string {
    if (!s || !isFinite(s)) return '0:00';
    const total = Math.floor(s);
    const m = Math.floor(total / 60);
    return `${m}:${String(total % 60).padStart(2, '0')}`;
  }

  function clearPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function initWidget() {
    const el = iframeEl;
    if (!browser || !el || !(window as any).Mixcloud) return;

    const w = (window as any).Mixcloud.PlayerWidget(el);
    w.ready
      .then(() => {
        if (el !== iframeEl) return; // a newer show recreated the iframe meanwhile
        widget = w;
        isBuffering = true;

        w.events.play.on(() => {
          isPaused = false;
          isBuffering = false;
        });
        w.events.pause.on(() => (isPaused = true));
        w.events.buffering.on(() => (isBuffering = true));
        w.events.ended.on(() => playerState.requestLivePlayback());
        w.events.progress.on((pos: number, dur: number) => {
          if (dur) duration = dur;
          if (!seeking) position = pos;
          isBuffering = false;
        });

        // Prime the initial state before the first progress tick arrives.
        w.getDuration()
          .then((d: number) => {
            if (el === iframeEl && d) duration = d;
          })
          .catch(() => {});
        w.getIsPaused()
          .then((p: boolean) => {
            if (el === iframeEl) isPaused = p;
          })
          .catch(() => {});

        // Backup for the autoplay=1 URL param; rejection means the browser wants
        // a gesture — on desktop our play button (or the native one) is right there.
        w.play().catch(() => {});
      })
      .catch(() => (apiUnavailable = true));
  }

  function onIframeLoad() {
    if (!browser) return;
    clearPoll();
    if ((window as any).Mixcloud) {
      initWidget();
    } else {
      const deadline = Date.now() + 5000;
      pollTimer = setInterval(() => {
        if ((window as any).Mixcloud) {
          clearPoll();
          initWidget();
        } else if (Date.now() > deadline) {
          clearPoll();
          apiUnavailable = true; // reveal the visible widget so playback stays usable
        }
      }, 100);
    }
  }

  // A new show recreates the iframe via {#key}; drop the stale widget handle and
  // reset transport state.
  $effect(() => {
    const key = show?.key;
    if (key && key !== lastKey) {
      lastKey = key;
      widget = null;
      apiUnavailable = false;
      position = 0;
      duration = 0;
      isPaused = true;
      isBuffering = true;
      seeking = false;
    }
  });

  // Re-click on the already loaded show → just make sure it's playing
  $effect(() => {
    const n = playerState.mixcloudPlayRequests;
    untrack(() => {
      if (n > seenPlayRequests) {
        seenPlayRequests = n;
        widget?.play().catch(() => {});
      }
    });
  });

  // Sleep timer je istekao — pauziraj widget
  let seenStopRequests = playerState.stopRequests;
  $effect(() => {
    const n = playerState.stopRequests;
    untrack(() => {
      if (n > seenStopRequests) {
        seenStopRequests = n;
        widget?.pause().catch(() => {});
      }
    });
  });

  $effect(() => clearPoll);

  function togglePlay() {
    if (!widget) return;
    if (isPaused) widget.play().catch(() => {});
    else widget.pause().catch(() => {});
  }

  function onSeekInput(e: Event) {
    seeking = true;
    seekValue = Number((e.currentTarget as HTMLInputElement).value);
  }

  function onSeekCommit(e: Event) {
    const v = Number((e.currentTarget as HTMLInputElement).value);
    position = v; // optimistic — avoids the thumb snapping back before progress catches up
    seeking = false;
    widget?.seek(v).catch(() => {});
  }

  onMount(() => {
    // Desktop pointers get the custom controls; touch keeps the native widget.
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    useCustomUI = mq.matches;
    const onChange = (e: MediaQueryListEvent) => (useCustomUI = e.matches);
    mq.addEventListener('change', onChange);

    // Load the Widget API once, shared across shows.
    if (
      !(window as any).Mixcloud &&
      !document.querySelector('script[src*="widget.mixcloud.com/media/js/widgetApi.js"]')
    ) {
      const script = document.createElement('script');
      script.src = '//widget.mixcloud.com/media/js/widgetApi.js';
      script.async = true;
      script.onerror = () => console.warn('[MixcloudBar] widgetApi.js failed to load');
      document.head.appendChild(script);
    }

    return () => mq.removeEventListener('change', onChange);
  });
</script>

{#if show}
  <div class="mc-bar" class:mc-bar--custom={showCustom}>
    <button
      class="live-btn"
      onclick={() => playerState.requestLivePlayback()}
      aria-label="Natrag na live stream"
    >
      <span class="live-dot" aria-hidden="true"></span>
      <span class="live-btn-label live-btn-label--full">natrag na live</span>
      <span class="live-btn-label live-btn-label--short">live</span>
    </button>

    {#if showCustom}
      <button
        class="play-btn"
        onclick={togglePlay}
        disabled={!widget}
        aria-label={isPaused ? 'Reproduciraj' : 'Pauziraj'}
      >
        {#if isBuffering}
          <span class="spinner" aria-hidden="true"></span>
        {:else if !isPaused}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect x="2" y="2" width="4" height="12" />
            <rect x="10" y="2" width="4" height="12" />
          </svg>
        {:else}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <polygon points="2,1 14,8 2,15" />
          </svg>
        {/if}
      </button>

      <span class="mc-title">{show.title}</span>

      <div class="mc-seek">
        <span class="mc-time">{formatTime(displayPos)}</span>
        <input
          type="range"
          class="mc-range"
          min="0"
          max={duration || 0}
          value={displayPos}
          step="1"
          style="--pct: {pct}%"
          disabled={!widget || !duration}
          oninput={onSeekInput}
          onchange={onSeekCommit}
          aria-label="Pozicija reprodukcije"
          aria-valuetext={formatTime(displayPos)}
        />
        <span class="mc-time">{formatTime(duration)}</span>
      </div>
    {/if}

    {#key show.key}
      <iframe
        bind:this={iframeEl}
        onload={onIframeLoad}
        class="mc-frame"
        class:mc-frame--hidden={showCustom}
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&mini=1&light=1&autoplay=1&feed={encodeURIComponent(
          getMixcloudPath(show.key)
        )}"
        allow="autoplay; encrypted-media"
        height="60"
        title="Mixcloud: {show.title}"
      ></iframe>
    {/key}

    {#if show.url}
      <a
        class="mc-external"
        href={show.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Otvori na Mixcloudu"
      >
        <span class="mc-credit">MX</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10 7.5V11a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 012-2h3.5" />
          <polyline points="8,1 12,1 12,5" />
          <line x1="5.5" y1="7.5" x2="12" y2="1" />
        </svg>
      </a>
    {/if}

    <PlayerMenu mode="mixcloud" />
  </div>
{/if}

<style>
  .mc-bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 60px;
    padding: 0 1rem;
  }

  .live-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
    height: 36px;
    padding: 0 0.6rem;
    background: var(--color-white);
    border: 2px solid var(--color-black);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-black);
  }

  .live-btn:hover,
  .live-btn:focus-visible {
    background: var(--color-black);
    color: var(--color-white);
  }

  .live-dot {
    display: block;
    width: 7px;
    height: 7px;
    background: var(--color-brand);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .live-btn-label--full {
    display: none;
  }

  /* --- Custom transport (desktop) --- */

  .play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-black);
  }

  .play-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

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

  .mc-title {
    display: none;
    flex: 0 1 auto;
    min-width: 0;
    max-width: 14rem;
    font-family: var(--font-display);
    font-size: var(--text-body);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-black);
  }

  .mc-seek {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex: 1;
    min-width: 0;
  }

  .mc-time {
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-variant-numeric: tabular-nums;
    color: rgb(0 0 0 / 0.55);
  }

  .mc-range {
    -webkit-appearance: none;
    appearance: none;
    flex: 1;
    min-width: 0;
    height: 16px;
    background: transparent;
    cursor: pointer;
  }

  .mc-range:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .mc-range::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 0;
    background: linear-gradient(
      to right,
      var(--color-brand) 0 var(--pct, 0%),
      rgb(0 0 0 / 0.15) var(--pct, 0%) 100%
    );
  }

  .mc-range::-moz-range-track {
    height: 4px;
    border-radius: 0;
    background: rgb(0 0 0 / 0.15);
  }

  .mc-range::-moz-range-progress {
    height: 4px;
    background: var(--color-brand);
  }

  .mc-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    margin-top: -4px;
    border-radius: 0;
    background: var(--color-black);
  }

  .mc-range::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: 0;
    border-radius: 0;
    background: var(--color-black);
  }

  .mc-range:focus-visible {
    outline: 2px solid var(--color-black);
    outline-offset: 3px;
  }

  /* --- Mixcloud iframe: visible widget (touch) or hidden driver (desktop) --- */

  .mc-frame {
    flex: 1;
    min-width: 0;
    height: 60px;
    border: 0;
    display: block;
    /* Deliberately unfiltered. Mixcloud's light widget is already near-white
       (#fcfcfc fill, cool-grey track) so it sits flush on the white player bar.
       A warm filter used to tint it here, but on a phone — where this iframe is
       the full-width transport — it read as a yellow band pasted over the bar.
       It's a Mixcloud player; the link-out (MX, or the cog menu on phones)
       already says so. */
  }

  .mc-frame--hidden {
    position: absolute;
    flex: 0 0 auto;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .mc-external {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    height: 36px;
    padding: 0 0.25rem;
    color: var(--color-black);
    text-decoration: none;
  }

  .mc-external:hover,
  .mc-external:focus-visible {
    color: rgb(0 0 0 / 0.8);
    text-decoration: underline;
  }

  .mc-credit {
    display: none;
    font-family: var(--font-mono);
    font-size: var(--text-body);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Visible-widget (touch) mode: the mini widget only renders a real seek bar
     above ~240px wide, so tighten the bar and drop the external-link icon on
     phones to hand the widget that width. The link-out lives in the player menu
     (cog) there instead. */
  .mc-bar:not(.mc-bar--custom) {
    gap: 0.5rem;
    padding: 0 0.75rem;
  }

  .mc-bar:not(.mc-bar--custom) .mc-external {
    display: none;
  }

  @media (min-width: 640px) {
    .live-btn-label--full {
      display: inline;
    }

    .live-btn-label--short {
      display: none;
    }

    .mc-bar:not(.mc-bar--custom) .mc-external {
      display: flex;
    }
  }

  @media (min-width: 1024px) {
    .mc-bar {
      height: 70px;
      padding: 0 1.25rem;
    }

    .mc-bar--custom .mc-title {
      display: block;
    }
  }

  @media (min-width: 1180px) {
    .mc-bar--custom .mc-credit {
      display: inline;
    }
  }
</style>
