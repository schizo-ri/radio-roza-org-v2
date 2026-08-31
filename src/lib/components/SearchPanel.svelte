<script lang="ts" module>
  // Arhiva stiže s /api/arhiva — server je već sasjekao na ova polja.
  import { loadArchive, type ArchiveHit } from '$lib/api/mixcloud';

  interface PostHit {
    href: string;
    title: string;
    excerpt: string;
    date: string;
    tags?: string[];
  }

  // Članci i arhiva dohvaćaju se tek kad posjetitelj počne tipkati,
  // i samo jednom po sesiji.
  let cachedPosts: PostHit[] | null = null;
  let cachedArchive: ArchiveHit[] | null = null;
</script>

<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { shows } from '$lib/data/shows';
  import { playerState } from '$lib/stores/player.svelte';

  interface Props {
    open: boolean;
    onclose: () => void;
  }

  let { open, onclose }: Props = $props();

  let query = $state('');
  let loadingRemote = $state(false);
  let posts = $state<PostHit[]>(cachedPosts ?? []);
  let archive = $state<ArchiveHit[]>(cachedArchive ?? []);
  let inputEl = $state<HTMLInputElement>();

  afterNavigate(() => onclose());

  $effect(() => {
    if (open) inputEl?.focus();
  });

  // NFD ne rastavlja đ (nije kombinirajući znak), pa ide posebno
  function normalize(s: string): string {
    return s
      .toLocaleLowerCase('hr')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  }

  const q = $derived(normalize(query.trim()));
  const active = $derived(q.length >= 2);

  const showHits = $derived(
    active
      ? shows
          .filter((s) => normalize([s.title, ...s.tags, ...s.authors].join(' ')).includes(q))
          .slice(0, 6)
      : []
  );

  const postHits = $derived(
    active
      ? posts
          .filter((p) => normalize([p.title, p.excerpt, ...(p.tags ?? [])].join(' ')).includes(q))
          .slice(0, 6)
      : []
  );

  const archiveHits = $derived(
    active
      ? archive.filter((a) => normalize([a.title, ...a.tags].join(' ')).includes(q)).slice(0, 6)
      : []
  );

  const noHits = $derived(
    active &&
      !loadingRemote &&
      showHits.length === 0 &&
      postHits.length === 0 &&
      archiveHits.length === 0
  );

  async function loadRemote() {
    if (loadingRemote || (cachedPosts !== null && cachedArchive !== null)) return;
    loadingRemote = true;
    const [postsRes, archiveRes] = await Promise.allSettled([
      cachedPosts !== null
        ? Promise.resolve(cachedPosts)
        : fetch('/api/pretraga')
            .then((r) => (r.ok ? r.json() : { posts: [] }))
            .then((j: { posts: PostHit[] }) => j.posts),
      cachedArchive !== null ? Promise.resolve(cachedArchive) : loadArchive(),
    ]);
    if (postsRes.status === 'fulfilled') {
      cachedPosts = postsRes.value;
      posts = postsRes.value;
    }
    if (archiveRes.status === 'fulfilled') {
      cachedArchive = archiveRes.value;
      archive = archiveRes.value;
    }
    loadingRemote = false;
  }

  $effect(() => {
    if (open && active) loadRemote();
  });

  function playArchive(hit: ArchiveHit) {
    playerState.setMixcloud({ key: hit.key, title: hit.title, image: hit.image, url: hit.url });
    onclose();
  }
</script>

{#if open}
  <div
    class="backdrop"
    role="presentation"
    onclick={onclose}
    transition:fade={{ duration: 200 }}
  ></div>

  <div class="panel" role="search" transition:fly={{ y: -8, duration: 200 }}>
    <div class="panel-inner">
      <input
        bind:this={inputEl}
        bind:value={query}
        type="search"
        placeholder="pretraži emisije, članke, arhivu…"
        aria-label="Pretraži stranicu"
        autocomplete="off"
        spellcheck="false"
      />

      {#if active}
        <div class="results">
          {#if showHits.length > 0}
            <p class="group-label">emisije</p>
            <ul>
              {#each showHits as hit (hit.href)}
                <li>
                  <a href={hit.href}>
                    <span class="hit-title">{hit.title}</span>
                    {#if hit.tags.length > 0}
                      <span class="hit-meta">{hit.tags.join(' · ')}</span>
                    {/if}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}

          {#if postHits.length > 0}
            <p class="group-label">čitaj radio</p>
            <ul>
              {#each postHits as hit (hit.href)}
                <li>
                  <a href={hit.href}>
                    <span class="hit-title">{hit.title}</span>
                    {#if hit.date}
                      <span class="hit-meta">{hit.date}</span>
                    {/if}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}

          {#if archiveHits.length > 0}
            <p class="group-label">arhiva</p>
            <ul>
              {#each archiveHits as hit (hit.key)}
                <li>
                  <button class="hit-play" onclick={() => playArchive(hit)}>
                    <span class="hit-title">▶ {hit.title}</span>
                    <span class="hit-meta">{hit.date}</span>
                  </button>
                </li>
              {/each}
            </ul>
          {/if}

          {#if loadingRemote}
            <p class="status" aria-live="polite">tražim…</p>
          {:else if noHits}
            <p class="status" aria-live="polite">nema rezultata za “{query}”</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
    background: rgb(0 0 0 / 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .panel {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    z-index: 301;
    background: var(--color-brand);
    max-height: calc(100dvh - 70px);
    overflow-y: auto;
  }

  .panel-inner {
    max-width: 720px;
    padding: 1rem 1rem 1.5rem;
  }

  input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid var(--color-black);
    padding: 0.4rem 0;
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    color: var(--color-white);
    caret-color: var(--color-white);
    border-radius: 0;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: rgb(255 255 255 / 0.55);
  }

  input::-webkit-search-cancel-button {
    display: none;
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
  }

  .group-label {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-black);
    margin-top: 0.5rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  a,
  .hit-play {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.3rem 0;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
  }

  .hit-title {
    font-family: var(--font-display);
    font-size: var(--text-body);
    font-weight: 400;
    color: var(--color-white);
    min-width: 0;
  }

  a:hover .hit-title,
  .hit-play:hover .hit-title {
    color: var(--color-black);
  }

  .hit-meta {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(255 255 255 / 0.7);
    white-space: nowrap;
  }

  .status {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(255 255 255 / 0.8);
    padding-top: 0.5rem;
  }

  @media (min-width: 640px) {
    .panel-inner {
      padding: 1.25rem 1.5rem 1.75rem;
    }
  }

  @media (min-width: 1024px) {
    .panel-inner {
      padding: 1.25rem 1.25rem 1.75rem;
    }
  }
</style>
