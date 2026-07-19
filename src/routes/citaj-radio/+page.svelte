<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ArticleCardSkeleton from '$lib/components/ArticleCardSkeleton.svelte';
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { page } from '$app/state';

  let { data } = $props();

  // 9 = limit iz +page.server.ts
  const skeletonItems = Array.from({ length: 9 }, (_, i) => ({ href: `__skeleton__${i}` }));

  const activeCategory = $derived(page.url.searchParams.get('kategorija') ?? 'sve');

  function categoryHref(slug: string | null): string {
    const url = new URL(page.url);
    if (!slug) {
      url.searchParams.delete('kategorija');
    } else {
      url.searchParams.set('kategorija', slug);
    }
    url.searchParams.delete('stranica');
    return url.pathname + url.search;
  }

  function pageHref(n: number): string {
    const url = new URL(page.url);
    url.searchParams.set('stranica', String(n));
    return url.pathname + url.search;
  }
</script>

<Seo
  title="Čitaj radio — Radio Roža"
  description="Članci, recenzije, komentari i album tjedna — pisana strana Radio Rože."
/>

<main class="citaj-radio-page">
  <PageHeader title="čitaj radio">
    <div class="filter-bar">
      <span class="filter-label">kategorije: </span>
      <div class="filter-tabs">
        <a href={categoryHref(null)} class="filter-tab" class:active={activeCategory === 'sve'}>
          sve
        </a>
        {#each data.categories as cat (cat.id)}
          <a
            href={categoryHref(cat.slug)}
            class="filter-tab"
            class:active={activeCategory === cat.slug}
          >
            {cat.title}
          </a>
        {/each}
      </div>
      <a href="/citaj-radio/rss.xml" class="rss-link" title="Pretplati se na RSS feed">rss →</a>
    </div>
  </PageHeader>

  {#await data.listing}
    <!-- Klijentska navigacija streama postove — skeletoni drže raster dok stignu. -->
    <ArticleGrid items={skeletonItems}>
      {#snippet card(item)}
        <ArticleCardSkeleton />
      {/snippet}
    </ArticleGrid>
  {:then listing}
    <ArticleGrid items={listing.posts}>
      {#snippet card(item)}
        <ArticleCard {...item} />
      {/snippet}
    </ArticleGrid>

    {#if listing.totalPages > 1}
      {@const pageNums = Array.from({ length: listing.totalPages }, (_, i) => i + 1)}
      <nav class="pagination" aria-label="Stranice">
        {#each pageNums as n (n)}
          <a
            href={pageHref(n)}
            class="page-num"
            class:current={n === listing.currentPage}
            aria-current={n === listing.currentPage ? 'page' : undefined}
          >
            {n}
          </a>
        {/each}
      </nav>
    {/if}
  {:catch}
    <p class="load-error">Članke trenutno nije moguće učitati. Pokušaj ponovno za koji trenutak.</p>
  {/await}
</main>

<style>
  .citaj-radio-page {
    padding: 1.5rem 1rem 4rem;
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
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
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

  .rss-link {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-brand);
    text-decoration: none;
    white-space: nowrap;
  }

  .rss-link:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .load-error {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    padding: 2rem 0;
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
