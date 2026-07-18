<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { browser } from '$app/environment';
  import { playerState } from '$lib/stores/player.svelte';

  const show = $derived(playerState.mixcloudShow);

  let iframeEl = $state<HTMLIFrameElement | null>(null);

  // The widget must stay visible for its API to work (Mixcloud docs), and its
  // own transport controls are the primary UI — our code only listens for
  // `ended` and nudges play(). If widgetApi.js never loads (adblock, network),
  // the iframe still plays standalone; only the auto-return to live is lost.
  let widget: any = null;
  let pollTimer: ReturnType<typeof setInterval> | null = null;
  let lastKey: string | null = null;
  let seenPlayRequests = playerState.mixcloudPlayRequests;

  function getMixcloudPath(key: string): string {
    return key.startsWith('/') ? key : `/${key}`;
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
        w.events.ended.on(() => playerState.requestLivePlayback());
        // Backup for the autoplay=1 URL param; rejection means the browser wants
        // a gesture — the widget's own play button is right there.
        w.play().catch(() => {});
      })
      .catch(() => {});
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
        }
      }, 100);
    }
  }

  // A new show recreates the iframe via {#key}; drop the stale widget handle
  $effect(() => {
    const key = show?.key;
    if (key && key !== lastKey) {
      lastKey = key;
      widget = null;
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

  $effect(() => clearPoll);

  onMount(() => {
    if (!browser || (window as any).Mixcloud) return;
    if (document.querySelector('script[src*="widget.mixcloud.com/media/js/widgetApi.js"]')) return;
    const script = document.createElement('script');
    script.src = '//widget.mixcloud.com/media/js/widgetApi.js';
    script.async = true;
    script.onerror = () => console.warn('[MixcloudBar] widgetApi.js failed to load');
    document.head.appendChild(script);
  });
</script>

{#if show}
  <div class="mc-bar">
    <button
      class="live-btn"
      onclick={() => playerState.requestLivePlayback()}
      aria-label="Natrag na live stream"
    >
      <span class="live-dot" aria-hidden="true"></span>
      <span class="live-btn-label live-btn-label--full">natrag na live</span>
      <span class="live-btn-label live-btn-label--short">live</span>
    </button>

    {#key show.key}
      <iframe
        bind:this={iframeEl}
        onload={onIframeLoad}
        class="mc-frame"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&autoplay=1&feed={encodeURIComponent(
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
  </div>
{/if}

<style>
  .mc-bar {
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

  .mc-frame {
    flex: 1;
    min-width: 0;
    height: 60px;
    border: 0;
    display: block;
  }

  .mc-external {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    color: rgb(0 0 0 / 0.5);
  }

  .mc-external:hover,
  .mc-external:focus-visible {
    color: var(--color-black);
  }

  @media (min-width: 640px) {
    .live-btn-label--full {
      display: inline;
    }

    .live-btn-label--short {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .mc-bar {
      height: 70px;
      padding: 0 1.25rem;
    }
  }
</style>
