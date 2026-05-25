<script lang="ts">
  import { page } from '$app/state';
  import ListenNotesEpisodes from '$lib/components/ListenNotesEpisodes.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { shows } from '$lib/data/shows';

  let { data } = $props();

  const show = $derived(shows.find((s) => s.href === `/emisije/${page.params.slug}`));
</script>

<svelte:head>
  <title>{show?.title ?? 'Emisija'} — Radio Roža</title>
</svelte:head>

{#if show}
  <main class="page">
    <header class="page-header">
      <h1 class="page-title">emisije</h1>
    </header>

    <div class="show-layout">
      <!-- Left: cover + about -->
      <div class="show-left">
        <div class="show-cover">
          {#if show.image}
            <img src={show.image} alt={show.title} />
          {:else}
            <div class="cover-placeholder" aria-hidden="true"></div>
          {/if}
        </div>

        <div class="show-about">
          {#if show.description}
            <p class="show-desc">{show.description}</p>
          {/if}
          {#if show.authors.length > 0}
            <p class="show-authors">{show.authors.join(', ')}</p>
          {/if}
          {#if show.tags.length > 0}
            <div class="show-tags">
              {#each show.tags as tag (tag)}
                <Tag label={tag} />
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Right: episodes -->
      <div class="show-right">
        {#if data.lnEpisodes}
          <ListenNotesEpisodes
            episodes={data.lnEpisodes}
            nextCursor={data.lnNextCursor}
            podcastId={data.lnPodcastId}
          />
        {:else if show.playlist_url?.includes('mixcloud.com')}
          <MixcloudPlaylist playlistUrl={show.playlist_url} />
        {:else if show.playlist_url}
          <p class="no-playlist">
            Epizode dostupne na <a
              href={show.playlist_url}
              target="_blank"
              rel="noopener noreferrer">vanjskoj platformi →</a
            >
          </p>
        {:else}
          <p class="no-playlist">Nema epizoda za ovu emisiju.</p>
        {/if}
      </div>
    </div>
  </main>
{:else}
  <main class="page">
    <p class="not-found">Emisija nije pronađena.</p>
  </main>
{/if}

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  /* Header row */
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding-bottom: 1rem;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  .show-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .show-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .show-cover {
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .show-cover img {
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

  .show-about {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .show-desc {
    font-size: var(--text-body);
    line-height: 1.5;
    white-space: pre-line;
  }

  .show-authors {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
  }

  .show-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .show-right {
    min-width: 0;
  }

  .no-playlist,
  .not-found {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
  }

  .no-playlist a {
    color: inherit;
    text-underline-offset: 3px;
  }

  /* Tablet */
  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

    .show-layout {
      grid-template-columns: 40fr 60fr;
      gap: 3rem;
      align-items: start;
    }
  }
</style>
