<svelte:head>
  <title>Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Projekt Odašiljač okuplja novinare iz tri partnerske udruge. Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">projekti</h1>
  </header>

  <div class="project-layout">
    <div class="project-left">
      <div class="project-cover">
        <img src="/images/projekti/odasiljac/logo_red.png" alt="Odašiljač" />
      </div>

      <div class="project-about">
        <h2 class="project-name">Projekt Odašiljač</h2>
        <dl class="project-meta">
          <dt>Partneri</dt>
          <dd>Udruga Ri Rock, S.O.S. Rijeka, Pariter</dd>
          <dt>Razdoblje</dt>
          <dd>21. kolovoza 2020. – 21. kolovoza 2022.</dd>
          <dt>Vrijednost</dt>
          <dd>1.385.072,28 HRK (85% ESF, 15% RH)</dd>
          <dt>Kontakt</dt>
          <dd>Marina Jakšić, voditeljica projekta · +385 99 795 2969</dd>
        </dl>

        <div class="eu-links">
          <a href="https://strukturnifondovi.hr/" target="_blank" rel="noopener noreferrer">strukturnifondovi.hr</a>
          <a href="http://www.esf.hr/operativni-program/" target="_blank" rel="noopener noreferrer">esf.hr</a>
        </div>

        <div class="eu-notice">
          <p>Projekt je sufinancirala Europska unija iz Europskog socijalnog fonda.</p>
          <img
            src="/images/projekti/odasiljac/eu_logosi_odasiljac.png"
            alt="EU logotipi - Europski socijalni fond"
          />
        </div>
      </div>
    </div>

    <div class="project-right">
      <div class="project-content">
        <p>
          Projekt Odašiljač okuplja novinare iz tri partnerske udruge: <strong>Udruge Ri Rock, S.O.S.
            Rijeka i Pariter.</strong> Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati
          o ranjivim skupinama unutar tri radijske emisije emitirane na riječkom radiju zajednice –
          Radio Roži. Putem emisija javnost će biti informirana o trima temama: djeca i mladi; rodna
          ravnopravnost, diskriminacija i ženska prava; žrtve nasilja.
        </p>

        <hr />

        <p><strong>Ciljevi i očekivani rezultati projekta</strong></p>

        <p>Projektom Odašiljač stvorit će se resursni preduvjeti za:</p>
        <ul class="project-list">
          <li>
            Jačanje stručnih kapaciteta medijskih djelatnika putem usavršavanja i osposobljavanja za
            medijsko izvještavanje, vezano uz rodnu ravnopravnost, rodno uvjetovano nasilje, žrtve
            nasilja, komunikaciju s djecom i mladima, pristup mladima s teškoćama u učenju te pristup
            mladima koji imaju traumatična iskustva, ciljeve održivog razvoja, medijskog pristupa djeci
            i mladima romske nacionalne manjine
          </li>
          <li>Osiguranje stručnog, stalnog i stabilnog tima za razvoj programa</li>
          <li>Stvaranje preduvjeta za održivo djelovanje</li>
          <li>Povećanje vidljivosti</li>
          <li>Proizvodnju i objavu programskog sadržaja radija</li>
        </ul>

        <hr />

        <p>
          Tri emisije nastale u sklopu projekta Odašiljač možeš pronaći u navigaciji iznad —
          <strong>Nevidljive</strong>, <strong>S.O.S.</strong> i <strong>Školica</strong>.
        </p>
      </div>
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
    align-self: start;
  }

  .project-meta dd {
    margin: 0;
  }

  .eu-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .eu-links a {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
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

  .project-right {
    min-width: 0;
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
