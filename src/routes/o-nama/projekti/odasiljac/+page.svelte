<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
</script>

<svelte:head>
  <title>Projekt Odašiljač — Radio Roža</title>
  <meta
    name="description"
    content="Projekt Odašiljač okuplja novinare iz tri partnerske udruge. Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama."
  />
</svelte:head>

<ProjectLayout>
  {#snippet left()}
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
        <a href="https://strukturnifondovi.hr/" target="_blank" rel="noopener noreferrer"
          >strukturnifondovi.hr</a
        >
        <a href="http://www.esf.hr/operativni-program/" target="_blank" rel="noopener noreferrer"
          >esf.hr</a
        >
      </div>

      <div class="eu-notice">
        <p>Projekt je sufinancirala Europska unija iz Europskog socijalnog fonda.</p>
        <img
          src="/images/projekti/odasiljac/eu_logosi_odasiljac.webp"
          alt="EU logotipi - Europski socijalni fond"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  {/snippet}

  {#snippet right()}
    <div class="project-content">
      <p>
        Projekt Odašiljač okuplja novinare iz tri partnerske udruge: <strong
          >Udruge Ri Rock, S.O.S. Rijeka i Pariter.</strong
        > Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama unutar
        tri radijske emisije emitirane na riječkom radiju zajednice – Radio Roži. Putem emisija javnost
        će biti informirana o trima temama: djeca i mladi; rodna ravnopravnost, diskriminacija i ženska
        prava; žrtve nasilja.
      </p>

      <hr />

      <p><strong>Ciljevi i očekivani rezultati projekta</strong></p>

      <p>Projektom Odašiljač stvorit će se resursni preduvjeti za:</p>
      <ul class="project-list">
        <li>
          Jačanje stručnih kapaciteta medijskih djelatnika putem usavršavanja i osposobljavanja za
          medijsko izvještavanje, vezano uz rodnu ravnopravnost, rodno uvjetovano nasilje, žrtve
          nasilja, komunikaciju s djecom i mladima, pristup mladima s teškoćama u učenju te pristup
          mladima koji imaju traumatična iskustva, ciljeve održivog razvoja, medijskog pristupa
          djeci i mladima romske nacionalne manjine
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
  {/snippet}
</ProjectLayout>

<style>
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
</style>
