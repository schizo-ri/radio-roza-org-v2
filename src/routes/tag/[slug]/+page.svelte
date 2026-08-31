<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import ArticleGrid from '$lib/components/ArticleGrid.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ShowCard from '$lib/components/ShowCard.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { normalizeTag } from '$lib/data/tags';
  import { loadArchive, type ArchiveHit as ArchiveEntry } from '$lib/api/mixcloud';

  interface ArchiveHit {
    href: string;
    title: string;
    date: string;
    image?: string;
    tags: string[];
    mixcloudKey: string;
  }

  let { data } = $props();

  let archive = $state<ArchiveHit[]>([]);
  let archiveLoading = $state(true);

  // Arhiva se filtrira klijentski po najviše 300 najnovijih snimki (Mixcloud
  // nema pretragu po tagu) — zato "best-effort": stariji zapisi mogu izostati.
  // Popis stiže s /api/arhiva: Mixcloud ne gzipa, pa bi izravno bilo ~1,3 MB
  // u tri serijska zahtjeva, na svakom otvaranju tag stranice.
  async function collectArchive(slug: string): Promise<ArchiveHit[]> {
    const archive: ArchiveEntry[] = await loadArchive();

    return archive
      .filter((c) => c.tags.some((t) => normalizeTag(t)?.slug === slug))
      .map((c) => ({
        href: c.url,
        title: c.title,
        date: c.date,
        image: c.image,
        tags: c.tags.slice(0, 3),
        mixcloudKey: c.key,
      }));
  }

  $effect(() => {
    const slug = data.slug;
    let cancelled = false;
    archive = [];
    archiveLoading = true;
    collectArchive(slug)
      .catch(() => [] as ArchiveHit[])
      .then((hits) => {
        if (!cancelled) {
          archive = hits;
          archiveLoading = false;
        }
      });
    return () => {
      cancelled = true;
    };
  });

  const isEmpty = $derived(
    data.articles.length === 0 && data.shows.length === 0 && !archiveLoading && archive.length === 0
  );
</script>

<Seo
  title="{data.title} — Radio Roža"
  description="Sav sadržaj Radio Rože označen tagom „{data.title}” — emisije, članci i snimke iz arhive."
/>

<main class="tag-page">
  <PageHeader title={data.title}>
    <p class="tag-note">tag</p>
  </PageHeader>

  {#if data.shows.length > 0}
    <section class="tag-section">
      <h2 class="section-title">emisije</h2>
      <ArticleGrid items={data.shows} cardMinEm={16}>
        {#snippet card(show)}
          <ShowCard {...show} />
        {/snippet}
      </ArticleGrid>
    </section>
  {/if}

  {#if data.articles.length > 0}
    <section class="tag-section">
      <h2 class="section-title">čitaj radio</h2>
      <ArticleGrid items={data.articles}>
        {#snippet card(article)}
          <ArticleCard {...article} />
        {/snippet}
      </ArticleGrid>
    </section>
  {/if}

  {#if archiveLoading}
    <p class="status" aria-live="polite">tražim u arhivi…</p>
  {:else if archive.length > 0}
    <section class="tag-section">
      <h2 class="section-title">arhiva</h2>
      <ArticleGrid items={archive} cardMinEm={16}>
        {#snippet card(hit)}
          <ShowCard {...hit} keepUnknownTags />
        {/snippet}
      </ArticleGrid>
    </section>
  {/if}

  {#if isEmpty}
    <p class="status">Nema sadržaja označenog ovim tagom.</p>
  {/if}
</main>

<style>
  .tag-page {
    padding: 1.5rem 1rem 4rem;
  }

  .tag-note {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tag-section {
    margin-top: 2rem;
  }

  .section-title {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .status {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    padding: 1.5rem 0;
  }

  /* Tablet */
  @media (min-width: 640px) {
    .tag-page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .tag-page {
      padding: 2.5rem 2rem 6rem;
    }
  }
</style>
