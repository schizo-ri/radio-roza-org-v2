<script lang="ts">
  import { untrack } from 'svelte';
  import type { LNEpisode } from '../../routes/emisije/[slug]/+page.server.ts';

  interface Props {
    episodes: LNEpisode[];
    nextCursor: number | null;
    podcastId: string;
  }

  let { episodes: initialEpisodes, nextCursor: initialCursor, podcastId }: Props = $props();

  let episodes = $state<LNEpisode[]>(untrack(() => initialEpisodes));
  let nextCursor = $state<number | null>(untrack(() => initialCursor));
  let loadingMore = $state(false);
  let error = $state<string | null>(null);

  function formatDate(ms: number): string {
    return new Date(ms).toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  async function loadMore() {
    loadingMore = true;
    error = null;
    try {
      const res = await fetch(
        `/api/listennotes/${podcastId}?next_episode_pub_date=${nextCursor}`,
      );
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      episodes = [...episodes, ...(data.episodes ?? [])];
      nextCursor = data.next_episode_pub_date ?? null;
    } catch (e) {
      error = (e as Error).message;
    } finally {
      loadingMore = false;
    }
  }
</script>

{#if episodes.length === 0}
  <p class="status">Nema dostupnih epizoda.</p>
{:else}
  <ul class="episode-list">
    {#each episodes as ep (ep.id)}
      <li class="episode-row">
        <div class="episode-meta">
          <span class="episode-date">{formatDate(ep.pub_date_ms)}</span>
          <span class="episode-duration">{formatDuration(ep.audio_length_sec)}</span>
        </div>
        <a class="episode-title" href={ep.listennotes_url} target="_blank" rel="noopener noreferrer">
          {ep.title}
        </a>
      </li>
    {/each}
  </ul>

  {#if nextCursor}
    <button class="load-more" onclick={loadMore} disabled={loadingMore}>
      {loadingMore ? 'Učitavanje...' : 'Učitaj još'}
    </button>
  {/if}

  {#if error}
    <p class="status">Greška pri učitavanju: {error}</p>
  {/if}
{/if}

<style>
  .status {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    padding: 1.5rem 0;
  }

  .episode-list {
    list-style: none;
  }

  .episode-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.875rem 0;
    border-bottom: 2px solid var(--color-black, #000);
  }

  .episode-row:first-child {
    border-top: 2px solid var(--color-black, #000);
  }

  .episode-meta {
    display: flex;
    gap: 1rem;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
  }

  .episode-title {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
    line-height: 1.2;
    color: inherit;
    text-decoration: none;
  }

  .episode-title:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .load-more {
    all: unset;
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 0.875rem 0;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-align: center;
    border-top: 2px solid var(--color-black);
    border-bottom: 2px solid var(--color-black);
    margin-top: -2px;
    transition: background-color 0.15s;
  }

  .load-more:hover:not(:disabled) {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  .load-more:disabled {
    opacity: 0.45;
    cursor: default;
  }
</style>
