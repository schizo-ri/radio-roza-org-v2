<script lang="ts" generics="T extends { href: string }">
  import type { Snippet } from 'svelte';

  interface Props {
    items: T[];
    cardMinEm?: number;
    card: Snippet<[T]>;
  }

  let { items, cardMinEm = 18, card }: Props = $props();
</script>

<div class="article-grid" style:--card-min="{cardMinEm}em">
  {#each items as item (item.href)}
    {@render card(item)}
  {/each}
</div>

<style>
  /* Stupce određuje CSS (auto-fill), pa SSR i klijent renderiraju isto —
     bez skoka nakon hidratacije. Linije crta 2px outline svake kartice:
     u 2px gapu susjedni se outlinei preklope u jednu liniju, vanjski rub
     odreže overflow, a prazan prostor nepotpunog zadnjeg reda ostaje boje
     pozadine, s uredno zatvorenim karticama. */
  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(var(--card-min), 100%), 1fr));
    gap: 2px;
    overflow: hidden;
  }

  .article-grid > :global(*) {
    outline: 2px solid var(--color-black);
  }
</style>
