<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  let { data } = $props();

  const activeCategory = $derived(page.url.searchParams.get('kategorija') ?? 'sve');

  function setCategory(slug: string | null) {
    const url = new URL(page.url);
    if (!slug) {
      url.searchParams.delete('kategorija');
    } else {
      url.searchParams.set('kategorija', slug);
    }
    url.searchParams.delete('stranica');
    goto(url.toString(), { replaceState: true });
  }

  function pageHref(n: number): string {
    const url = new URL(page.url);
    url.searchParams.set('stranica', String(n));
    return url.pathname + url.search;
  }

  const pageNums = $derived(Array.from({ length: data.totalPages }, (_, i) => i + 1));
</script>

<svelte:head>
  <title>Čitaj radio — Radio Roža</title>
</svelte:head>

<main class="citaj-radio-page">
  <div class="page-header">
    <h1 class="page-title">čitaj radio</h1>
    <div class="filter-bar">
      <span class="filter-label">kategorije: </span>
      <div class="filter-tabs">
        <button
          class="filter-tab"
          class:active={activeCategory === 'sve'}
          onclick={() => setCategory(null)}
        >
          sve
        </button>
        {#each data.categories as cat (cat.id)}
          <button
            class="filter-tab"
            class:active={activeCategory === cat.slug}
            onclick={() => setCategory(cat.slug)}
          >
            {cat.title}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <ArticleGrid items={data.posts} rows={3}>
    {#snippet card(item)}
      <ArticleCard {...item} />
    {/snippet}
  </ArticleGrid>

  {#if data.totalPages > 1}
    <nav class="pagination" aria-label="Stranice">
      {#each pageNums as n (n)}
        <a
          href={pageHref(n)}
          class="page-num"
          class:current={n === data.currentPage}
          aria-current={n === data.currentPage ? 'page' : undefined}
        >
          {n}
        </a>
      {/each}
    </nav>
  {/if}
</main>

<style>
  .citaj-radio-page {
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

  /* Filter */
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

  /* Pagination */
  .pagination {
    display: flex;
    gap: 0.25rem;
    margin-top: 2.5rem;
  }

  .page-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 700;
    color: var(--color-black);
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    width: 24px;
    line-height: 1;
  }

  .page-num:hover {
    border-color: rgb(0 0 0 / 0.3);
  }

  .page-num.current {
    border-color: var(--color-black);
  }

  /* Tablet */
  @media (min-width: 640px) {
    .citaj-radio-page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .citaj-radio-page {
      padding: 2.5rem 2rem 6rem;
    }
  }
</style>
