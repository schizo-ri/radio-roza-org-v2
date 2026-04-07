<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  const categories = ['sve', 'glazba', 'kultura', 'intervjui', 'reportaže'];
  let activeCategory = $state('sve');

  const excerpt =
    'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.';

  // Mock data — replace with CMS
  const articles = [
    { href: '/citaj-radio/rijecka-underground-scena', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/zvukovi-iz-podruma', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/rijecka-underground-2', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/zvukovi-2', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/rijecka-underground-3', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/zvukovi-3', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/rijecka-underground-4', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/zvukovi-4', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
  ];

  // Mock pagination
  const currentPage = 1;
  const totalPages = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<svelte:head>
  <title>Čitaj radio — Radio Roža</title>
</svelte:head>

<main class="citaj-radio-page">
  <div class="page-header">
    <h1 class="page-title">čitaj radio</h1>
    <div class="filter-bar">
      <span class="filter-label">kategorije</span>
      <div class="filter-tabs">
        {#each categories as cat (cat)}
          <button
            class="filter-tab"
            class:active={activeCategory === cat}
            onclick={() => (activeCategory = cat)}
          >
            {cat}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="card-grid">
    {#each articles as article (article.href)}
      <ArticleCard {...article} />
    {/each}
  </div>

  <nav class="pagination" aria-label="Stranice">
    {#each pages as page (page)}
      <a
        href="/citaj-radio?stranica={page}"
        class="page-num"
        class:current={page === currentPage}
        aria-current={page === currentPage ? 'page' : undefined}
      >
        {page}
      </a>
    {/each}
  </nav>
</main>

<style>
  .citaj-radio-page {
    padding: 1.5rem 1rem 4rem;
  }

  /* Header row */
  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0;
    border-bottom: 2px solid var(--color-black);
    padding-bottom: 0.75rem;
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
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgb(0 0 0 / 0.4);
  }

  .filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .filter-tab {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: none;
    border: 1px solid transparent;
    padding: 0.2em 0.5em;
    cursor: pointer;
    color: rgb(0 0 0 / 0.5);
  }

  .filter-tab:hover {
    color: var(--color-black);
    border-color: rgb(0 0 0 / 0.3);
  }

  .filter-tab.active {
    color: var(--color-black);
    border-color: var(--color-black);
  }

  /* Grid — ArticleCard provides its own border-top */
  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1px;
    row-gap: 0;
    background: rgb(0 0 0 / 0.12);
  }

  /* Pagination */
  .pagination {
    display: flex;
    gap: 0.25rem;
    margin-top: 2.5rem;
  }

  .page-num {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-black);
    text-decoration: none;
    padding: 0.3em 0.6em;
    border: 1px solid transparent;
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

    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .citaj-radio-page {
      padding: 2.5rem 2rem 6rem;
    }

    .card-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
