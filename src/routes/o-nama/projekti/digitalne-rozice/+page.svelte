<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Digitalne Rožice — Radio Roža</title>
  <meta
    name="description"
    content="Digitalne rožice je europski projekt koji u fokus postavlja opću populaciju djece i mladih te djecu i mlade s teškoćama u razvoju."
  />
</svelte:head>

<ProjectLayout>
  {#snippet left()}
    <div class="project-cover">
      <img src="/images/projekti/digitalne-rozice/art-dr.webp" alt="Digitalne Rožice" />
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
  {/snippet}

  {#snippet right()}
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

      <p class="disclaimer">Sadržaj web stranice isključiva je odgovornost Udruge Ri Rock.</p>
    </div>

    <MixcloudPlaylist
      playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/digitalne-ro%C5%BEice/"
    />
  {/snippet}
</ProjectLayout>

<style>
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

  .disclaimer {
    font-family: var(--font-mono);
    font-size: var(--text-meta) !important;
    color: rgb(0 0 0 / 0.45);
  }
</style>
