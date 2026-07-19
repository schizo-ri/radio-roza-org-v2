<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Školica — Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Emisija Školica adresira probleme djece i mladih u različitoj dobi. Mladi i mlađi, zanimljive priče o onima na kojima svijet ostaje."
  />
</svelte:head>

<ProjectLayout title="Školica">
  {#snippet left()}
    <div class="project-cover">
      <img src="/images/projekti/odasiljac/skolica.webp" alt="Emisija Školica" />
    </div>

    <div class="project-about">
      <p class="project-org">Udruga Ri Rock</p>
      <p class="project-desc">Mladi i mlađi, zanimljive priče o onima na kojima svijet ostaje.</p>
      <p class="project-desc">
        Adresirat će probleme djece i mladih u različitoj dobi — prve godine života, vrtić,
        predškolska dob, niži i viši razredi osnovne škole, srednja škola te fakultetsko doba. Osim
        tema povezanih sa samim školovanjem (bullying, poteškoće s učenjem), obradit će se i teme
        vezane uz obiteljski život i svakodnevne aktivnosti.
      </p>
      <p class="project-desc">
        Cilj emisije je osvijestiti javnost o problemima djece i mladih, njihovom pogledu na svijet
        i percepciji stvarnosti. Bitno je javno progovarati o mladima i njihovim pravima jer su oni
        budućnost.
      </p>
    </div>
  {/snippet}

  {#snippet right()}
    <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/skolica/" />
  {/snippet}
</ProjectLayout>
