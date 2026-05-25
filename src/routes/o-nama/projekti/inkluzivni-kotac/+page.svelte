<script lang="ts">
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Inkluzivni Kotač — Radio Roža</title>
  <meta
    name="description"
    content="Projekt Inkluzivni kotač jača građansku svijest i angažman u vezi romskih tema kroz inkluzivne prakse i poticanje pozitivnog diskursa o Romima."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">projekti</h1>
  </header>

  <div class="project-layout">
    <div class="project-left">
      <div class="project-cover">
        <img src="/images/projekti/inkluzivni-kotac/kotac2.jpg" alt="Inkluzivni Kotač" />
      </div>

      <div class="project-about">
        <h2 class="project-name">Inkluzivni Kotač</h2>
        <dl class="project-meta">
          <dt>Nositelj</dt>
          <dd>Udruga Ri Rock</dd>
          <dt>Partner</dt>
          <dd>
            <img
              src="/images/projekti/inkluzivni-kotac/romhr_logo.png"
              alt="ROMHR"
              class="partner-logo"
            />
          </dd>
          <dt>Kontakt</dt>
          <dd>
            Martina Blečić —
            <a href="mailto:inkluzivnikotac@gmail.com">inkluzivnikotac@gmail.com</a>
          </dd>
          <dt>Koordinator</dt>
          <dd>
            Siniša - Senad Musić —
            <a href="mailto:smusic@romhr.hr">smusic@romhr.hr</a>
          </dd>
        </dl>

        <p class="radio-label">Emisija dostupna i na:</p>
        <div class="radio-stations">
          <a href="https://klfm.org/" target="_blank" rel="noopener noreferrer">
            <img src="/images/projekti/inkluzivni-kotac/klfm.png" alt="KLFM" />
          </a>
          <a href="http://radio.rojc.eu/" target="_blank" rel="noopener noreferrer">
            <img src="/images/projekti/inkluzivni-kotac/rojc.png" alt="Radio Rojc" />
          </a>
          <a href="https://www.radiokastav.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/projekti/inkluzivni-kotac/kastav.png" alt="Radio Kastav" />
          </a>
        </div>
      </div>
    </div>

    <div class="project-right">
      <div class="project-content">
        <p>
          <strong>Opći cilj projekta je jačanje građanske svijesti i angažmana u vezi romskih tema kroz
            inkluzivne prakse i poticanje pozitivnog diskursa o Romima.</strong>
        </p>

        <p>Specifični ciljevi su:</p>
        <ul class="project-list">
          <li>osnažiti mlade Rome uključivanjem u obrazovne, društvene, kulturno-umjetničke i poslovne procese</li>
          <li>poboljšati novinarske kompetencije u izvještavanju o Romima i ostalim ranjivim skupinama kroz razvijanje novih metoda rada</li>
          <li>međusektorska i unutarsektorska suradnja i sinergija u razvoju regionalnih politika usmjerenih na Rome</li>
        </ul>

        <hr />

        <p>Ciljevi će se postići kroz aktivnosti:</p>
        <ul class="project-list">
          <li>edukacije budućih medijskih djelatnika</li>
          <li>proizvodnje i objave medijskih sadržaja namijenjenih kvalitetnom izvještavanju o Romima (radijske emisije i časopis)</li>
          <li>organizacije kulturno-umjetničkih manifestacija posvećenih romskoj kulturi i umjetnosti</li>
          <li>organizacije okruglog stola za donošenje smjernica za međusektorsku suradnju pri pisanju Akcijskog plana za uključivanje Roma u Primorsko-goranskoj županiji</li>
          <li>radionice radijskog izvještavanja o ranjivim skupinama i proizvodnja medijskog sadržaja</li>
          <li>radionice izrade Akcijskog plana za uključivanje Roma u PGŽ</li>
        </ul>

        <hr />

        <p>Ciljane skupine projekta su:</p>
        <ul class="project-list">
          <li>mladi Romi/Romkinje – novinari/novinarke</li>
          <li>osobe romske i neromske nacionalnosti uključene u radionice</li>
          <li>predstavnici lokalne i regionalne samouprave PGŽ</li>
          <li>organizacije civilnog društva</li>
          <li>profitne ili neprofitne radijske postaje u RH</li>
        </ul>
      </div>

      <section class="episodes">
        <MixcloudPlaylist
          playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/inkluzivni-kota%C4%8D/"
        />
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
    align-items: center;
  }

  .project-meta dt {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    align-self: start;
    padding-top: 0.15em;
  }

  .project-meta dd {
    margin: 0;
  }

  .project-meta a {
    color: inherit;
    text-underline-offset: 3px;
  }

  .partner-logo {
    max-width: 120px;
    height: auto;
    display: block;
  }

  .radio-label {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .radio-stations {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .radio-stations img {
    height: 48px;
    width: auto;
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

  .project-list {
    font-size: var(--text-body);
    line-height: 2;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
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
