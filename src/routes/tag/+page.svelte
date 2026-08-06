<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { tagHref } from '$lib/data/tags';

  let { data } = $props();

  const total = $derived(data.groups.reduce((n, g) => n + g.tags.length, 0));
</script>

<Seo
  title="Tagovi — Radio Roža"
  description="Svi tagovi Radio Rože — žanrovi, teme i mjesta kojima su označene emisije, članci i snimke iz arhive."
/>

<main class="tag-index">
  <PageHeader title="tagovi" align="baseline">
    <p class="header-note">{data.filled} / {total} u upotrebi</p>
  </PageHeader>

  <p class="intro">
    Tagovi povezuju emisije, članke i arhivu. Istaknuti tagovi već imaju emisije ili članke — ostali
    mogu imati snimke u arhivi.
  </p>

  {#each data.groups as group (group.kind)}
    <section class="tag-group">
      <h2 class="section-title">{group.label}</h2>
      <ul class="tag-list">
        {#each group.tags as tag (tag.slug)}
          <li>
            <Tag
              label={tag.title}
              href={tagHref(tag.slug)}
              color={tag.hits > 0 ? 'black' : 'white'}
            />
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</main>

<style>
  .tag-index {
    padding: 1.5rem 1rem 4rem;
  }

  .header-note {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .intro {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    line-height: 1.6;
    max-width: 46em;
    padding-bottom: 0.5rem;
  }

  .tag-group {
    margin-top: 2rem;
  }

  .section-title {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Tablet */
  @media (min-width: 640px) {
    .tag-index {
      padding: 2rem 1.5rem 5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .tag-index {
      padding: 2.5rem 2rem 6rem;
    }
  }
</style>
