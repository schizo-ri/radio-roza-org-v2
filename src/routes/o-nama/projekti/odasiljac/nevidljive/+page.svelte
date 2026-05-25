<script lang="ts">
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Nevidljive — Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Emisija Nevidljive obrađuje teme iz domene rodne ravnopravnosti i reproduktivne pravde. Gdje priče žena postaju vidljive."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">Nevidljive</h1>
  </header>

  <div class="show-layout">
    <div class="show-left">
      <div class="show-cover">
        <img src="/images/projekti/odasiljac/nevidljive.png" alt="Emisija Nevidljive" />
      </div>

      <div class="show-about">
        <p class="show-org">PaRiter</p>
        <p class="show-desc">Gdje priče žena postaju vidljive.</p>
        <p class="show-desc">
          Obrađivat će teme iz domene rodne ravnopravnosti i reproduktivne pravde. Kroz razgovore sa
          ženama pokrit će se aktualne teme iz politike, kulture i ekonomije te omogućiti sudjelovanje
          ženama različitih profila, profesija i stupnja obrazovanja.
        </p>
        <p class="show-desc">
          Cilj emisije je informirati širu javnost o ženskim pravima te diskriminirajućim situacijama
          s kojima se ženske osobe susreću u javnom i privatnom životu te osnažiti ih za reagiranje na
          nepravdu i pokretanje promjena.
        </p>
      </div>
    </div>

    <div class="show-right">
      <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/nevidljive/" />
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
