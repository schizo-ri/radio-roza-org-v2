<script lang="ts">
  import { browser } from '$app/environment';
  import Tag from '$lib/components/Tag.svelte';
  import { playerState } from '$lib/stores/player.svelte';
  import { tagChipsKeepUnknown } from '$lib/data/tags';

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

  let order = $state<'asc' | 'desc'>('asc');

  // Ascending (playlist order) — Mixcloud's native pagination
  let episodes = $state<MixcloudEpisode[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let nextUrl = $state<string | null>(null);

  // Descending — reverse pagination via offset from the end of the playlist.
  // descOffset is the playlist offset of the oldest fetched episode; 0 means
  // the whole playlist is loaded, null means descending was never fetched.
  let descEpisodes = $state<MixcloudEpisode[]>([]);
  let descLoading = $state(false);
  let descError = $state<string | null>(null);
  let descOffset = $state<number | null>(null);

  let loadingMore = $state(false);

  const apiPath = $derived.by(() => {
    if (!playlistUrl) return null;
    try {
      return new URL(playlistUrl).pathname;
    } catch {
      return playlistUrl.startsWith('/') ? playlistUrl : `/${playlistUrl}`;
    }
  });

  const shownEpisodes = $derived(order === 'asc' ? episodes : descEpisodes);
  const shownError = $derived(order === 'asc' ? error : descError);
  const hasMore = $derived(
    order === 'asc' ? nextUrl !== null : descOffset !== null && descOffset > 0
  );

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

  async function fetchRange(offset: number, limit: number): Promise<MixcloudEpisode[]> {
    const r = await fetch(
      `https://api.mixcloud.com${apiPath}cloudcasts/?offset=${offset}&limit=${limit}`
    );
    if (!r.ok) throw new Error(`${r.status}`);
    const data = await r.json();
    return data.data ?? [];
  }

  // The playlist detail endpoint exposes cloudcast_count, so descending order
  // only needs the last page — no need to walk the whole playlist.
  async function loadDescInitial() {
    descLoading = true;
    descError = null;

    try {
      const r = await fetch(`https://api.mixcloud.com${apiPath}`);
      if (!r.ok) throw new Error(`${r.status}`);
      const total: number = (await r.json()).cloudcast_count ?? 0;
      const offset = Math.max(0, total - PAGE_SIZE);
      const batch = await fetchRange(offset, PAGE_SIZE);
      descEpisodes = batch.reverse();
      descOffset = offset;
    } catch (e) {
      descError = (e as Error).message;
    } finally {
      descLoading = false;
    }
  }

  async function loadDescMore() {
    if (!descOffset) return;
    loadingMore = true;
    descError = null;

    try {
      const newOffset = Math.max(0, descOffset - PAGE_SIZE);
      const batch = await fetchRange(newOffset, descOffset - newOffset);
      descEpisodes = [...descEpisodes, ...batch.reverse()];
      descOffset = newOffset;
    } catch (e) {
      descError = (e as Error).message;
    } finally {
      loadingMore = false;
    }
  }

  function toggleOrder() {
    order = order === 'asc' ? 'desc' : 'asc';

    if (order === 'desc' && descOffset === null && !descLoading) {
      if (!nextUrl && episodes.length > 0) {
        // Ascending list is complete — flip in the UI, no network needed
        descEpisodes = [...episodes].reverse();
        descOffset = 0;
      } else {
        loadDescInitial();
      }
    } else if (order === 'asc' && descOffset === 0 && nextUrl) {
      // Descending list is complete but ascending isn't — reuse it
      episodes = [...descEpisodes].reverse();
      nextUrl = null;
    }
  }

  function loadMore() {
    if (order === 'asc') {
      if (nextUrl) fetchPage(nextUrl, true);
    } else {
      loadDescMore();
    }
  }

  $effect(() => {
    if (!browser || !apiPath) {
      loading = false;
      return;
    }

    order = 'asc';
    episodes = [];
    nextUrl = null;
    descEpisodes = [];
    descOffset = null;
    descError = null;
    fetchPage(`https://api.mixcloud.com${apiPath}cloudcasts/?limit=${PAGE_SIZE}`);
  });
</script>

{#if loading}
  <p class="status">Učitavanje epizoda...</p>
{:else if order === 'asc' && error}
  <p class="status">
    Nije moguće učitati epizode. <a href={playlistUrl} target="_blank" rel="noopener noreferrer"
      >Pogledaj na Mixcloudu →</a
    >
  </p>
{:else if episodes.length === 0 && order === 'asc'}
  <p class="status">Nema dostupnih epizoda.</p>
{:else}
  <div class="list-toolbar">
    <button class="sort-toggle" onclick={toggleOrder} disabled={descLoading}>
      {order === 'asc' ? '↓ Najnovije prve' : '↑ Najstarije prve'}
    </button>
  </div>

  {#if order === 'desc' && descLoading}
    <p class="status">Učitavanje najnovijih epizoda...</p>
  {:else if order === 'desc' && shownError}
    <p class="status">
      Nije moguće učitati epizode. <a href={playlistUrl} target="_blank" rel="noopener noreferrer"
        >Pogledaj na Mixcloudu →</a
      >
    </p>
  {:else}
    <ul class="episode-list">
      {#each shownEpisodes as ep (ep.key)}
        <li class="episode-row">
          <div class="episode-meta">
            <span class="episode-date">{formatDate(ep.created_time)}</span>
            <span class="episode-duration">{formatDuration(ep.audio_length)}</span>
          </div>
          <button
            type="button"
            class="episode-title"
            onclick={() => playerState.setMixcloud({ key: ep.key, title: ep.name, url: ep.url })}
            aria-label="Slušaj: {ep.name}"
          >
            <svg
              class="episode-play"
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="2,1 13,7 2,13" />
            </svg>
            {ep.name}
          </button>
          {#if ep.tags && ep.tags.length > 0}
            {@const epChips = tagChipsKeepUnknown(ep.tags.map((t) => t.name))}
            <div class="episode-tags">
              {#each epChips as tag (tag.label)}
                <Tag label={tag.label} href={tag.href} />
              {/each}
            </div>
          {/if}
        </li>
      {/each}
    </ul>

    {#if hasMore}
      <button class="load-more" onclick={loadMore} disabled={loadingMore}>
        {loadingMore ? 'Učitavanje...' : 'Učitaj još'}
      </button>
    {/if}
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

  .list-toolbar {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 0.5rem;
  }

  .sort-toggle {
    all: unset;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    padding: 0.25rem 0;
  }

  .sort-toggle:hover:not(:disabled) {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .sort-toggle:disabled {
    opacity: 0.45;
    cursor: default;
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
    all: unset;
    cursor: pointer;
    align-self: flex-start;
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
    line-height: 1.2;
    color: inherit;
  }

  .episode-title:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .episode-title:focus-visible {
    outline: 2px solid var(--color-black);
    outline-offset: 2px;
  }

  .episode-play {
    display: inline-block;
    margin-right: 0.25rem;
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
