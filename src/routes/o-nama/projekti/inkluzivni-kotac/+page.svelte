<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
</script>

<svelte:head>
  <title>Inkluzivni Kotač — Radio Roža</title>
  <meta
    name="description"
    content="Projekt Inkluzivni kotač jača građansku svijest i angažman u vezi romskih tema kroz inkluzivne prakse i poticanje pozitivnog diskursa o Romima."
  />
</svelte:head>

<ProjectLayout>
  {#snippet left()}
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
          <img
            src="/images/projekti/inkluzivni-kotac/klfm.png"
            alt="KLFM"
            loading="lazy"
            decoding="async"
          />
        </a>
        <a href="http://radio.rojc.eu/" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/projekti/inkluzivni-kotac/rojc.png"
            alt="Radio Rojc"
            loading="lazy"
            decoding="async"
          />
        </a>
        <a href="https://www.radiokastav.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/projekti/inkluzivni-kotac/kastav.png"
            alt="Radio Kastav"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </div>
  {/snippet}

  {#snippet right()}
    <div class="project-content">
      <p>
        <strong
          >Opći cilj projekta je jačanje građanske svijesti i angažmana u vezi romskih tema kroz
          inkluzivne prakse i poticanje pozitivnog diskursa o Romima.</strong
        >
      </p>

      <p>Specifični ciljevi su:</p>
      <ul class="project-list">
        <li>
          osnažiti mlade Rome uključivanjem u obrazovne, društvene, kulturno-umjetničke i poslovne
          procese
        </li>
        <li>
          poboljšati novinarske kompetencije u izvještavanju o Romima i ostalim ranjivim skupinama
          kroz razvijanje novih metoda rada
        </li>
        <li>
          međusektorska i unutarsektorska suradnja i sinergija u razvoju regionalnih politika
          usmjerenih na Rome
        </li>
      </ul>

      <hr />

      <p>Ciljevi će se postići kroz aktivnosti:</p>
      <ul class="project-list">
        <li>edukacije budućih medijskih djelatnika</li>
        <li>
          proizvodnje i objave medijskih sadržaja namijenjenih kvalitetnom izvještavanju o Romima
          (radijske emisije i časopis)
        </li>
        <li>
          organizacije kulturno-umjetničkih manifestacija posvećenih romskoj kulturi i umjetnosti
        </li>
        <li>
          organizacije okruglog stola za donošenje smjernica za međusektorsku suradnju pri pisanju
          Akcijskog plana za uključivanje Roma u Primorsko-goranskoj županiji
        </li>
        <li>
          radionice radijskog izvještavanja o ranjivim skupinama i proizvodnja medijskog sadržaja
        </li>
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

    <MixcloudPlaylist
      playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/inkluzivni-kota%C4%8D/"
    />
  {/snippet}
</ProjectLayout>

<style>
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
</style>
