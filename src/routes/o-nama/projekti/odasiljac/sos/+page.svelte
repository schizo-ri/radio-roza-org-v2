<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>S.O.S. — Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Emisija S.O.S. obrađuje teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog, partnerskog i seksualnog nasilja."
  />
</svelte:head>

<ProjectLayout title="Emisija S.O.S.">
  {#snippet left()}
    <div class="project-cover">
      <img src="/images/projekti/odasiljac/sos.png" alt="Emisija S.O.S." />
    </div>

    <div class="project-about">
      <p class="project-org">Udruga SOS Rijeka – Centar za nenasilje i ljudska prava</p>
      <p class="project-desc">Teme o kojima se rijetko priča, a o kojima je bitno govoriti.</p>
      <p class="project-desc">
        Obradit će se teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog,
        partnerskog i seksualnog nasilja, pojedini aspekti radnog prava vezani uz nasilje i
        uznemiravanje na radnom mjestu te važnost rada s mladima u svrhu prevencije i edukacije o
        nasilju.
      </p>
      <p class="project-desc">
        Omogućit će se da se žrtve nasilja zauzmu za sebe kroz progovaranje o svojim doživljajima te
        da „dobiju svoj glas". Gosti emisije bit će korisnici/e Udruge, stručnjaci/kinje i
        volonteri/ke koji s njima rade te istraživači/ce koje se bave temom socijalno
        marginaliziranih i ranjivih skupina.
      </p>
    </div>
  {/snippet}

  {#snippet right()}
    <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/sos/" />
  {/snippet}
</ProjectLayout>
