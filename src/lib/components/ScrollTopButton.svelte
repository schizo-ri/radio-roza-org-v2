<script lang="ts">
  interface Props {
    /** Koliko px treba skrolati prije nego se gumb pojavi */
    threshold?: number;
  }

  let { threshold = 300 }: Props = $props();

  let scrollY = $state(0);
  const visible = $derived(scrollY > threshold);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY />

<button class="scroll-top" class:visible onclick={scrollToTop} aria-label="Povratak na vrh">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <polyline
      points="4,13 10,7 16,13"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style>
  .scroll-top {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 50;
    background: var(--color-bg);
    border: 2px solid var(--color-black);
    color: var(--color-black);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .scroll-top.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .scroll-top:hover {
    background: var(--color-black);
    color: var(--color-bg);
  }
</style>
