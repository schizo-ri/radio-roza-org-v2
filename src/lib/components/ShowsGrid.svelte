<script lang="ts" generics="T extends { href: string }">
  import type { Snippet } from 'svelte';

  interface Props {
    items: T[];
    card: Snippet<[T]>;
  }

  let { items, card }: Props = $props();
</script>

<div class="grid-container">
  <div class="shows-grid">
    {#each items as item (item.href)}
      {@render card(item)}
    {/each}
  </div>
</div>

<style>
  /* Grid koji nikad nema prazna mjesta ("novo novo novo" na naslovnici):
     broj stupaca i broj vidljivih kartica biraju se u paru kroz container
     queries, pa se ne mogu razići — 1 stupac → 4 kartice, 2 → 8 (4 reda),
     3 → 9 (3 reda), 4 → 8 (2 reda), šire → stupci × 2. Pragovi su u em
     (18em po kartici kao u ArticleGridu) pa prate skaliranje root fonta.
     Linije crta outline kao u ArticleGridu; preglednici bez container
     queryja padaju na auto-fill sa svim karticama. */
  .grid-container {
    container-type: inline-size;
  }

  .shows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(18em, 100%), 1fr));
    gap: 2px;
    overflow: hidden;
  }

  .shows-grid > :global(*) {
    outline: 2px solid var(--color-black);
  }

  @container (width < 36em) {
    .shows-grid {
      grid-template-columns: 1fr;
    }
    .shows-grid > :global(*:nth-child(n + 5)) {
      display: none;
    }
  }

  @container (36em <= width < 54em) {
    .shows-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .shows-grid > :global(*:nth-child(n + 9)) {
      display: none;
    }
  }

  @container (54em <= width < 72em) {
    .shows-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .shows-grid > :global(*:nth-child(n + 10)) {
      display: none;
    }
  }

  @container (72em <= width < 90em) {
    .shows-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .shows-grid > :global(*:nth-child(n + 9)) {
      display: none;
    }
  }

  @container (90em <= width < 108em) {
    .shows-grid {
      grid-template-columns: repeat(5, 1fr);
    }
    .shows-grid > :global(*:nth-child(n + 11)) {
      display: none;
    }
  }

  @container (108em <= width < 126em) {
    .shows-grid {
      grid-template-columns: repeat(6, 1fr);
    }
    .shows-grid > :global(*:nth-child(n + 13)) {
      display: none;
    }
  }

  @container (126em <= width < 144em) {
    .shows-grid {
      grid-template-columns: repeat(7, 1fr);
    }
    .shows-grid > :global(*:nth-child(n + 15)) {
      display: none;
    }
  }

  @container (width >= 144em) {
    .shows-grid {
      grid-template-columns: repeat(8, 1fr);
    }
  }
</style>
