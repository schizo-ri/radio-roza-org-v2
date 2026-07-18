<script lang="ts" module>
  interface ArchiveShow {
    href: string;
    title: string;
    date: string;
    image?: string;
    tags: string[];
    mixcloudKey: string;
  }

  interface MixcloudCloudcast {
    key: string;
    url: string;
    name: string;
    created_time: string;
    pictures: { extra_large?: string; '640wx640h'?: string; large?: string };
    tags: Array<{ name: string }>;
  }

  // Survives client-side navigations — returning to the archive keeps all the
  // pages the visitor already loaded instead of resetting to the first one.
  let cachedShows: ArchiveShow[] | null = null;
  let cachedNextUrl: string | null = null;
</script>

<script lang="ts">
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import ShowCard from '$lib/components/ShowCard.svelte';
  import ShowCardSkeleton from '$lib/components/ShowCardSkeleton.svelte';
  import Seo from '$lib/components/Seo.svelte';

  const MIXCLOUD_PROFILE_URL = 'https://www.mixcloud.com/RadioRoza/';
  const FIRST_PAGE_URL = 'https://api.mixcloud.com/RadioRoza/cloudcasts/?limit=24&metadata=1';

  const SKELETON_COUNT = 12;
  const skeletonItems = Array.from({ length: SKELETON_COUNT }, (_, i) => ({
    href: `__skeleton__${i}`,
  }));

  let shows = $state<ArchiveShow[]>(cachedShows ?? []);
  let loading = $state(cachedShows === null);
  let loadingMore = $state(false);
  let error = $state(false);
  let nextUrl = $state<string | null>(cachedNextUrl);

  function toShow(c: MixcloudCloudcast): ArchiveShow {
    return {
      href: c.url,
      title: c.name,
      date: new Date(c.created_time).toLocaleDateString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      image: c.pictures['640wx640h'] ?? c.pictures.extra_large ?? c.pictures.large,
      tags: c.tags.slice(0, 3).map((t) => t.name),
      mixcloudKey: c.key,
    };
  }

  async function fetchPage(url: string, append: boolean) {
    if (append) {
      loadingMore = true;
    } else {
      loading = true;
    }
    error = false;

    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(String(r.status));
      const json: { data: MixcloudCloudcast[]; paging?: { next?: string } } = await r.json();

      // Offset paging can repeat an item if something was uploaded between two
      // pages — drop already-shown keys before appending.
      const seen = new Set(shows.map((s) => s.mixcloudKey));
      const batch = json.data.map(toShow).filter((s) => !append || !seen.has(s.mixcloudKey));

      shows = append ? [...shows, ...batch] : batch;
      nextUrl = json.paging?.next ?? null;
      cachedShows = shows;
      cachedNextUrl = nextUrl;
    } catch {
      error = true;
    } finally {
      if (append) {
        loadingMore = false;
      } else {
        loading = false;
      }
    }
  }

  function loadMore() {
    if (nextUrl) fetchPage(nextUrl, true);
  }

  $effect(() => {
    if (cachedShows === null) fetchPage(FIRST_PAGE_URL, false);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://api.mixcloud.com" />
  <link rel="preconnect" href="https://thumbnailer.mixcloud.com" />
</svelte:head>

<Seo
  title="Arhiva — Radio Roža"
  description="Arhiva snimki emisija Radio Rože — slušaj sve što si propustio u eteru."
/>

<main class="arhiva-page">
  <div class="page-header">
    <h1 class="page-title">arhiva</h1>
    <p class="header-note">
      snimke emisija s našeg
      <a href={MIXCLOUD_PROFILE_URL} target="_blank" rel="noopener noreferrer">Mixclouda →</a>
    </p>
  </div>

  {#if error && shows.length === 0}
    <p class="status">
      Nije moguće učitati arhivu.
      <a href={MIXCLOUD_PROFILE_URL} target="_blank" rel="noopener noreferrer"
        >Pogledaj na Mixcloudu →</a
      >
    </p>
  {:else}
    <ArticleGrid items={loading ? skeletonItems : shows}>
      {#snippet card(item)}
        {#if loading}
          <ShowCardSkeleton />
        {:else}
          <ShowCard {...item as ArchiveShow} />
        {/if}
      {/snippet}
    </ArticleGrid>

    {#if error}
      <p class="status">Nije moguće učitati još snimki. Pokušaj ponovno.</p>
    {/if}

    {#if nextUrl && !loading}
      <button class="load-more" onclick={loadMore} disabled={loadingMore}>
        {loadingMore ? 'Učitavanje...' : 'Učitaj još'}
      </button>
    {/if}
  {/if}
</main>

<style>
  .arhiva-page {
    padding: 1.5rem 1rem 4rem;
  }

  .page-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    padding-bottom: 1rem;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  .header-note {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .header-note a {
    color: inherit;
    text-underline-offset: 3px;
  }

  .status {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    padding: 1.5rem 0;
  }

  .status a {
    color: inherit;
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
    margin-top: 2rem;
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

  /* Tablet */
  @media (min-width: 640px) {
    .arhiva-page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .arhiva-page {
      padding: 2.5rem 2rem 6rem;
    }
  }
</style>
