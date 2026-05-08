<script lang="ts">
  import Tag from './Tag.svelte';

  interface Props {
    href: string;
    title: string;
    date?: string;
    image?: string;
    tags?: string[];
    mixcloudKey?: string;
  }

  let { href, title, date, image, tags }: Props = $props();
</script>

<article class="show-card">
  <a {href} class="card-image-link" tabindex="-1" aria-hidden="true" target="_blank" rel="noopener noreferrer">
    {#if image}
      <img src={image} alt={title} class="card-image" />
    {:else}
      <div class="card-image-placeholder" aria-hidden="true"></div>
    {/if}
  </a>

  <div class="card-body">
    {#if date}
      <p class="card-date">{date}</p>
    {/if}

    <h3 class="card-title">
      <a {href} target="_blank" rel="noopener noreferrer">{title}</a>
    </h3>

    {#if tags && tags.length > 0}
      <div class="card-tags">
        {#each tags as tag (tag)}
          <Tag label={tag} />
        {/each}
      </div>
    {/if}
  </div>
</article>

<style>
  .show-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg);
    padding: 8px;
  }

  .card-image-link {
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: rgb(0 0 0 / 0.08);
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .card-image-placeholder {
    width: 100%;
    height: 100%;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.4rem;
    padding: 0.5rem 0 0.75rem;
  }

  .card-date {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .card-title a {
    color: inherit;
    text-decoration: none;
  }

  .card-title a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: auto;
  }
</style>
