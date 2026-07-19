<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
</script>

<svelte:head>
  <title>Žiroskop — Radio Roža</title>
  <meta
    name="description"
    content="Razvoj civilno-javnog partnerstva u upravljanju prostorima kulture u Rijeci — Filodrammatica, OKC Palach i HKD na Sušaku."
  />
</svelte:head>

<ProjectLayout>
  {#snippet left()}
    <div class="project-cover" aria-hidden="true"></div>

    <div class="project-about">
      <h2 class="project-name">Žiroskop</h2>
      <dl class="project-meta">
        <dt>Korisnik</dt>
        <dd>Drugo more</dd>
        <dt>Partneri</dt>
        <dd>Savez udruga Molekula, Filmaktiv, Ri Rock, Prostor plus, Grad Rijeka</dd>
        <dt>Razdoblje</dt>
        <dd>29.10.2018. – 29.10.2020.</dd>
        <dt>Vrijednost</dt>
        <dd>2.416.102,66 kn (ESF + Ministarstvo kulture RH)</dd>
      </dl>
    </div>
  {/snippet}

  {#snippet right()}
    <div class="project-content">
      <p>
        Projekt Žiroskop nastao je iz potrebe rješavanja problema nestabilnosti korištenja
        prostornih resursa za sve izvaninstitucionalne aktere u kulturi, odnosno za svrhu ima razvoj
        civilno-javnog partnerstva u upravljanju prostorima Filodrammatice, Omladinskog kulturnog
        centra Palach i Hrvatskog kulturnog doma na Sušaku.
      </p>
      <p>
        Ovo partnerstvo fokus stavlja na uspostavu zajedničkog upravljanja ovim prostorima što
        uključuje razvoj modela upravljanja, uspostavljanje procedura uključivanja svih aktera u
        kulturi grada i povećanu participaciju građana u kulturnim aktivnostima, uključujući i
        njihovo programiranje. Projekt doprinosi razvoju kapaciteta organizacija civilnog društva i
        javne uprave za sudioničko upravljanje, jačanju socijalnog dijaloga kojemu je svrha
        kvalitetnije upravljanje i uključivanju građana u upravljanje javnim resursima.
      </p>

      <hr />

      <p>
        Projekt „Žiroskop – Civilno-javno partnerstvo u upravljanju prostorima kulture u Rijeci"
        financiran je u okviru poziva Kultura u centru – potpora javno-civilnog partnerstva u
        kulturi, UP.04.2.1.04.0078 – Operativni program „Učinkoviti ljudski potencijali" 2014. –
        2020. Projekt ukupne vrijednosti 2.416.102,66 kuna je financiran iz Europskog socijalnog
        fonda u iznosu od 2.053.687,26 kuna i sufinanciran od strane Ministarstva kulture RH u
        iznosu od 362.415,40 kuna.
      </p>
      <p>
        Posrednička tijela u provedbi projekta su Ministarstvo kulture RH i Nacionalna zaklada za
        razvoj civilnoga društva.
      </p>

      <hr />

      <p>
        Radio zajednice služi kao kanal komunikacije s građanima i kao mehanizam uključivanja
        građana u rasprave o civilno-javnom partnerstvu, programiranju, sudjelovanju u programima i
        refleksiji uspostavljenih procedura i implementacije projekta.
      </p>
      <p>
        Kroz realizaciju ovog segmenta projekta Žiroskop 15 zaposlenika i članova Udruga (članica
        Saveza udruga Molekula) sudjelovat će u aktivnostima jačanja stručnog i iskustvenog
        kapaciteta potrebne za uspostavu Radija Zajednice; 10 članova organizacija civilnog društva
        sudjelovat će u aktivnostima jačanja kapaciteta u području video produkcije; min. 4
        organizacije civilnog društva sudjelovat će u aktivnostima jačanja kapaciteta potrebnih za
        uspostavu multimedijalnog radija zajednice.
      </p>
      <p>
        Radio Roža postaje centralno mjesto za stvarno emitiranje, dokumentiranje i prijenos
        multimedijskih sadržaja te informiranje zajednice o programskim aktivnostima DKC-a i udruga
        članica.
      </p>

      <hr />

      <p class="contact">
        <strong>Kontakt:</strong> Davor Popdankovski · +385 98 9134437 ·
        <a href="mailto:radio.rozari@gmail.com">radio.rozari@gmail.com</a>
      </p>
    </div>
  {/snippet}
</ProjectLayout>

<style>
  .contact {
    font-size: var(--text-body);
    line-height: 1.7;
  }
</style>
