<script lang="ts">
  import ShowCard from '$lib/components/ShowCard.svelte';

  const categories = ['sve', 'hip hop', 'rock', 'elektronika', 'jazz', 'world'];
  let activeCategory = $state('sve');

  // Mock data — replace with CMS
  const shows = [
    { href: '/emisije/da-crtez-24', title: "Da Crtez #24 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-25', title: "Da Crtez #25 - 2010's SLOVENIAN HIP HOP Something Nothing", date: '02.03.2026.', tags: ['Hip hop', 'Slovenian Hip Hop'] },
    { href: '/emisije/da-crtez-26', title: "Da Crtez #26 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-42', title: 'Da Crtez #2', date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-27', title: "Da Crtez #24 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-28', title: "Da Crtez #24 - 2010's SLOVENIAN HIP HOP Something Nothing", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-29', title: "Da Crtez #24 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-30', title: 'Da Crtez #2', date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-31', title: "Da Crtez #34 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-32', title: "Da Crtez #24 - 2010's SLOVENIAN HIP HOP Something Nothing", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-33', title: "Da Crtez #26 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-34', title: 'Da Crtez #2', date: '02.03.2026.', tags: ['Hip hop'] },
  ];

  // Mock pagination
  const currentPage = 1;
  const totalPages = 6;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<svelte:head>
  <title>Emisije — Radio Roža</title>
</svelte:head>

<main class="emisije-page">
  <div class="page-header">
    <h1 class="page-title">emisije</h1>
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
    {#each shows as show (show.href)}
      <ShowCard {...show} />
    {/each}
  </div>

  <nav class="pagination" aria-label="Stranice">
    {#each pages as page (page)}
      <a
        href="/emisije?stranica={page}"
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
  .emisije-page {
    padding: 1.5rem 1rem 4rem;
  }

  /* Header row */
  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
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

  /* Grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
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
    .emisije-page {
      padding: 2rem 1.5rem 5rem;
    }

    .card-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .emisije-page {
      padding: 2.5rem 2rem 6rem;
    }

    .card-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
