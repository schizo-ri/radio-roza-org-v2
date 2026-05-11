<script lang="ts">
  import { fade } from 'svelte/transition';

  export interface LightboxImage {
    src: string;
    alt: string;
  }

  interface Props {
    images: LightboxImage[];
    open: boolean;
    startIndex?: number;
    onclose: () => void;
  }

  let { images, open, startIndex = 0, onclose }: Props = $props();

  let current = $state(0);
  let dialogEl: HTMLElement | undefined = $state();
  let previousFocus: HTMLElement | null = null;

  // Swipe tracking
  let touchStartX = 0;
  let touchStartY = 0;

  // Sync index when opening
  $effect(() => {
    if (open) current = startIndex;
  });

  // Scroll lock
  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  });

  // Focus management
  $effect(() => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement;
      requestAnimationFrame(() => dialogEl?.focus());
      return () => {
        previousFocus?.focus();
        previousFocus = null;
      };
    }
  });

  const image = $derived(images[current]);
  const total = $derived(images.length);

  function prev() {
    current = (current - 1 + total) % total;
  }

  function next() {
    current = (current + 1) % total;
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        next();
        break;
      case 'Home':
        e.preventDefault();
        current = 0;
        break;
      case 'End':
        e.preventDefault();
        current = total - 1;
        break;
      case 'Escape':
        onclose();
        break;
      case 'Tab': {
        if (!dialogEl) break;
        const focusable = Array.from(
          dialogEl.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        break;
      }
    }
  }

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
    // Only trigger on clearly horizontal swipe (dx dominant, > 44px threshold)
    if (Math.abs(dx) > dy && Math.abs(dx) > 44) {
      dx > 0 ? prev() : next();
    }
  }
</script>

{#if open && images.length > 0}
  <!-- Backdrop -->
  <div
    class="lb-backdrop"
    role="presentation"
    onclick={onclose}
    transition:fade={{ duration: 150 }}
  ></div>

  <!-- Dialog -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="lb-dialog"
    role="dialog"
    aria-modal="true"
    aria-label="Galerija fotografija"
    tabindex="-1"
    bind:this={dialogEl}
    onkeydown={handleKeydown}
    ontouchstart={onTouchStart}
    ontouchend={onTouchEnd}
    transition:fade={{ duration: 150 }}
  >
    <!-- Toolbar -->
    <div class="lb-toolbar">
      <span class="lb-counter" aria-live="polite" aria-atomic="true">
        <span class="sr-only">Fotografija</span>{current + 1}<span aria-hidden="true">
          /
        </span><span class="sr-only">od</span>{total}
      </span>
      <button class="lb-close" onclick={onclose} aria-label="Zatvori galeriju (Esc)">
        <span aria-hidden="true">×</span>
      </button>
    </div>

    <!-- Stage -->
    <div class="lb-stage" aria-live="polite" aria-atomic="true">
      <!-- Prev -->
      <button
        class="lb-nav lb-nav--prev"
        onclick={prev}
        aria-label="Prethodna fotografija ({current === 0 ? total : current} od {total})"
      >
        <span aria-hidden="true">←</span>
      </button>

      <!-- Image -->
      {#key current}
        <div class="lb-image-wrap">
          {#if image?.src}
            <img src={image.src} alt={image.alt} class="lb-image" draggable="false" />
          {:else}
            <div class="lb-placeholder" role="img" aria-label={image?.alt ?? ''}></div>
          {/if}
        </div>
      {/key}

      <!-- Next -->
      <button
        class="lb-nav lb-nav--next"
        onclick={next}
        aria-label="Sljedeća fotografija ({current + 2 > total ? 1 : current + 2} od {total})"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>

    <!-- Caption -->
    {#if image?.alt}
      <p class="lb-caption">{image.alt}</p>
    {/if}
  </div>
{/if}

<style>
  /* Screen-reader only utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Backdrop */
  .lb-backdrop {
    position: fixed;
    inset: 0;
    z-index: 500;
    background: rgb(0 0 0 / 0.92);
    cursor: zoom-out;
  }

  /* Dialog */
  .lb-dialog {
    position: fixed;
    inset: 0;
    z-index: 501;
    display: grid;
    grid-template-rows: 3rem 1fr auto;
    outline: none;
    /* prevent text selection during swipe */
    user-select: none;
    -webkit-user-select: none;
  }

  /* Toolbar */
  .lb-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.75rem;
  }

  .lb-counter {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(255 255 255 / 0.6);
    letter-spacing: 0.05em;
  }

  .lb-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
    line-height: 1;
    color: rgb(255 255 255 / 0.8);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 2px;
  }

  .lb-close:hover,
  .lb-close:focus-visible {
    color: #fff;
    background: rgb(255 255 255 / 0.1);
    outline: 2px solid rgb(255 255 255 / 0.5);
    outline-offset: 2px;
  }

  /* Stage */
  .lb-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 3.5rem;
  }

  .lb-image-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .lb-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    /* prevent ghost drag image on desktop */
    pointer-events: none;
  }

  .lb-placeholder {
    width: min(400px, 80vw);
    aspect-ratio: 3 / 4;
    background: rgb(255 255 255 / 0.07);
  }

  /* Nav buttons */
  .lb-nav {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 64px;
    font-size: 1.25rem;
    color: rgb(255 255 255 / 0.7);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    z-index: 1;
  }

  .lb-nav:hover,
  .lb-nav:focus-visible {
    color: #fff;
    background: rgb(255 255 255 / 0.1);
    outline: 2px solid rgb(255 255 255 / 0.5);
    outline-offset: 2px;
  }

  .lb-nav--prev {
    left: 0.25rem;
  }

  .lb-nav--next {
    right: 0.25rem;
  }

  /* Caption */
  .lb-caption {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(255 255 255 / 0.5);
    text-align: center;
    padding: 0.5rem 1rem 0.75rem;
    min-height: 2.5rem;
  }

  /* Tablet+ — larger nav buttons, more padding */
  @media (min-width: 640px) {
    .lb-stage {
      padding: 0 5rem;
    }

    .lb-nav {
      width: 48px;
      height: 80px;
      font-size: 1.5rem;
    }

    .lb-nav--prev {
      left: 0.75rem;
    }

    .lb-nav--next {
      right: 0.75rem;
    }
  }
</style>
