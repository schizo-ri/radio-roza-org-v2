<svelte:head>
  <title>Kontakt — Radio Roža</title>
</svelte:head>

<main class="page">
  <!-- ── Title + intro ── -->
  <header class="page-header">
    <h1 class="page-title">kontakt</h1>
  </header>
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
