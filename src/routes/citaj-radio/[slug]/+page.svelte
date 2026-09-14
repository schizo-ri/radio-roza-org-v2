<script lang="ts">
  import { page } from '$app/state';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { tagHref } from '$lib/data/tags';

  let { data } = $props();
  const { article, related } = $derived(data);

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    url: page.url.origin + page.url.pathname,
    ...(article.excerpt ? { description: article.excerpt } : {}),
    ...(article.image ? { image: article.image } : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    dateModified: article.updatedAt,
    ...(article.author ? { author: { '@type': 'Person', name: article.author } } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Radio Roža',
      url: page.url.origin,
    },
    inLanguage: 'hr',
  });
</script>

<Seo
  title="{article.title} — Radio Roža"
  description={article.excerpt || undefined}
  image={article.ogImage}
  type="article"
/>

<JsonLd data={jsonLd} />

<main class="article-page">
  <div class="article-layout">
    <!-- Na desktopu sticky: naslovna slika, pa meta i naslov ispod nje.
         Na mobitelu meta i naslov idu iznad slike (order). Bez slike ostaje
         samo naslovni blok, s većim naslovom na desktopu. -->
    <header class="article-aside" class:no-image={!article.image}>
      {#if article.image}
        <div class="article-cover">
          <img src={article.image} alt={article.imageAlt} />
        </div>
      {/if}

      <div class="article-heading">
        <div class="article-meta">
          <span class="meta-date">{article.date}</span>
          {#if article.author}
            <span class="meta-sep">·</span>
            <span class="meta-author">{article.author}</span>
          {/if}
        </div>

        <h1 class="article-title">{article.title}</h1>
      </div>
    </header>

    <div class="article-body">
      {@html article.contentHtml}

      {#if article.categories.length > 0 || article.tags.length > 0}
        <div class="article-tags">
          {#each article.categories as cat (cat.slug)}
            <Tag label={cat.title} />
          {/each}
          {#each article.tags as tag (tag.slug)}
            <Tag label={tag.title} href={tagHref(tag.slug)} />
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if related.length > 0}
    <section class="related">
      <h2 class="related-title">vezani članci</h2>
      <ArticleGrid items={related}>
        {#snippet card(item)}
          <ArticleCard {...item} />
        {/snippet}
      </ArticleGrid>
    </section>
  {/if}
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
  }

  /* Two-column layout */
  .article-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .article-aside {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-self: start;
    min-width: 0;
  }

  .article-heading {
    order: -1;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid var(--color-black);
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

  /* Body text */
  .article-body {
    display: flex;
    flex-direction: column;
    gap: 1em;
    min-width: 0;
    font-size: var(--text-body);
  }

  .article-body :global(p) {
    line-height: 1.7;
    color: rgb(0 0 0 / 0.85);
    margin: 0;
  }

  .article-body :global(h2),
  .article-body :global(h3),
  .article-body :global(h4) {
    font-family: var(--font-display);
    font-weight: 400;
    line-height: 1.2;
    margin: 0;
  }

  .article-body :global(a) {
    color: inherit;
    text-underline-offset: 3px;
  }

  .article-body :global(strong) {
    font-weight: 700;
  }

  .article-body :global(blockquote) {
    border-left: 3px solid var(--color-black);
    padding-left: 1rem;
    margin: 0;
    font-style: italic;
  }

  .article-body :global(hr) {
    border: none;
    border-top: 1px solid rgb(0 0 0 / 0.15);
    margin: 0.5rem 0;
  }

  .article-body :global(pre) {
    background: rgb(0 0 0 / 0.05);
    padding: 1rem;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.875em;
  }

  .article-body :global(figure) {
    margin: 0;
  }

  .article-body :global(figure img) {
    width: 100%;
    height: auto;
    display: block;
  }

  .article-body :global(figcaption) {
    margin-top: 0.5rem;
    font-size: 0.8125rem;
    line-height: 1.4;
    color: rgb(0 0 0 / 0.6);
  }

  .article-body :global(figcaption p) {
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  .article-body :global(ul),
  .article-body :global(ol) {
    padding-left: 1.5rem;
    margin: 0;
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
    /* Isti razmak do mreže kao PageHeader na Čitaj radio */
    margin-bottom: 1rem;
  }

  /* Tablet */
  @media (min-width: 640px) {
    .article-page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .article-page {
      padding: 2.5rem 2rem 6rem;
    }

    .article-layout {
      grid-template-columns: 45fr 55fr;
      column-gap: clamp(3rem, 5vw, 8rem);
    }

    /* Sticky ispod playera (--player-offset prati i skrivanje izbornika).
       max-height + skupljanje slike drže cijeli blok unutar ekrana. */
    .article-aside {
      position: sticky;
      top: calc(var(--player-offset, 140px) + 1.5rem);
      max-height: calc(100svh - var(--player-offset, 140px) - 3rem);
      gap: 1rem;
      transition: top 0.3s ease;
    }

    .article-cover {
      flex: 0 1 auto;
      min-height: 0;
    }

    .article-heading {
      order: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .article-meta {
      margin-bottom: 0.5rem;
    }

    .article-title {
      font-size: clamp(2.5rem, 2.2vw, 3.25rem);
    }

    .no-image .article-title {
      font-size: var(--text-display);
      line-height: 1.05;
      text-wrap: balance;
    }

    .article-body {
      font-size: 1.125rem;
    }
  }

  /* Širi od 1920px: veći tekst preko cijelog stupca */
  @media (min-width: 1921px) {
    .article-body {
      font-size: 24px;
    }
  }
</style>
