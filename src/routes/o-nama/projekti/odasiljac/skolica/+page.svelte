<script lang="ts">
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Školica — Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Emisija Školica adresira probleme djece i mladih u različitoj dobi. Mladi i mlađi, zanimljive priče o onima na kojima svijet ostaje."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">Školica</h1>
  </header>

  <div class="show-layout">
    <div class="show-left">
      <div class="show-cover">
        <img src="/images/projekti/odasiljac/skolica.png" alt="Emisija Školica" />
      </div>

      <div class="show-about">
        <p class="show-org">Udruga Ri Rock</p>
        <p class="show-desc">Mladi i mlađi, zanimljive priče o onima na kojima svijet ostaje.</p>
        <p class="show-desc">
          Adresirat će probleme djece i mladih u različitoj dobi — prve godine života, vrtić,
          predškolska dob, niži i viši razredi osnovne škole, srednja škola te fakultetsko doba. Osim
          tema povezanih sa samim školovanjem (bullying, poteškoće s učenjem), obradit će se i teme
          vezane uz obiteljski život i svakodnevne aktivnosti.
        </p>
        <p class="show-desc">
          Cilj emisije je osvijestiti javnost o problemima djece i mladih, njihovom pogledu na svijet
          i percepciji stvarnosti. Bitno je javno progovarati o mladima i njihovim pravima jer su oni
          budućnost.
        </p>
      </div>
    </div>

    <div class="show-right">
      <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/skolica/" />
    </div>
  </div>
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  .page-header {
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
    background: rgb(0 0 0 / 0.08);
  }

  .show-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .show-about {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .show-org {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .show-desc {
    font-size: var(--text-body);
    line-height: 1.7;
  }

  .show-right {
    min-width: 0;
  }

  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }
  }

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
