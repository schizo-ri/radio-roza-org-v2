<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { playerState } from '$lib/stores/player.svelte';
  import { slide } from 'svelte/transition';

  let iframeEl = $state<HTMLIFrameElement | null>(null);
  let widget = $state<any>(null);
  let widgetReady = $state(false);
  let isPlaying = $state(false);
  let isLoading = $state(true);
  let currentPosition = $state(0);
  let duration = $state(0);
  let lastUrl = $state<string | null>(null);

  const show = $derived(playerState.mixcloudShow);
  const progress = $derived(duration > 0 ? (currentPosition / duration) * 100 : 0);

  function formatTime(s: number): string {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function getMixcloudPath(key: string): string {
    return key.startsWith('/') ? key : `/${key}`;
  }

  function initWidget() {
    if (!browser || !iframeEl || !(window as any).Mixcloud) {
      console.warn('[MixcloudEmbed] Cannot init — missing requirements');
      return;
    }

    if (lastUrl === show?.url && widgetReady) return;

    widgetReady = false;
    isPlaying = false;
    isLoading = true;
    currentPosition = 0;
    duration = 0;

    try {
      const w = (window as any).Mixcloud.PlayerWidget(iframeEl);

      w.ready
        .then(() => {
          widgetReady = true;
          isLoading = false;
          lastUrl = show?.url ?? null;

          w.events.play.on(() => {
            isPlaying = true;
            isLoading = false;
          });
          w.events.pause.on(() => {
            isPlaying = false;
          });
          w.events.ended.on(() => {
            isPlaying = false;
          });
          w.events.buffering.on(() => {
            isLoading = true;
          });
          w.events.progress.on((pos: number, dur: number) => {
            currentPosition = pos;
            duration = dur;
          });

          setTimeout(() => {
            if (w && widgetReady) {
              w.play().catch((e: unknown) => {
                console.warn('[MixcloudEmbed] Autoplay failed:', e);
              });
            }
          }, 300);

          widget = w;
        })
        .catch((e: unknown) => {
          console.error('[MixcloudEmbed] widget.ready failed:', e);
          isLoading = false;
        });
    } catch (e) {
      console.error('[MixcloudEmbed] PlayerWidget init failed:', e);
      isLoading = false;
    }
  }

  function onIframeLoad() {
    if (!browser) return;
    if ((window as any).Mixcloud) {
      initWidget();
    } else {
      const check = setInterval(() => {
        if ((window as any).Mixcloud) {
          clearInterval(check);
          initWidget();
        }
      }, 100);
      setTimeout(() => clearInterval(check), 5000);
    }
  }

  // Reset state when show changes — iframe src change triggers onload
  $effect(() => {
    if (show && show.url !== lastUrl) {
      widgetReady = false;
      widget = null;
      isPlaying = false;
      isLoading = true;
      currentPosition = 0;
      duration = 0;
    }
  });

  onMount(() => {
    if (!browser || (window as any).Mixcloud) return;
    const script = document.createElement('script');
    script.src = '//widget.mixcloud.com/media/js/widgetApi.js';
    script.async = true;
    document.head.appendChild(script);
  });

  function togglePlay() {
    if (!widget || !widgetReady) {
      console.warn('[MixcloudEmbed] Widget not ready');
      return;
    }
    try {
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
    } catch (e) {
      console.error('[MixcloudEmbed] togglePlay failed:', e);
    }
  }

  function openExternal() {
    if (show?.url) window.open(show.url, '_blank', 'noopener,noreferrer');
  }

  function handleClose() {
    if (widget && widgetReady) {
      try {
        widget.pause();
      } catch {}
    }
    isPlaying = false;
    widgetReady = false;
    widget = null;
    lastUrl = null;
    playerState.closeMixcloud();
  }
</script>

{#if show}
  <div class="mc-player" transition:slide={{ duration: 200 }}>
    <div class="mc-inner">
      <div class="mc-art">
        {#if show.image}
          <img src={show.image} alt={show.title} />
        {:else}
          <div class="mc-art-placeholder" aria-hidden="true"></div>
        {/if}
      </div>

      <div class="mc-info">
        <p class="mc-title">{show.title}</p>
        <p class="mc-time">{formatTime(currentPosition)} / {formatTime(duration)}</p>
      </div>

      <div class="mc-controls">
        <button
          class="mc-btn mc-play"
          onclick={togglePlay}
          disabled={isLoading || !widgetReady}
          aria-label={isPlaying ? 'Pauziraj' : 'Reproduciraj'}
        >
          {#if isLoading}
            <span class="mc-spinner" aria-hidden="true"></span>
          {:else if isPlaying}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <rect x="1" y="1" width="4" height="12" />
              <rect x="9" y="1" width="4" height="12" />
            </svg>
          {:else}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <polygon points="1,0 13,7 1,14" />
            </svg>
          {/if}
        </button>

        <button class="mc-btn mc-external" onclick={openExternal} aria-label="Otvori na Mixcloudu">
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
        </button>

        <button class="mc-btn mc-close" onclick={handleClose} aria-label="Zatvori">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <line x1="1" y1="1" x2="10" y2="10" />
            <line x1="10" y1="1" x2="1" y2="10" />
          </svg>
        </button>
      </div>
    </div>

    <div class="mc-progress">
      <div class="mc-progress-fill" style="width: {progress}%"></div>
    </div>

    <!-- mini=1 required for Widget API; hidden via CSS, not display:none -->
    {#key show.key}
      <iframe
        bind:this={iframeEl}
        onload={onIframeLoad}
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed={encodeURIComponent(
          getMixcloudPath(show.key)
        )}"
        allow="autoplay; encrypted-media"
        frameborder="0"
        width="100%"
        height="60"
        title="Mixcloud Player"
        class="mc-iframe"
      ></iframe>
    {/key}
  </div>
{/if}

<style>
  .mc-player {
    position: relative;
    width: 100%;
    background: var(--color-white);
    border-bottom: 1px solid rgb(0 0 0 / 0.08);
  }

  .mc-inner {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    height: 56px;
  }

  .mc-art {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    overflow: hidden;
  }

  .mc-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .mc-art-placeholder {
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 0.07);
  }

  .mc-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .mc-title {
    font-family: var(--font-display);
    font-size: var(--text-body);
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mc-time {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
    font-variant-numeric: tabular-nums;
  }

  .mc-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .mc-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-black);
    border-radius: 50%;
    transition: background 0.15s;
  }

  .mc-btn:hover {
    background: rgb(0 0 0 / 0.06);
  }

  .mc-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .mc-play {
    background: var(--color-black);
    color: var(--color-white);
    width: 36px;
    height: 36px;
  }

  .mc-play > * {
    pointer-events: none;
  }

  .mc-play:hover:not(:disabled) {
    background: rgb(0 0 0 / 0.75);
  }

  .mc-external,
  .mc-close {
    color: rgb(0 0 0 / 0.5);
  }

  .mc-external:hover,
  .mc-close:hover {
    color: var(--color-black);
    background: rgb(0 0 0 / 0.06);
  }

  .mc-spinner {
    display: block;
    width: 14px;
    height: 14px;
    border: 2px solid rgb(255 255 255 / 0.3);
    border-top-color: var(--color-white);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .mc-progress {
    height: 2px;
    background: rgb(0 0 0 / 0.08);
  }

  .mc-progress-fill {
    height: 100%;
    background: var(--color-black);
    transition: width 0.1s linear;
  }

  .mc-iframe {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    .mc-inner {
      height: 64px;
      padding: 0.625rem 1.25rem;
    }
  }
</style>
