<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import Tag from '$lib/components/Tag.svelte';

  let { data } = $props();
  const { article, related } = $derived(data);
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
        <img src={article.image} alt={article.imageAlt} />
      {:else}
        <div class="cover-placeholder" aria-hidden="true"></div>
      {/if}
    </div>

    <div class="article-body">
      {@html article.contentHtml}

      {#if article.categories.length > 0}
        <div class="article-tags">
          {#each article.categories as cat (cat.slug)}
            <Tag label={cat.title} />
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if related.length > 0}
    <section class="related">
      <h2 class="related-title">vezani članci</h2>
      <div class="related-grid">
        {#each related as item (item.href)}
          <ArticleCard {...item} />
        {/each}
      </div>
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

  .article-body :global(p) {
    font-size: var(--text-body);
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
