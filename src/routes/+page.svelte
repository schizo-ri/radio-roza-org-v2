<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import ShowCard from '$lib/components/ShowCard.svelte';
  import SeeAll from '$lib/components/SeeAll.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import CtaSection from '$lib/components/CtaSection.svelte';
  import { browser } from '$app/environment';
  import { program, blocks, type Day } from '$lib/utils/program';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // --- Program danas ---
  let now = $state(new Date());

  $effect(() => {
    if (!browser) return;
    const id = setInterval(() => {
      now = new Date();
    }, 60_000);
    return () => clearInterval(id);
  });

  const today = $derived(now.toLocaleDateString('en-US', { weekday: 'long' }) as Day);
  const currentTime = $derived(now.getHours() * 60 + now.getMinutes());

  const todayShows = $derived(
    program.filter((s) => s.day === today).sort((a, b) => a.show_start.localeCompare(b.show_start))
  );

  const currentShow = $derived(
    todayShows.findLast((s) => {
      const [h, m] = s.show_start.split(':').map(Number);
      return h * 60 + m <= currentTime;
    }) ?? null
  );

  const programPreview = $derived(
    [
      ...(currentShow ? [currentShow] : []),
      ...todayShows
        .filter((s) => {
          const [h, m] = s.show_start.split(':').map(Number);
          return h * 60 + m > currentTime;
        })
        .slice(0, 4),
    ].slice(0, 5)
  );

  const excerpt =
    'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.';

  const citajRadioPreview = [
    {
      href: '/citaj-radio/album',
      title: 'Bambi Molesters: Dumb Loud Hollow Twang',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      excerpt:
        'Istražujemo kako riječki underground prostori i kolektivi stvaraju  jedinstvenu glazbenu kulturu koja odolijevia mainstream pritiscima.',
      image: 'images/1.jpg',
      category: 'album tjedna',
    },
    {
      href: '/citaj-radio/a',
      title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      excerpt,
      category: 'komentar',
    },
    {
      href: '/citaj-radio/b',
      title: 'Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      excerpt,
      category: 'ćakule',
    },
    {
      href: '/citaj-radio/c',
      title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      excerpt,
      category: 'aktualno',
    },
    {
      href: '/citaj-radio/d',
      title: 'Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      excerpt,
      category: 'komentar',
    },
  ];

  const albumTjedna = citajRadioPreview.find((a) => a.category === 'album tjedna') ?? null;
  const citajRadioList = citajRadioPreview.filter((a) => a.category !== 'album tjedna');

  const archiveArticles = [
    {
      href: '/citaj-radio/arc-1',
      title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      tags: ['Hip hop'],
    },
    {
      href: '/citaj-radio/arc-2',
      title: 'Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      tags: ['Rock'],
    },
    {
      href: '/citaj-radio/arc-3',
      title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      tags: ['Kultura'],
    },
    {
      href: '/citaj-radio/arc-4',
      title: 'Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      tags: ['Intervju'],
    },
    {
      href: '/citaj-radio/arc-5',
      title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      tags: ['Glazba'],
    },
    {
      href: '/citaj-radio/arc-6',
      title: 'Zvukovi iz podruma koji oblikuju budućnost',
      date: '02.03.2026.',
      author: 'Martina Blečić',
      readTime: '4 min read',
      tags: ['Hip hop'],
    },
  ];
</script>

<svelte:head>
  <title>Radio Roža</title>
</svelte:head>

