<script lang="ts">
  import CtaSection from '$lib/components/CtaSection.svelte';

  const crew = [
    {
      name: 'Davor Popdankovski',
      role: 'glavni urednik',
      description: 'El jefe, capo di tutti capi, šef',
      image: '/images/popi_cover_edit.png',
    },
  ];
</script>

<svelte:head>
  <title>Radio Roža crew</title>
</svelte:head>

<main class="page">
  <!-- ── Title + intro ── -->
  <header class="page-header">
    <h1 class="page-title">Ekipa</h1>
  </header>

  <p class="intro-text">
    Radio Roža je community internet radio i njegova pokretačka snaga su volonteri raznih uloga.
    Jedan community radio treba svoje novinare, glazbene selektore, tehničare. Kroz radio je prošlo
    puno osoba raznih profila, a nadamo se da će tako biti i ubuduće.
  </p>

  <!-- ── Photo grid 1 ── -->
  <div class="crew-grid crew-grid--portrait" aria-label="Galerija fotografija studija">
    {#each crew as c}
      <div class="crew-card">
        <img src={c.image} alt={c.name} width="200" height="200" />
        <h3>{c.name}</h3>
        <h4>{c.role}</h4>
        <p>{c.description}</p>
      </div>
    {/each}
  </div>

  <CtaSection />
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

  .intro-text {
    font-size: var(--text-body);
    font-weight: 500;
    line-height: 1.7;
    max-width: 600px;
    margin-bottom: 1rem;
  }

  /* ── Photo grids ── */
  .crew-grid {
    display: grid;
    gap: 2px;
    grid-template-columns: repeat(2, 1fr);
  }

  .crew-card {
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: zoom-in;
    width: 100%;
    overflow: hidden;
  }

  .crew-card:focus-visible {
    outline: 3px solid var(--color-brand);
    outline-offset: -3px;
    z-index: 1;
    position: relative;
  }

  .crew-card img {
    width: 100%;
    /*height: 100%;*/
    object-fit: cover;
    display: block;
    /*transition: transform 0.3s ease;*/
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }

    .crew-grid {
      grid-template-columns: repeat(4, 1fr);
    }

  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

  }
</style>
