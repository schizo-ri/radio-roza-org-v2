<script lang="ts">
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>S.O.S. — Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Emisija S.O.S. obrađuje teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog, partnerskog i seksualnog nasilja."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">Emisija S.O.S.</h1>
  </header>

  <div class="show-layout">
    <div class="show-left">
      <div class="show-cover">
        <img src="/images/projekti/odasiljac/sos.png" alt="Emisija S.O.S." />
      </div>

      <div class="show-about">
        <p class="show-org">Udruga SOS Rijeka – Centar za nenasilje i ljudska prava</p>
        <p class="show-desc">Teme o kojima se rijetko priča, a o kojima je bitno govoriti.</p>
        <p class="show-desc">
          Obradit će se teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog,
          partnerskog i seksualnog nasilja, pojedini aspekti radnog prava vezani uz nasilje i
          uznemiravanje na radnom mjestu te važnost rada s mladima u svrhu prevencije i edukacije o
          nasilju.
        </p>
        <p class="show-desc">
          Omogućit će se da se žrtve nasilja zauzmu za sebe kroz progovaranje o svojim doživljajima
          te da „dobiju svoj glas". Gosti emisije bit će korisnici/e Udruge, stručnjaci/kinje i
          volonteri/ke koji s njima rade te istraživači/ce koje se bave temom socijalno
          marginaliziranih i ranjivih skupina.
        </p>
      </div>
    </div>

    <div class="show-right">
      <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/sos/" />
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
