<script lang="ts">
  import Tag from './Tag.svelte';

  interface Props {
    href: string;
    title: string;
    date: string;
    author?: string;
    readTime?: string;
    excerpt?: string;
    image?: string;
    tags?: string[];
    category?: string;
    showKomentar?: boolean;
  }

  let {
    href,
    title,
    date,
    author,
    readTime,
    excerpt,
    image,
    tags,
    category,
    showKomentar = false,
  }: Props = $props();
</script>

<article class="article-card" class:has-image={!!image}>
  {#if image}
    <a {href} class="card-image-link" tabindex="-1" aria-hidden="true">
      <img src={image} alt={title} class="card-image" />
    </a>
  {/if}

  <div class="card-body">
    <p class="card-date">{date}</p>

    <h3 class="card-title">
      <a {href}>{title}</a>
    </h3>

    {#if author || readTime}
      <p class="card-meta">
        {#if author}<span>{author}</span>{/if}
        {#if author && readTime}<span class="meta-sep">·</span>{/if}
        {#if readTime}<span>{readTime}</span>{/if}
      </p>
    {/if}

    {#if excerpt}
      <p class="card-excerpt">{excerpt}</p>
    {/if}

    {#if tags && tags.length > 0}
      <div class="card-tags">
        {#each tags as tag (tag)}
          <Tag label={tag} />
        {/each}
      </div>
    {/if}

    {#if category}
      <div class="card-tags">
        <Tag label={category} color="none" />
      </div>
    {/if}

    {#if showKomentar}
      <a href="{href}#komentari" class="card-komentar">komentar</a>
    {/if}
  </div>
</article>

<style>
  .article-card {
    display: flex;
    flex-direction: column;
    /*border-right: 2px solid black;*/
    /*border-bottom: 2px solid black;*/
    background-color: var(--color-bg);
    padding: 4px 12px;
  }

  /* Cover image */
  .card-image-link {
    display: block;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .article-card:hover .card-image {
    transform: scale(1.03);
  }

  /* Body */
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.75rem 0 1rem;
    flex: 1;
  }

  .has-image .card-body {
    padding-top: 0.5rem;
  }

  .card-date {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.2;
  }

  .card-title a {
    color: inherit;
    text-decoration: none;
  }

  .card-title a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .card-meta {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3em;
  }

  .meta-sep {
    color: rgb(0 0 0 / 0.3);
  }

  .card-excerpt {
    font-size: var(--text-body);
    color: rgb(0 0 0 / 0.6);
    line-height: 1.5;
    /* clamp to 3 lines */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.25rem;
  }

  .card-komentar {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-black);
    text-decoration: none;
    margin-top: auto;
    padding-top: 0.75rem;
  }

  .card-komentar:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
