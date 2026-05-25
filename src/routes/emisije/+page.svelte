<script lang="ts">
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import ShowCard from '$lib/components/ShowCard.svelte';
  import { shows } from '$lib/data/shows';

  type Filter = 'sve' | 'aktivne' | 'arhiva';

  let activeFilter = $state<Filter>('aktivne');

  const filteredShows = $derived(
    activeFilter === 'sve'
      ? shows
      : activeFilter === 'aktivne'
        ? shows.filter((s) => s.active)
        : shows.filter((s) => !s.active),
  );
</script>

<svelte:head>
  <title>Emisije — Radio Roža</title>
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">emisije</h1>
    <div class="filter-bar">
      <span class="filter-label">prikaži: </span>
      <div class="filter-tabs">
        {#each (['aktivne', 'arhiva', 'sve'] as Filter[]) as f (f)}
          <button
            class="filter-tab"
            class:active={activeFilter === f}
            onclick={() => (activeFilter = f)}
          >
            {f}
          </button>
        {/each}
      </div>
    </div>
  </header>

  <ArticleGrid items={filteredShows} rows={filteredShows.length} cardMinEm={16}>
    {#snippet card(show)}
      <ShowCard {...show} />
    {/snippet}
  </ArticleGrid>
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding-bottom: 1rem;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  .filter-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-label {
    text-transform: uppercase;
    letter-spacing: -1px;
    font-weight: 600;
    margin-right: 1ch;
  }

  .filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .filter-tab {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 700;
    text-transform: uppercase;
    background: var(--color-white, #fff);
    border: 1px solid var(--color-white, #fff);
    border-radius: var(--text-body);
    padding: 0.5em 0.8em;
    cursor: pointer;
    color: var(--color-black);
    line-height: 1;
    white-space: nowrap;
  }

  .filter-tab:hover {
    border-color: var(--color-black);
  }

  .filter-tab.active {
    background: var(--color-black);
    border-color: var(--color-black);
    color: var(--color-white, #fff);
  }

  /* Tablet */
  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }
  }
</style>
