<script lang="ts">
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';
  import MixcloudPlaylist from '$lib/components/MixcloudPlaylist.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import type { LightboxImage } from '$lib/components/Lightbox.svelte';

  const galleryImages: LightboxImage[] = [
    { src: '/images/projekti/17-bitnih/17-1.jpg', alt: '17 Bitnih - slika 1' },
    { src: '/images/projekti/17-bitnih/17-2.jpg', alt: '17 Bitnih - slika 2' },
    { src: '/images/projekti/17-bitnih/17-3.jpg', alt: '17 Bitnih - slika 3' },
    { src: '/images/projekti/17-bitnih/17-4.jpg', alt: '17 Bitnih - slika 4' },
    { src: '/images/projekti/17-bitnih/17-5.jpg', alt: '17 Bitnih - slika 5' },
    { src: '/images/projekti/17-bitnih/17-6.jpg', alt: '17 Bitnih - slika 6' },
    { src: '/images/projekti/17-bitnih/17-7.jpg', alt: '17 Bitnih - slika 7' },
    { src: '/images/projekti/17-bitnih/17-8.jpg', alt: '17 Bitnih - slika 8' },
    { src: '/images/projekti/17-bitnih/17-9.jpg', alt: '17 Bitnih - slika 9' },
    { src: '/images/projekti/17-bitnih/17-10.jpg', alt: '17 Bitnih - slika 10' },
  ];

  let lightboxIndex = $state(0);
  let lightboxOpen = $state(false);

  function openLightbox(index: number) {
    lightboxIndex = index;
    lightboxOpen = true;
  }

  const goals = [
    'Iskorjenjivanje siromaštva',
    'Iskorjenjivanje gladi',
    'Zdravlje i dobrobit',
    'Kvalitetno obrazovanje',
    'Rodna ravnopravnost',
    'Pitka voda i higijenski uvjeti',
    'Pristupačna i čista energija',
    'Dostojanstven rad i gospodarski rast',
    'Industrija, inovacije i infrastruktura',
    'Smanjiti nejednakosti',
    'Održivi gradovi i održive zajednice',
    'Odgovorna potrošnja i proizvodnja',
    'Odgovor na klimatske promjene',
    'Život ispod vode',
    'Život na kopnu',
    'Mir, pravda i snažne institucije',
    'Partnerstvo za ciljeve',
  ];
</script>

<svelte:head>
  <title>17 Bitnih — Radio Roža</title>
  <meta
    name="description"
    content="Radijska emisija 17 bitnih okuplja 17 voditelja koji kroz 17 epizoda razgovaraju s gostima o ciljevima održivog razvoja."
  />
</svelte:head>

<Lightbox
  images={galleryImages}
  open={lightboxOpen}
  startIndex={lightboxIndex}
  onclose={() => (lightboxOpen = false)}
/>

<ProjectLayout>
  {#snippet left()}
    <div class="project-cover">
      <img src="/images/projekti/17-bitnih/main17.webp" alt="17 Bitnih" />
    </div>

    <div class="project-about">
      <h2 class="project-name">17 Bitnih</h2>
      <dl class="project-meta">
        <dt>Nositelj</dt>
        <dd>Udruga Ri Rock</dd>
        <dt>Format</dt>
        <dd>17 epizoda, utorkom i petkom u podne</dd>
        <dt>Više info</dt>
        <dd>
          <a
            href="https://sustainabledevelopment.un.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            sustainabledevelopment.un.org
          </a>
        </dd>
      </dl>
      <img
        src="/images/projekti/17-bitnih/17_logos.png"
        alt="Partneri projekta 17 Bitnih"
        class="logos-img"
      />
    </div>
  {/snippet}

  {#snippet right()}
    <div class="project-content">
      <p>
        Radijska emisija "17 bitnih" okuplja 17 voditelja koji kroz 17 epizoda razgovaraju s gostima
        o ciljevima održivog razvoja. Emisija se emitira svakog utorka i petka točno u podne na
        Radio Roži.
      </p>

      <p>
        Nisu svi čuli za ciljeve održivog razvoja i zato se udruga Ri Rock prihvatila mikrofona,
        okupila 17 mladih voditelja i putem on-line streaminga odlučila ući u domove diljem
        Hrvatske.
      </p>

      <p>
        Prije pet godina <strong>Ujedinjeni narodi</strong> su usvojili i svijetu predstavili
        <strong>17 ciljeva održivog razvoja</strong> sa željom da se postignu do 2030. godine. Evo koji
        su to ciljevi:
      </p>

      <ol class="project-list">
        {#each goals as goal, i (i)}
          <li>{goal}</li>
        {/each}
      </ol>

      <hr />

      <blockquote>
        „Iako je prošlo već 5 godina od predstavljanja ciljeva, postoji veliki broj građana koji još
        uvijek nije čuo za ciljeve održivog razvoja. Šteta, jer kad bi svaka osoba s jednom malom
        gestom pridonijela ostvarenju ovih ciljeva, svijet bi do 2030. godine bio puno, puno ljepše
        mjesto za život. S radijskom emisijom '17 bitnih!' želimo povećati svijest o postojanju
        održivih ciljeva i potaknuti svakog slušatelja da se uključi u globalni pokret."
        <cite>— Davor Popdankovski, glavni urednik Radio Rože</cite>
      </blockquote>
    </div>

    <div class="gallery" aria-label="Galerija fotografija projekta 17 Bitnih">
      {#each galleryImages as img, i (img.src)}
        <button
          class="gallery-item"
          onclick={() => openLightbox(i)}
          aria-label="Otvori fotografiju: {img.alt}"
        >
          <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
        </button>
      {/each}
    </div>

    <MixcloudPlaylist playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/17-bitnih/" />
  {/snippet}
</ProjectLayout>

<style>
  .logos-img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  blockquote {
    font-size: var(--text-body);
    font-style: italic;
    line-height: 1.8;
    padding: 1rem 1.25rem;
    border-left: 2px solid var(--color-black);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  cite {
    font-style: normal;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
  }

  /* Gallery: border-grid pattern */
  .gallery {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-left: 2px solid var(--color-black);
    border-top: 2px solid var(--color-black);
  }

  .gallery-item {
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: zoom-in;
    width: 100%;
    overflow: hidden;
    border-right: 2px solid var(--color-black);
    border-bottom: 2px solid var(--color-black);
  }

  .gallery-item:focus-visible {
    outline: 3px solid var(--color-brand);
    outline-offset: -3px;
    z-index: 1;
    position: relative;
  }

  .gallery img {
    aspect-ratio: 4 / 3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.03);
  }

  @media (min-width: 640px) {
    .gallery {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
