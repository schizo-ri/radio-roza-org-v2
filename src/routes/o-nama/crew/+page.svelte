<script lang="ts">
  import CtaSection from '$lib/components/CtaSection.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import crewData from '$lib/data/crew.json';

  const crew = crewData.map((c) => ({
    ...c,
    image: `/images/crew/${c.image}`,
  }));
</script>

<svelte:head>
  <title>Radio Roža crew</title>
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">Ekipa</h1>
  </header>

  <p class="intro-text">
    Radio Roža je community internet radio i njegova pokretačka snaga su volonteri raznih uloga.
    Jedan community radio treba svoje novinare, glazbene selektore, tehničare. Kroz radio je prošlo
    puno osoba raznih profila, a nadamo se da će tako biti i ubuduće.
  </p>

  <div class="crew-grid" aria-label="Popis ekipe">
    {#each crew as c (c.name)}
      <div class="crew-card">
        <div class="crew-card__img-wrap">
          <img src={c.image} alt={c.name} loading="lazy" />
          {#if c.photoCredit}
            <span class="crew-card__credit">foto: {c.photoCredit}</span>
          {/if}
        </div>
        <div class="crew-card__body">
          <h3 class="crew-card__name">{c.name}</h3>
          <p class="crew-card__role">{c.title}</p>
          <p class="crew-card__desc">{c.description}</p>
          {#if c.tags.length}
            <div class="crew-card__tags">
              {#each c.tags as tag (tag)}
                <Tag label={tag} />
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <CtaSection />
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

  /* ── Crew grid — same border pattern as ArticleGrid ── */
  .crew-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2rem;
  }

  .crew-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 2px solid var(--color-black);
    border-bottom: 2px solid var(--color-black);
  }

  /* 2 columns: no right border on even, no bottom on last row */
  .crew-card:nth-child(2n) {
    border-right: none;
  }
  .crew-card:nth-last-child(-n + 2) {
    border-bottom: none;
  }

  .crew-card__img-wrap {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: rgb(0 0 0 / 0.08);
  }

  .crew-card__img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .crew-card__credit {
    position: absolute;
    bottom: 0;
    right: 0;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    padding: 0.2rem 0.4rem;
    background: rgb(0 0 0 / 0.55);
    color: var(--color-white);
    letter-spacing: 0.02em;
  }

  .crew-card__body {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .crew-card__name {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.2;
  }

  .crew-card__role {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgb(0 0 0 / 0.6);
  }

  .crew-card__desc {
    font-size: var(--text-body);
    line-height: 1.5;
    margin-top: 0.25rem;
    color: rgb(0 0 0 / 0.7);
  }

  .crew-card__tags {
    margin-top: auto;
    padding-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  /* ── Tablet (640px+) — 3 columns ── */
  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }

    .crew-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .crew-card:nth-child(2n) {
      border-right: 2px solid var(--color-black);
    }
    .crew-card:nth-last-child(-n + 2) {
      border-bottom: 2px solid var(--color-black);
    }

    .crew-card:nth-child(3n) {
      border-right: none;
    }
    .crew-card:nth-last-child(-n + 3) {
      border-bottom: none;
    }
  }

  /* ── Desktop (1024px+) — 4 columns ── */
  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

    .crew-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .crew-card:nth-child(3n) {
      border-right: 2px solid var(--color-black);
    }
    .crew-card:nth-last-child(-n + 3) {
      border-bottom: 2px solid var(--color-black);
    }

    .crew-card:nth-child(4n) {
      border-right: none;
    }
    .crew-card:nth-last-child(-n + 4) {
      border-bottom: none;
    }
  }

  /* ── Large desktop (1600px+) — 6 columns ── */
  @media (min-width: 1600px) {
    .crew-grid {
      grid-template-columns: repeat(6, 1fr);
    }

    .crew-card:nth-child(4n) {
      border-right: 2px solid var(--color-black);
    }
    .crew-card:nth-last-child(-n + 4) {
      border-bottom: 2px solid var(--color-black);
    }

    .crew-card:nth-child(6n) {
      border-right: none;
    }
    .crew-card:nth-last-child(-n + 6) {
      border-bottom: none;
    }
  }
</style>
