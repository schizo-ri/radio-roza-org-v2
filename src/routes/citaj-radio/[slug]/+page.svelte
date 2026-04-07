<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import Tag from '$lib/components/Tag.svelte';

  // Mock article — replace with CMS fetch via +page.ts
  const article = {
    title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
    date: '02.03.2026.',
    author: 'Martina Blečić',
    readTime: '4 min read',
    image: undefined as string | undefined,
    tags: ['Hip hop', 'Rap', 'Hardcore Hip Hop'],
    body: [
      'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.',
      'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima. Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima. Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.',
      'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima. Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.',
    ],
  };

  const related = [
    { href: '/citaj-radio/rijecka-1', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu.', showKomentar: true },
    { href: '/citaj-radio/zvukovi-2', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu.', showKomentar: true },
    { href: '/citaj-radio/rijecka-3', title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu.', showKomentar: true },
    { href: '/citaj-radio/zvukovi-4', title: 'Zvukovi iz podruma koji oblikuju budućnost', date: '02.03.2026.', author: 'Martina Blečić', readTime: '4 min read', excerpt: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu.', showKomentar: true },
  ];
</script>

<svelte:head>
  <title>{article.title} — Radio Roža</title>
</svelte:head>

<main class="article-page">
  <div class="article-meta">
    <span class="meta-date">{article.date}</span>
    {#if article.author}
      <span class="meta-sep">·</span>
      <span class="meta-author">{article.author}</span>
    {/if}
  </div>

  <h1 class="article-title">{article.title}</h1>

  <div class="article-layout">
    <div class="article-cover">
      {#if article.image}
        <img src={article.image} alt={article.title} />
      {:else}
        <div class="cover-placeholder" aria-hidden="true"></div>
      {/if}
    </div>

    <div class="article-body">
      {#each article.body as paragraph}
        <p>{paragraph}</p>
      {/each}

      {#if article.tags.length > 0}
        <div class="article-tags">
          {#each article.tags as tag (tag)}
            <Tag label={tag} />
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <section class="related">
    <h2 class="related-title">vezani članci</h2>
    <div class="related-grid">
      {#each related as item (item.href)}
        <ArticleCard {...item} />
      {/each}
    </div>
  </section>
</main>

<style>
  .article-page {
    padding: 1.5rem 1rem 4rem;
  }

  /* Meta */
  .article-meta {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
    display: flex;
    align-items: center;
    gap: 0.4em;
    margin-bottom: 0.75rem;
  }

  .meta-sep {
    color: rgb(0 0 0 / 0.3);
  }

  /* Title */
  .article-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  /* Two-column layout */
  .article-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 4rem;
    border-top: 2px solid var(--color-black);
    padding-top: 1.5rem;
  }

  .article-cover {
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .article-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cover-placeholder {
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 0.08);
  }

  /* Body text */
  .article-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .article-body p {
    font-size: var(--text-body);
    line-height: 1.7;
    color: rgb(0 0 0 / 0.85);
  }

  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.5rem;
  }

  /* Related */
  .related {
    border-top: 2px solid var(--color-black);
    padding-top: 0.75rem;
  }

  .related-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 0;
  }

  .related-grid {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1px;
    row-gap: 0;
    background: rgb(0 0 0 / 0.12);
  }

  /* Tablet */
  @media (min-width: 640px) {
    .article-page {
      padding: 2rem 1.5rem 5rem;
    }

    .related-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .article-page {
      padding: 2.5rem 2rem 6rem;
    }

    .article-layout {
      grid-template-columns: 45fr 55fr;
      gap: 3rem;
    }

    .article-cover {
      aspect-ratio: auto;
    }

    .related-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
