<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Nevidljive — Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Emisija Nevidljive obrađuje teme iz domene rodne ravnopravnosti i reproduktivne pravde. Gdje priče žena postaju vidljive."
  />
</svelte:head>

<ProjectLayout title="Nevidljive">
  {#snippet left()}
    <div class="project-cover">
      <img src="/images/projekti/odasiljac/nevidljive.webp" alt="Emisija Nevidljive" />
    </div>

    <div class="project-about">
      <p class="project-org">PaRiter</p>
      <p class="project-desc">Gdje priče žena postaju vidljive.</p>
      <p class="project-desc">
        Obrađivat će teme iz domene rodne ravnopravnosti i reproduktivne pravde. Kroz razgovore sa
        ženama pokrit će se aktualne teme iz politike, kulture i ekonomije te omogućiti sudjelovanje
        ženama različitih profila, profesija i stupnja obrazovanja.
      </p>
      <p class="project-desc">
        Cilj emisije je informirati širu javnost o ženskim pravima te diskriminirajućim situacijama
        s kojima se ženske osobe susreću u javnom i privatnom životu te osnažiti ih za reagiranje na
        nepravdu i pokretanje promjena.
      </p>
    </div>
  {/snippet}

  {#snippet right()}
    <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/nevidljive/" />
  {/snippet}
</ProjectLayout>
