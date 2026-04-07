<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { program, blocks, type Day } from '$lib/utils/program';

  // --- Program danas ---
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as Day;
  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();

  const todayShows = program
    .filter((s) => s.day === today)
    .sort((a, b) => a.show_start.localeCompare(b.show_start));

  // Split into past and upcoming — show last 1 aired + next 4 upcoming
  const pastShows = todayShows.filter((s) => {
    const [h, m] = s.show_start.split(':').map(Number);
    return h * 60 + m <= currentTime;
  });
  const upcomingShows = todayShows.filter((s) => {
    const [h, m] = s.show_start.split(':').map(Number);
    return h * 60 + m > currentTime;
  });

  const currentShow = pastShows.at(-1) ?? null;
  const programPreview = [
    ...(currentShow ? [currentShow] : []),
    ...upcomingShows.slice(0, 4),
  ].slice(0, 5);

  // --- Mock data — replace with CMS ---
  const excerpt =
    'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.';

  const newArticles = [
    { href: '/citaj-radio/rijecka-underground', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Hip hop', 'Rap'] },
    { href: '/citaj-radio/zvukovi-2', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Kultura'] },
    { href: '/citaj-radio/rijecka-3', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Intervju'] },
    { href: '/citaj-radio/zvukovi-4', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Glazba'] },
  ];

  const citajRadioPreview = [
    { href: '/citaj-radio/a', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/b', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/c', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
    { href: '/citaj-radio/d', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt, showKomentar: true },
  ];

  const archiveArticles = [
    { href: '/citaj-radio/arc-1', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Hip hop'] },
    { href: '/citaj-radio/arc-2', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Rock'] },
    { href: '/citaj-radio/arc-3', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Kultura'] },
    { href: '/citaj-radio/arc-4', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Intervju'] },
    { href: '/citaj-radio/arc-5', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Glazba'] },
    { href: '/citaj-radio/arc-6', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', tags: ['Hip hop'] },
  ];
</script>

<svelte:head>
  <title>Radio Roža</title>
</svelte:head>

<!-- ── novo novo novo ─────────────────────────────── -->
<section class="home-section">
  <div class="section-header">
    <h2 class="section-title">novo novo novo</h2>
    <a href="/citaj-radio" class="section-link">sve →</a>
  </div>
  <div class="grid-cover">
    {#each newArticles as article (article.href)}
      <ArticleCard {...article} image="" />
    {/each}
  </div>
</section>

<!-- ── program danas + čitaj radio ───────────────── -->
<div class="mid-section">
  <!-- Program danas -->
  <section class="mid-col mid-col--program">
    <div class="section-header">
      <h2 class="section-title">program danas</h2>
      <a href="/program" class="section-link">cijeli program →</a>
    </div>

    <ul class="program-list">
      {#each programPreview as show (show.title + show.show_start)}
        {@const isNow = show === currentShow}
        <li class="program-row" class:is-now={isNow}>
          <span class="program-time">{show.show_start}</span>
          <div class="program-info">
            <span class="program-name">{show.title}</span>
            {#if blocks[show.title]}
              <p class="program-desc">{blocks[show.title]}</p>
            {/if}
          </div>
          {#if isNow}
            <span class="now-badge">sada</span>
          {/if}
        </li>
      {/each}
    </ul>
  </section>

  <!-- Čitaj radio preview -->
  <section class="mid-col mid-col--citaj">
    <div class="section-header">
      <h2 class="section-title">čitaj radio</h2>
      <a href="/citaj-radio" class="section-link">sve →</a>
    </div>
    <div class="grid-text">
      {#each citajRadioPreview as article (article.href)}
        <ArticleCard {...article} />
      {/each}
    </div>
  </section>
</div>

<!-- ── najbolje iz arhive ─────────────────────────── -->
<section class="home-section">
  <div class="section-header">
    <h2 class="section-title">najbolje iz arhive</h2>
    <a href="/citaj-radio" class="section-link">sve →</a>
  </div>
  <div class="grid-cover grid-cover--wide">
    {#each archiveArticles as article (article.href)}
      <ArticleCard {...article} image="" />
    {/each}
  </div>
</section>

<!-- ── CTAs ───────────────────────────────────────── -->
<div class="cta-section">
  <div class="cta-block">
    <h2 class="cta-title">podržni nas</h2>
    <div class="cta-image cta-image--placeholder" aria-hidden="true"></div>
    <p class="cta-body"><!-- content TBD --></p>
  </div>
  <div class="cta-block">
    <h2 class="cta-title">pridruži se</h2>
    <div class="cta-image cta-image--placeholder" aria-hidden="true"></div>
    <p class="cta-body"><!-- content TBD --></p>
  </div>
</div>

<style>
  /* ── Shared section styles ── */
  .home-section {
    padding: 0 1rem;
    margin-bottom: 3rem;
  }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 2px solid var(--color-black);
    padding-bottom: 0.5rem;
    margin-bottom: 0;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  .section-link {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgb(0 0 0 / 0.45);
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .section-link:hover {
    color: var(--color-black);
  }

  /* ── Cover card grids ── */
  .grid-cover {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
  }

  .grid-cover--wide {
    grid-template-columns: repeat(2, 1fr);
  }

  /* ── Mid section (program danas + čitaj radio) ── */
  .mid-section {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 3rem;
  }

  .mid-col {
    padding: 0 1rem;
  }

  .mid-col--program {
    margin-bottom: 3rem;
  }

  /* Program list */
  .program-list {
    list-style: none;
  }

  .program-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgb(0 0 0 / 0.1);
  }

  .program-time {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
    flex-shrink: 0;
    width: 2.75rem;
    padding-top: 0.15em;
  }

  .program-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .program-name {
    font-family: var(--font-display);
    font-size: var(--text-body);
    line-height: 1.3;
  }

  .program-desc {
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.5);
    line-height: 1.4;
    display: none;
  }

  .now-badge {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-brand);
    flex-shrink: 0;
    padding-top: 0.15em;
  }

  .program-row.is-now .program-name {
    color: var(--color-brand);
  }

  /* Text card grid (čitaj radio preview) */
  .grid-text {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1px;
    row-gap: 0;
    background: rgb(0 0 0 / 0.12);
  }

  /* ── CTAs ── */
  .cta-section {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 2px solid var(--color-black);
  }

  .cta-block {
    padding: 1.5rem 1rem 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .cta-block + .cta-block {
    border-top: 2px solid var(--color-black);
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .cta-body {
    font-size: var(--text-body);
    color: rgb(0 0 0 / 0.7);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .cta-image--placeholder {
    margin-top: auto;
    aspect-ratio: 4 / 3;
    background: rgb(0 0 0 / 0.07);
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .home-section {
      padding: 0 1.5rem;
      margin-bottom: 4rem;
    }

    .mid-col {
      padding: 0 1.5rem;
    }

    .grid-cover {
      grid-template-columns: repeat(3, 1fr);
    }

    .grid-cover--wide {
      grid-template-columns: repeat(3, 1fr);
    }

    .grid-text {
      grid-template-columns: repeat(2, 1fr);
    }

    .program-desc {
      display: block;
    }
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .home-section {
      padding: 0 2rem;
      margin-bottom: 5rem;
    }

    .grid-cover {
      grid-template-columns: repeat(4, 1fr);
    }

    .grid-cover--wide {
      grid-template-columns: repeat(6, 1fr);
    }

    /* Program + čitaj radio side by side */
    .mid-section {
      grid-template-columns: 1fr 1fr;
      margin-bottom: 5rem;
      border-top: 2px solid var(--color-black);
    }

    .mid-col {
      padding: 0 2rem;
    }

    .mid-col--program {
      margin-bottom: 0;
      border-right: 1px solid rgb(0 0 0 / 0.15);
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .mid-col--citaj {
      padding-left: 2rem;
    }

    .mid-col .section-header {
      border-bottom: none;
      border-top: none;
      padding-top: 0.75rem;
    }

    .grid-text {
      grid-template-columns: repeat(2, 1fr);
    }

    /* CTAs side by side */
    .cta-section {
      grid-template-columns: 1fr 1fr;
    }

    .cta-block + .cta-block {
      border-top: none;
      border-left: 2px solid var(--color-black);
    }

    .cta-block {
      padding: 2rem 2rem 0;
    }
  }
</style>
