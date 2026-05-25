<svelte:head>
  <title>Projekti — Radio Roža</title>
  <meta name="description" content="Europski i nacionalni projekti provedeni na Radio Roži." />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">projekti</h1>
  </header>

  <div class="projects-grid">
    <a class="project-card" href="/o-nama/projekti/ziroskop">
      <div class="card-image">
        <div class="card-image-placeholder" aria-hidden="true"></div>
      </div>
      <div class="card-body">
        <h2 class="card-title">Žiroskop</h2>
        <p class="card-desc">Razvoj civilno-javnog partnerstva u upravljanju prostorima kulture u Rijeci.</p>
      </div>
    </a>

    <a class="project-card" href="/o-nama/projekti/korona-kid">
      <div class="card-image">
        <img src="/images/projekti/korona-kid/kk_cover.png" alt="Korona Kid" />
      </div>
      <div class="card-body">
        <h2 class="card-title">Korona Kid</h2>
        <p class="card-desc">Poticanje djece i mladih na građanski angažman kroz usvajanje novih znanja.</p>
      </div>
    </a>

    <a class="project-card" href="/o-nama/projekti/17-bitnih">
      <div class="card-image">
        <img src="/images/projekti/17-bitnih/main17.png" alt="17 Bitnih" />
      </div>
      <div class="card-body">
        <h2 class="card-title">17 Bitnih</h2>
        <p class="card-desc">17 voditelja kroz 17 epizoda o ciljevima održivog razvoja.</p>
      </div>
    </a>

    <a class="project-card" href="/o-nama/projekti/odasiljac">
      <div class="card-image">
        <img src="/images/projekti/odasiljac/logo_red.png" alt="Odašiljač" />
      </div>
      <div class="card-body">
        <h2 class="card-title">Odašiljač</h2>
        <p class="card-desc">Izgradnja stručnih kadrova za izvještavanje o ranjivim skupinama.</p>
      </div>
    </a>

    <a class="project-card" href="/o-nama/projekti/digitalne-rozice">
      <div class="card-image">
        <img src="/images/projekti/digitalne-rozice/art-dr.png" alt="Digitalne Rožice" />
      </div>
      <div class="card-body">
        <h2 class="card-title">Digitalne Rožice</h2>
        <p class="card-desc">Online kreativne i umjetničke aktivnosti za djecu i mlade.</p>
      </div>
    </a>

    <a class="project-card" href="/o-nama/projekti/inkluzivni-kotac">
      <div class="card-image">
        <img src="/images/projekti/inkluzivni-kotac/kotac2.jpg" alt="Inkluzivni Kotač" />
      </div>
      <div class="card-body">
        <h2 class="card-title">Inkluzivni Kotač</h2>
        <p class="card-desc">Jačanje građanske svijesti i angažmana u vezi romskih tema.</p>
      </div>
    </a>
  </div>
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  .page-header {
    padding-bottom: 1rem;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  /* Border-grid: container provides left+top edge; cards add right+bottom */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    border-left: 2px solid var(--color-black);
    border-top: 2px solid var(--color-black);
  }

  .project-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg);
    padding: 8px;
    border-right: 2px solid var(--color-black);
    border-bottom: 2px solid var(--color-black);
    text-decoration: none;
    color: inherit;
  }

  .card-image {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: rgb(0 0 0 / 0.08);
  }

  .card-image-placeholder {
    width: 100%;
    height: 100%;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .project-card:hover .card-image img {
    transform: scale(1.03);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.5rem 0 0.75rem;
    flex: 1;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
    line-height: 1.2;
  }

  .card-desc {
    font-size: var(--text-body);
    line-height: 1.5;
    color: rgb(0 0 0 / 0.65);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }

    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
