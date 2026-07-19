<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Korona Kid — Radio Roža</title>
  <meta
    name="description"
    content="Projekt Korona kid potiče djecu i mlade na građanski angažman i brigu za druge kroz usvajanje novih znanja i vještina građanskoga odgoja."
  />
</svelte:head>

<ProjectLayout>
  {#snippet left()}
    <div class="project-cover">
      <img src="/images/projekti/korona-kid/kk_cover.webp" alt="Korona Kid" />
    </div>

    <div class="project-about">
      <h2 class="project-name">Korona Kid</h2>
      <dl class="project-meta">
        <dt>Partneri</dt>
        <dd>Udruga RUKE (Vijeće mladih Benčić), Gradska knjižnica Rijeka, Udruga Ri Rock</dd>
        <dt>Financiranje</dt>
        <dd>€ 4.997,00 — Island, Lihtenštajn i Norveška (EGP i Norveški grantovi)</dd>
      </dl>
      <img
        src="/images/projekti/korona-kid/ACF-logo-s.png"
        alt="Active Citizens Fund"
        class="funding-logo"
      />
    </div>
  {/snippet}

  {#snippet right()}
    <div class="project-content">
      <p>
        Interaktivni, tehnološki napredni, ali istovremeno zabavni načini učenja, pokazali su svoju
        važnost u novoj stvarnosti koju nam je stvorila pandemija korone. Kako bismo učinili sve da
        naša djeca i mladi što lakše shvate, a onda se i prilagode novonastaloj situaciji, pokrenuli
        smo projekt <strong>Korona kid</strong>.
      </p>

      <p>
        <strong>Cilj projekta je</strong> poticanje djece i mladih na građanski angažman i brigu za druge
        kroz usvajanje novih znanja i vještina građanskoga odgoja, primjenu novih tehnologija i socijalizaciju.
        Vijeće mladih Benčić (Udruga RUKE) nositelj je i koordinator projekta, Gradska knjižnica Rijeka
        donosi znanja vezana za kreiranje i uređivanje sadržaja, te Udruga Ri Rock znanja vezana za snimanja
        i montažu zvuka.
      </p>

      <p>
        Naši stručni suradnici rade na člancima prilagođenima za djecu i mlade, kojima punimo portal
        <a href="https://brickzine.hr/" target="_blank" rel="noopener noreferrer">Brickzine.hr</a>.
        Edukativni i zanimljivi tekstovi pokrivaju područja kulture, umjetnosti, građanskog odgoja,
        psihologije, kulture „uradi sam"…
      </p>

      <hr />

      <p>
        Sve članke ćemo, kroz online radionice, pretvoriti u uzbudljive radijske emisije dostupne na
        portalu Brickzine.hr, stranicama Vijeća mladih Benčić te na Radiju Roži.
      </p>

      <p>
        Tijekom <strong
          >osam online radionica, članke će audio digitalizirati desetoro djece i mladih pod
          mentorstvom stručnih suradnika.</strong
        > Audio digitalizacija provodit će se putem individualnih i grupnih online radionica na platformi
        Zoom. Vježbat ćemo govor, dikciju i izgovaranje tekstova pod mentorstvom riječke glumice – Petre
        Šarac.
      </p>

      <p>
        Audio snimke će montirati partner Udruga Ri Rock u konačan oblik podcasta/radijske emisije.
        Sudionici naših radionica će u svakoj emisiji osmisliti poziv na akciju kako bismo prikupili
        reakcije i kreativne radove slušatelja.
      </p>

      <p>
        Korona kid donosi 12 zanimljivih i raznolikih članaka u <strong
          >online magazinu Brickzine</strong
        >
        i četiri radijske emisije dostupne <strong>na mrežnim stranicama Radio Rože</strong>, ali i
        na stranicama Vijeća mladih Benčić te portalu
        <a href="https://brickzine.hr/" target="_blank" rel="noopener noreferrer">Brickzine.hr</a>.
      </p>
    </div>

    <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/korona-kid/" />
  {/snippet}
</ProjectLayout>

<style>
  .funding-logo {
    max-width: 160px;
    height: auto;
    display: block;
  }
</style>
