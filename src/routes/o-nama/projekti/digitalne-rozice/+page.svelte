<script lang="ts">
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Digitalne Rožice — Radio Roža</title>
  <meta
    name="description"
    content="Digitalne rožice je europski projekt koji u fokus postavlja opću populaciju djece i mladih te djecu i mlade s teškoćama u razvoju."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">projekti</h1>
  </header>

  <div class="project-layout">
    <div class="project-left">
      <div class="project-cover">
        <img src="/images/projekti/digitalne-rozice/art-dr.png" alt="Digitalne Rožice" />
      </div>

      <div class="project-about">
        <h2 class="project-name">Digitalne Rožice</h2>
        <dl class="project-meta">
          <dt>Nositelj</dt>
          <dd>Udruga Ri Rock</dd>
          <dt>Partneri</dt>
          <dd>Udruga RUKE (Vijeće mladih Benčić), Muzikopter, Gradska knjižnica Rijeka</dd>
          <dt>Razdoblje</dt>
          <dd>1. travnja 2021. – 1. travnja 2022.</dd>
          <dt>Vrijednost</dt>
          <dd>458.380,15 HRK (85% ESF, 15% RH)</dd>
          <dt>Kontakt</dt>
          <dd>
            Katerina Jovanović —
            <a href="mailto:katerina.jovanoviic@gmail.com">katerina.jovanoviic@gmail.com</a>
          </dd>
        </dl>

        <div class="eu-notice">
          <p>Projekt je sufinancirala Europska unija iz Europskog socijalnog fonda.</p>
          <img src="/images/projekti/digitalne-rozice/logosi-dr.png" alt="EU logotipi" />
        </div>

        <a
          href="https://www.rirock.hr/digitalne-rozice/"
          target="_blank"
          rel="noopener noreferrer"
          class="brochure-link"
        >
          Online brošura →
        </a>
      </div>
    </div>

    <div class="project-right">
      <div class="project-content">
        <p>
          Digitalne rožice europski je projekt koji u fokus postavlja opću populaciju djece i mladih
          te djecu i mlade s teškoćama u razvoju. U suradnji s partnerskim udrugama (RUKE, Muzikopter)
          nastoji se utjecati na kulturnu i umjetničku edukaciju, razvoj samostalnosti, poboljšanje
          slike o sebi te poboljšanje socio-emocionalnog kontakta i osobni rast djece i mladih.
        </p>

        <p>
          Uslijed novonastale situacije povezane s pandemijom COVID-19 dogodile su se promjene koje su
          izazvale negativne utjecaje na djecu i mlade — segregacija iz kulturnog i društvenog života
          zajednice, nedostupnost interaktivnih online programa, gušenje kreativnih i socijalnih
          potencijala. Sve to potaknulo je intervenciju udruge Ri Rock i projektnih partnera da ponude
          načine za izražavanje osjećaja, želja i potreba kroz online kreativne aktivnosti.
        </p>

        <hr />

        <p>
          Aktivnosti projekta podrazumijevaju online radionice audio digitalizacije
          kulturno-umjetničkih sadržaja te montaže radijskih emisija za djecu i mlade; online
          radionice muzikoterapije za djecu i mlade s teškoćama u razvoju; te online emitiranje
          emisija s interaktivnim audiovizualnim sadržajima iz područja kulture i umjetnosti u
          suradnji s osnovnim školama.
        </p>

        <hr />

        <p>
          Sudjelovanjem u aktivnostima audiodigitalizacije, djeca i mladi promiču se u aktivne
          stvaratelje, kritičare i komentatore — potaknut će se razvoj vještina čitanja s
          razumijevanjem te razvoj samopouzdanja. Online radionice muzikoterapije potaknuti će
          kreativnost, izražavanje, razvoj komunikacijskih sposobnosti, motoričkih funkcija te
          kognitivnog i emocionalnog funkcioniranja djece i mladih s teškoćama u razvoju.
        </p>

        <p class="disclaimer">
          Sadržaj web stranice isključiva je odgovornost Udruge Ri Rock.
        </p>
      </div>

      <section class="episodes">
        <MixcloudPlaylist
          playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/digitalne-ro%C5%BEice/"
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

  .project-meta a {
    color: inherit;
    text-underline-offset: 3px;
  }

  .eu-notice {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .eu-notice p {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    line-height: 1.5;
  }

  .eu-notice img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .brochure-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid var(--color-black);
    padding-bottom: 2px;
  }

  .brochure-link:hover {
    opacity: 0.6;
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

  .disclaimer {
    font-family: var(--font-mono);
    font-size: var(--text-meta) !important;
    color: rgb(0 0 0 / 0.45);
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
