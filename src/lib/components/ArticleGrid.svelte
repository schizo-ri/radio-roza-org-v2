<script lang="ts" generics="T extends { href: string }">
  import type { Snippet } from 'svelte';
  import { browser } from '$app/environment';

  interface Props {
    items: T[];
    rows?: number;
    cardMinEm?: number;
    card: Snippet<[T]>;
  }

  let { items, rows = 2, cardMinEm = 18, card }: Props = $props();

  let gridEl = $state<HTMLElement | undefined>(undefined);
  let cols = $state(1);

  // 1 stupac: minimum 4 kartice; inače cols × rows
  const itemCount = $derived(cols === 1 ? Math.max(4, rows) : cols * rows);

  $effect(() => {
    if (!browser || !gridEl) return;

    const observer = new ResizeObserver(([entry]) => {
      const fontSize = parseFloat(getComputedStyle(gridEl!).fontSize);
      cols = Math.max(1, Math.floor(entry.contentRect.width / (cardMinEm * fontSize)));
    });

    observer.observe(gridEl);
    return () => observer.disconnect();
  });
</script>

<div class="article-grid" bind:this={gridEl} data-cols={cols}>
  {#each items.slice(0, itemCount) as item (item.href)}
    {@render card(item)}
  {/each}
</div>

<style>
  .article-grid {
    display: grid;
    grid-template-columns: 1fr;
  }

  .article-grid[data-cols='2'] { grid-template-columns: repeat(2, 1fr); }
  .article-grid[data-cols='3'] { grid-template-columns: repeat(3, 1fr); }
  .article-grid[data-cols='4'] { grid-template-columns: repeat(4, 1fr); }
  .article-grid[data-cols='5'] { grid-template-columns: repeat(5, 1fr); }
  .article-grid[data-cols='6'] { grid-template-columns: repeat(6, 1fr); }
  .article-grid[data-cols='7'] { grid-template-columns: repeat(7, 1fr); }
  .article-grid[data-cols='8'] { grid-template-columns: repeat(8, 1fr); }

  /* Sve kartice: desni + donji border */
  .article-grid > :global(*) {
    border-right: 2px solid var(--color-black);
    border-bottom: 2px solid var(--color-black);
  }

  /* 1 stupac: nema desnog; zadnja kartica nema donjeg */
  .article-grid[data-cols='1'] > :global(*) { border-right: none; }
  .article-grid[data-cols='1'] > :global(*:last-child) { border-bottom: none; }

  /* 2 stupca */
  .article-grid[data-cols='2'] > :global(*:nth-child(2n)) { border-right: none; }
  .article-grid[data-cols='2'] > :global(*:nth-last-child(-n + 2)) { border-bottom: none; }

  /* 3 stupca */
  .article-grid[data-cols='3'] > :global(*:nth-child(3n)) { border-right: none; }
  .article-grid[data-cols='3'] > :global(*:nth-last-child(-n + 3)) { border-bottom: none; }

  /* 4 stupca */
  .article-grid[data-cols='4'] > :global(*:nth-child(4n)) { border-right: none; }
  .article-grid[data-cols='4'] > :global(*:nth-last-child(-n + 4)) { border-bottom: none; }

  /* 5 stupaca */
  .article-grid[data-cols='5'] > :global(*:nth-child(5n)) { border-right: none; }
  .article-grid[data-cols='5'] > :global(*:nth-last-child(-n + 5)) { border-bottom: none; }

  /* 6 stupaca */
  .article-grid[data-cols='6'] > :global(*:nth-child(6n)) { border-right: none; }
  .article-grid[data-cols='6'] > :global(*:nth-last-child(-n + 6)) { border-bottom: none; }

  /* 7 stupaca */
  .article-grid[data-cols='7'] > :global(*:nth-child(7n)) { border-right: none; }
  .article-grid[data-cols='7'] > :global(*:nth-last-child(-n + 7)) { border-bottom: none; }

  /* 8 stupaca */
  .article-grid[data-cols='8'] > :global(*:nth-child(8n)) { border-right: none; }
  .article-grid[data-cols='8'] > :global(*:nth-last-child(-n + 8)) { border-bottom: none; }
</style>
