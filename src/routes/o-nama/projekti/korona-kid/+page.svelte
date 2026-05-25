<script lang="ts">
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Korona Kid — Radio Roža</title>
  <meta
    name="description"
    content="Projekt Korona kid potiče djecu i mlade na građanski angažman i brigu za druge kroz usvajanje novih znanja i vještina građanskoga odgoja."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">projekti</h1>
  </header>

  <div class="project-layout">
    <div class="project-left">
      <div class="project-cover">
        <img src="/images/projekti/korona-kid/kk_cover.png" alt="Korona Kid" />
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
    </div>

    <div class="project-right">
      <div class="project-content">
        <p>
          Interaktivni, tehnološki napredni, ali istovremeno zabavni načini učenja, pokazali su svoju
          važnost u novoj stvarnosti koju nam je stvorila pandemija korone. Kako bismo učinili sve da
          naša djeca i mladi što lakše shvate, a onda se i prilagode novonastaloj situaciji, pokrenuli
          smo projekt <strong>Korona kid</strong>.
        </p>

        <p>
          <strong>Cilj projekta je</strong> poticanje djece i mladih na građanski angažman i brigu za
          druge kroz usvajanje novih znanja i vještina građanskoga odgoja, primjenu novih tehnologija i
          socijalizaciju. Vijeće mladih Benčić (Udruga RUKE) nositelj je i koordinator projekta, Gradska
          knjižnica Rijeka donosi znanja vezana za kreiranje i uređivanje sadržaja, te Udruga Ri Rock
          znanja vezana za snimanja i montažu zvuka.
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
          Tijekom <strong>osam online radionica, članke će audio digitalizirati desetoro djece i
            mladih pod mentorstvom stručnih suradnika.</strong> Audio digitalizacija provodit će se putem
          individualnih i grupnih online radionica na platformi Zoom. Vježbat ćemo govor, dikciju i
          izgovaranje tekstova pod mentorstvom riječke glumice – Petre Šarac.
        </p>

        <p>
          Audio snimke će montirati partner Udruga Ri Rock u konačan oblik podcasta/radijske emisije.
          Sudionici naših radionica će u svakoj emisiji osmisliti poziv na akciju kako bismo prikupili
          reakcije i kreativne radove slušatelja.
        </p>

        <p>
          Korona kid donosi 12 zanimljivih i raznolikih članaka u <strong>online magazinu
            Brickzine</strong> i četiri radijske emisije dostupne <strong>na mrežnim stranicama Radio
            Rože</strong>, ali i na stranicama Vijeća mladih Benčić te portalu
          <a href="https://brickzine.hr/" target="_blank" rel="noopener noreferrer">Brickzine.hr</a>.
        </p>
      </div>

      <section class="episodes">
        <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/korona-kid/" />
      </section>
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

  .project-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-cover {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: rgb(0 0 0 / 0.08);
  }

  .project-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .project-about {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .project-name {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.1;
  }

  .project-meta {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 1rem;
    font-size: var(--text-body);
    line-height: 1.5;
  }

  .project-meta dt {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-top: 0.15em;
    white-space: nowrap;
  }

  .project-meta dd {
    margin: 0;
  }

  .funding-logo {
    max-width: 160px;
    height: auto;
    display: block;
  }

  .project-right {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .project-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-content p {
    font-size: var(--text-body);
    line-height: 2;
  }

  .project-content hr {
    border: none;
    border-top: 2px solid var(--color-black);
  }

  .project-content a {
    color: inherit;
    text-underline-offset: 3px;
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

    .project-layout {
      grid-template-columns: 40fr 60fr;
      gap: 3rem;
      align-items: start;
    }
  }
</style>
