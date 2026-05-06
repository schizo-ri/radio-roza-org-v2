<script lang=”ts”>
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import ShowCard from '$lib/components/ShowCard.svelte';
  import { shows } from '$lib/data/shows';
</script>

<svelte:head>
  <title>Emisije — Radio Roža</title>
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">emisije</h1>
  </header>

  <ArticleGrid items={shows} rows={shows.length} cardMinEm={16}>
    {#snippet card(show)}
      <ShowCard {...show} />
    {/snippet}
  </ArticleGrid>
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  /* Header row */
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
