<script lang="ts">
  import ShowCard from '$lib/components/ShowCard.svelte';
  import Tag from '$lib/components/Tag.svelte';

  interface Episode {
    href: string;
    title: string;
    date: string;
    description?: string;
    tags?: string[];
  }

  // Mock show — replace with CMS fetch via +page.ts
  const show = {
    title: 'S.o.U.N.d',
    image: undefined as string | undefined,
    description:
      'Slap slana riha klaka krmt ima je nateknu ma krug natastea ma 20fta. Slap washing fota nastopl kate ta u nulkperma slazev glazbenu glazbe kruge modelas cirdon zastava tv 3%.Wading fota nasopl kate ut su ulpperma slazev clazben kruge modelas nulkperma razi dordba modelas. S mavromarin kota-vi mavromma slazev clazben kruge modelas.',
    schedule: 'Emisija dolazi svakog drugog petka.',
    tags: ['Hip hop', 'Rap', 'Elektronika'],
  };

  const episodes: Episode[] = [
    { href: '/emisije/sound/24', title: 'Hoću slano neštu statko #24', date: '02.03.2026.', description: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.', tags: ['Hip hop', 'Hardcore Hip Hop'] },
    { href: '/emisije/sound/23', title: 'Hoću slano neštu statko #24', date: '02.03.2026.', description: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.', tags: ['Hip hop', 'Hardcore Hip Hop'] },
    { href: '/emisije/sound/22', title: 'Hoću slano neštu statko #24', date: '02.03.2026.', description: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.', tags: ['Hip hop', 'Hardcore Hip Hop'] },
    { href: '/emisije/sound/21', title: 'Hoću slano neštu statko #24', date: '02.03.2026.', description: 'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.', tags: ['Hip hop', 'Hardcore Hip Hop'] },
  ];

  const related = [
    { href: '/emisije/da-crtez-24', title: "Da Crtez #24 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-25', title: "Da Crtez #25 - 2010's SLOVENIAN HIP HOP Something Nothing", date: '02.03.2026.', tags: ['Hip hop', 'Slovenian Hip Hop'] },
    { href: '/emisije/da-crtez-26', title: "Da Crtez #26 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-42', title: 'Da Crtez #2', date: '02.03.2026.', tags: ['Hip hop'] },
    { href: '/emisije/da-crtez-43', title: "Da Crtez #24 - 2010's HIP HOP", date: '02.03.2026.', tags: ['Hip hop'] },
  ];
</script>

<svelte:head>
  <title>{show.title} — Radio Roža</title>
</svelte:head>

<main class="show-page">
  <h1 class="show-title">{show.title}</h1>

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
        {#if show.schedule}
          <p class="show-schedule">{show.schedule}</p>
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

    <!-- Right: episode list -->
    <div class="show-right">
      <ul class="episode-list">
        {#each episodes as ep (ep.href)}
          <li class="episode-row">
            <div class="episode-header">
              <span class="episode-date">{ep.date}</span>
              <h2 class="episode-title">
                <a href={ep.href}>{ep.title}</a>
              </h2>
            </div>
            {#if ep.description}
              <p class="episode-desc">{ep.description}</p>
            {/if}
            {#if ep.tags && ep.tags.length > 0}
              <div class="episode-tags">
                {#each ep.tags as tag (tag)}
                  <Tag label={tag} />
                {/each}
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <section class="related">
    <h2 class="related-title">vezane emisije</h2>
    <div class="related-grid">
      {#each related as item (item.href)}
        <ShowCard {...item} />
      {/each}
    </div>
  </section>
</main>

<style>
  .show-page {
    padding: 1.5rem 1rem 4rem;
  }

  /* Show title */
  .show-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--color-black);
    padding-bottom: 0.75rem;
  }

  /* Two-column layout */
  .show-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  /* Left column */
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
    line-height: 1.6;
    color: rgb(0 0 0 / 0.75);
  }

  .show-schedule {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
  }

  .show-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  /* Right column: episode list */
  .show-right {
    min-width: 0;
  }

  .episode-list {
    list-style: none;
  }

  .episode-row {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgb(0 0 0 / 0.1);
  }

  .episode-row:first-child {
    border-top: 1px solid rgb(0 0 0 / 0.1);
  }

  .episode-header {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .episode-date {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
  }

  .episode-title {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
    line-height: 1.2;
  }

  .episode-title a {
    color: inherit;
    text-decoration: none;
  }

  .episode-title a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .episode-desc {
    font-size: var(--text-body);
    line-height: 1.5;
    color: rgb(0 0 0 / 0.55);
  }

  .episode-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  /* Related */
  .related {
    border-top: 2px solid var(--color-black);
    padding-top: 0.75rem;
  }

  .related-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 0;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
  }

  /* Tablet */
  @media (min-width: 640px) {
    .show-page {
      padding: 2rem 1.5rem 5rem;
    }

    .related-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .show-page {
      padding: 2.5rem 2rem 6rem;
    }

    .show-layout {
      grid-template-columns: 40fr 60fr;
      gap: 3rem;
      align-items: start;
    }

    .related-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