<!-- ── novo novo novo ─────────────────────────────── -->
<section class="home-section">
  <div class="section-header">
    <h2 class="section-title">novo novo novo</h2>
  </div>
  <ArticleGrid items={data.shows}>
    {#snippet card(item)}
      <ShowCard {...item} />
    {/snippet}
  </ArticleGrid>
  <div class="section-link">
    <SeeAll href="/citaj-radio" label="Vidi sve " />
  </div>
</section>

<!-- ── program danas + čitaj radio ───────────────── -->
<div class="mid-section">
  <!-- Program danas -->
  <section class="mid-col mid-col--program">
    <div class="section-header">
      <h2 class="section-title">program danas</h2>
    </div>

    <ul class="program-list">
      {#each programPreview as show (show.title + show.show_start)}
        {@const isNow = show === currentShow}
        {@const block = blocks.find((b) => b.title === show.title)}
        <li class="program-row" class:is-now={isNow}>
          <span class="program-time">{show.show_start}</span>
          <div class="program-info">
            <span class="program-name">{show.title}</span>
            {#if block}
              <p class="program-desc">{block.description}</p>
              <div class="program-tags">
                {#each block.tags as tag (tag)}
                  <Tag label={tag} />
                {/each}
              </div>
            {/if}
          </div>
          {#if isNow}
            <span class="now-badge">sada</span>
          {/if}
        </li>
      {/each}
    </ul>
    <div class="section-link">
      <SeeAll href="/program" label="Pogledaj cijeli program" />
    </div>
  </section>

  <!-- Čitaj radio preview -->
  <section class="mid-col mid-col--citaj">
    <div class="section-header">
      <h2 class="section-title">čitaj radio</h2>
    </div>

    {#if albumTjedna}
      <a href={albumTjedna.href} class="album-card">
        {#if albumTjedna.image}
          <img src={albumTjedna.image} alt={albumTjedna.title} class="album-image" />
        {/if}
        <div class="album-body">
          <p class="album-meta">
            {albumTjedna.date}
          </p>
          <h3 class="album-title">{albumTjedna.title}</h3>
          <p class="album-meta">
            {#if albumTjedna.author}{albumTjedna.author}{/if}
            {#if albumTjedna.readTime}({albumTjedna.readTime}){/if}
          </p>
          {#if albumTjedna.excerpt}
            <p class="album-excerpt">{albumTjedna.excerpt}</p>
          {/if}
          <div class="album-tag">
            <Tag label="album tjedna" color="red" />
          </div>
        </div>
      </a>
    {/if}

    <ArticleGrid items={citajRadioList}>
      {#snippet card(item)}
        <ArticleCard {...item} />
      {/snippet}
    </ArticleGrid>

    <div class="section-link">
      <SeeAll href="/citaj-radio" label="Pročitaj radio" />
    </div>
  </section>
</div>

<!-- ── najbolje iz arhive ─────────────────────────── -->
<section class="home-section">
  <div class="section-header">
    <h2 class="section-title">najbolje iz arhive</h2>
  </div>
  <ArticleGrid items={archiveArticles}>
    {#snippet card(item)}
      <ArticleCard {...item} />
    {/snippet}
  </ArticleGrid>
  <div class="section-link">
    <SeeAll href="/citaj-radio" label="Vidi sve iz arhive" />
  </div>
</section>

<!-- ── CTAs ───────────────────────────────────────── -->
<CtaSection />

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
    margin: 0.75rem 0;
  }

  /* ── Mid section (program danas + čitaj radio) ── */
  .mid-section {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 3rem;
    padding: 0 1rem;
  }

  .mid-col--program {
    margin-bottom: 3rem;
  }

  .mid-col--citaj {
    container-type: inline-size;
  }

  /* Program list */
  .program-list {
    list-style: none;
  }

  .program-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 2px solid black;
  }

  .program-time {
    font-family: var(--font-body);
    font-size: var(--text-title);
    flex-shrink: 0;
    line-height: 1.2;
    width: 2.5em;
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
    font-size: var(--text-title);
    line-height: 1.2;
  }

  .program-desc {
    font-size: var(--text-body);
    line-height: 1.5;
    display: none;
  }

  .program-tags {
    display: none;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: 0.25rem;
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

  .album-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    border-bottom: 2px solid var(--color-black);
    padding: 12px;
    background-color: white;
  }

  .album-image {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1;
    object-fit: cover;
    display: block;
    margin-bottom: 0.75rem;
    flex-shrink: 0;
  }

  @container (min-width: 400px) {
    .album-card {
      flex-direction: row;
      align-items: flex-start;
      gap: 1rem;
    }

    .album-image {
      width: 45%;
      margin-bottom: 0;
    }
  }

  .album-body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    height: stretch;
  }

  .album-title {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.2;
  }

  .album-card:hover .album-title {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .album-meta {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 700;
  }

  .album-excerpt {
    font-size: var(--text-body);
    line-height: 1.5;
  }

  .album-tag {
    margin-top: auto;
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .home-section {
      padding: 0 1.5rem;
      margin-bottom: 4rem;
    }

    .program-desc {
      display: block;
    }

    .program-tags {
      display: flex;
    }
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .home-section {
      padding: 0 2rem;
      margin-bottom: 5rem;
    }

    /* Program + čitaj radio side by side */
    .mid-section {
      grid-template-columns: minmax(0, 50em) 1fr;
      margin-bottom: 5rem;
      padding: 0 2rem;
    }

    .mid-col--program {
      margin-bottom: 0;
      border-right: 2px solid black;
    }

    .program-row {
      padding-right: 2rem;
    }

    .mid-col--citaj {
      padding-left: 2rem;
    }

    .mid-col .section-header {
      border-bottom: none;
      border-top: none;
      padding-top: 1rem;
    }
  }
</style>
