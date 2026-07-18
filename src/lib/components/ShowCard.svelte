<script lang="ts">
  import Tag from './Tag.svelte';
  import { playerState } from '$lib/stores/player.svelte';

  interface Props {
    href: string;
    title: string;
    date?: string;
    image?: string;
    tags?: string[];
    mixcloudKey?: string;
  }

  let { href, title, date, image, tags, mixcloudKey }: Props = $props();

  function play() {
    if (!mixcloudKey) return;
    playerState.setMixcloud({ key: mixcloudKey, title, image, url: href });
  }
</script>

{#snippet artwork()}
  {#if image}
    <!-- lazy i zato da display:none kartice u ShowsGridu ne skidaju sliku -->
    <img src={image} alt={title} class="card-image" loading="lazy" decoding="async" />
  {:else}
    <div class="card-image-placeholder" aria-hidden="true"></div>
  {/if}
{/snippet}

<article class="show-card">
  {#if mixcloudKey}
    <button type="button" class="card-image-link" onclick={play} tabindex="-1" aria-hidden="true">
      {@render artwork()}
      <span class="play-badge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <polygon points="2,1 13,7 2,13" />
        </svg>
      </span>
    </button>
  {:else}
    <a {href} class="card-image-link" tabindex="-1" aria-hidden="true">
      {@render artwork()}
    </a>
  {/if}

  <div class="card-body">
    {#if date}
      <p class="card-date">{date}</p>
    {/if}

    <h3 class="card-title">
      {#if mixcloudKey}
        <button type="button" onclick={play} aria-label="Slušaj: {title}">{title}</button>
      {:else}
        <a {href}>{title}</a>
      {/if}
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
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: rgb(0 0 0 / 0.08);
    border: 0;
    padding: 0;
  }

  button.card-image-link {
    cursor: pointer;
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

  .play-badge {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--color-black);
    color: var(--color-white);
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .show-card:hover .play-badge,
  .show-card:focus-within .play-badge {
    opacity: 1;
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
    line-clamp: 3;
    overflow: hidden;
  }

  .card-title a,
  .card-title button {
    color: inherit;
    text-decoration: none;
  }

  .card-title button {
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .card-title button:focus-visible {
    outline: 2px solid var(--color-black);
    outline-offset: 2px;
  }

  .card-title a:hover,
  .card-title button:hover {
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
