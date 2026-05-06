<script lang="ts">
  import { browser } from '$app/environment';
  import Tag from '$lib/components/Tag.svelte';

  interface MixcloudTag {
    name: string;
    url: string;
  }

  interface MixcloudEpisode {
    key: string;
    name: string;
    url: string;
    created_time: string;
    audio_length: number;
    tags?: MixcloudTag[];
  }

  interface Props {
    playlistUrl: string;
  }

  let { playlistUrl }: Props = $props();

  const PAGE_SIZE = 20;

  let episodes = $state<MixcloudEpisode[]>([]);
  let loading = $state(true);
  let loadingMore = $state(false);
  let error = $state<string | null>(null);
  let nextUrl = $state<string | null>(null);

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('hr-HR', {
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

  async function fetchPage(url: string, append = false) {
    append ? (loadingMore = true) : (loading = true);
    error = null;

    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`${r.status}`);
      const data = await r.json();
      const batch: MixcloudEpisode[] = data.data ?? [];
      episodes = [...(append ? episodes : []), ...batch];
      nextUrl = data.paging?.next ?? null;
    } catch (e) {
      error = (e as Error).message;
    } finally {
      append ? (loadingMore = false) : (loading = false);
    }
  }

  $effect(() => {
    if (!browser || !playlistUrl) {
      loading = false;
      return;
    }

    const path = (() => {
      try {
        return new URL(playlistUrl).pathname;
      } catch {
        return playlistUrl.startsWith('/') ? playlistUrl : `/${playlistUrl}`;
      }
    })();

    episodes = [];
    nextUrl = null;
    fetchPage(`https://api.mixcloud.com${path}cloudcasts/?limit=${PAGE_SIZE}`);
  });
</script>

{#if loading}
  <p class="status">Učitavanje epizoda...</p>
{:else if error}
  <p class="status">
    Nije moguće učitati epizode. <a href={playlistUrl} target="_blank" rel="noopener noreferrer"
      >Pogledaj na Mixcloudu →</a
    >
  </p>
{:else if episodes.length === 0}
  <p class="status">Nema dostupnih epizoda.</p>
{:else}
  <ul class="episode-list">
    {#each episodes as ep (ep.key)}
      <li class="episode-row">
        <div class="episode-meta">
          <span class="episode-date">{formatDate(ep.created_time)}</span>
          <span class="episode-duration">{formatDuration(ep.audio_length)}</span>
        </div>
        <a class="episode-title" href={ep.url} target="_blank" rel="noopener noreferrer">
          {ep.name}
        </a>
        {#if ep.tags && ep.tags.length > 0}
          <div class="episode-tags">
            {#each ep.tags as tag (tag.url)}
              <Tag label={tag.name} />
            {/each}
          </div>
        {/if}
      </li>
    {/each}
  </ul>

  {#if nextUrl}
    <button
      class="load-more"
      onclick={() => fetchPage(nextUrl!,  true)}
      disabled={loadingMore}
    >
      {loadingMore ? 'Učitavanje...' : 'Učitaj još'}
    </button>
  {/if}
{/if}

<style>
  .status {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    padding: 1.5rem 0;
  }

  .status a {
    color: inherit;
    text-underline-offset: 3px;
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

  .episode-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.25rem;
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
