<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    /** 'baseline' kad je uz naslov tekst koji se poravnava po osnovici (npr. bilješka) */
    align?: 'center' | 'baseline';
    children?: Snippet;
  }

  let { title, align = 'center', children }: Props = $props();
</script>

<header class="page-header" class:baseline={align === 'baseline'}>
  <h1 class="page-title">{title}</h1>
  {@render children?.()}
</header>

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    padding-bottom: 1rem;
  }

  .page-header.baseline {
    align-items: baseline;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }
</style>
