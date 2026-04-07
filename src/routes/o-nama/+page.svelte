<script lang="ts">
  import Lightbox from '$lib/components/Lightbox.svelte';
  import type { LightboxImage } from '$lib/components/Lightbox.svelte';

  // Mock gallery images — replace with CMS
  const gallery1: LightboxImage[] = Array.from({ length: 8 }, (_, i) => ({
    src: '',
    alt: `Fotografija studija ${i + 1}`,
  }));

  const gallery2: LightboxImage[] = Array.from({ length: 8 }, (_, i) => ({
    src: '',
    alt: `Fotografija studija ${i + 9}`,
  }));

  let lightboxImages: LightboxImage[] = $state([]);
  let lightboxIndex = $state(0);
  let lightboxOpen = $state(false);

  function openLightbox(images: LightboxImage[], index: number) {
    lightboxImages = images;
    lightboxIndex = index;
    lightboxOpen = true;
  }
</script>

<svelte:head>
  <title>O nama — Radio Roža</title>
</svelte:head>

<Lightbox
  images={lightboxImages}
  open={lightboxOpen}
  startIndex={lightboxIndex}
  onclose={() => (lightboxOpen = false)}
/>

<main class="o-nama-page">

  <!-- ── Title + intro ── -->
  <section class="intro-section">
    <h1 class="page-title">o nama</h1>
    <p class="intro-text">
      <!-- content TBD -->
      Radio Roža je community radio stanica iz Rijeke, vođena volonterima i entuzijastima koji vjeruju u slobodnu, nezavisnu glazbenu kulturu. Emitiramo 24/7, pokrivamo sve žanrove i scene, i trudimo se biti glas zajednice.
    </p>
  </section>

  <!-- ── Photo grid 1 ── -->
  <div class="photo-grid photo-grid--portrait" aria-label="Galerija fotografija studija">
    {#each gallery1 as image, i (i)}
      <button
        class="photo-item"
        onclick={() => openLightbox(gallery1, i)}
        aria-label="Otvori fotografiju: {image.alt}"
      >
        {#if image.src}
          <img src={image.src} alt={image.alt} class="photo-img" />
        {:else}
          <div class="photo-placeholder" aria-hidden="true"></div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- ── Kakav smo + gdje smo ── -->
  <section class="two-col-section">
    <div class="two-col-block">
      <h2 class="block-title">kakav smo mi radio</h2>
      <div class="block-text">
        <p><!-- content TBD --> Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima. Svaka emisija je priča, svaki DJ je glasnik nečeg važnog.</p>
        <p>Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima. Radio, podcast, intervju, reportaža — sve je dobrodošlo.</p>
      </div>
    </div>

    <div class="two-col-block">
      <h2 class="block-title">gdje se nalazi naš studio</h2>
      <div class="block-text">
        <p><!-- content TBD --> Naš studio se nalazi u srcu Rijeke. Vrata su uvijek otvorena za posjet, suradnju i razgovor. Pronađi nas i uvjeri se osobno.</p>
        <p>Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu.</p>
      </div>
      <a href="#studio" class="studio-link">* * * posjeti studio</a>
    </div>
  </section>

  <!-- ── Photo grid 2 ── -->
  <div class="photo-grid photo-grid--landscape" aria-label="Galerija fotografija ekipe">
    {#each gallery2 as image, i (i)}
      <button
        class="photo-item"
        onclick={() => openLightbox(gallery2, i)}
        aria-label="Otvori fotografiju: {image.alt}"
      >
        {#if image.src}
          <img src={image.src} alt={image.alt} class="photo-img" />
        {:else}
          <div class="photo-placeholder" aria-hidden="true"></div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- ── Crew / Naša priča / Šalji mjuzu ── -->
  <section class="three-col-section">
    <div class="three-col-block">
      <h2 class="block-title">crew</h2>
      <p class="block-body"><!-- content TBD --> Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.</p>
    </div>

    <div class="three-col-block">
      <h2 class="block-title">naša priča</h2>
      <p class="block-body"><!-- content TBD --> Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.</p>
    </div>

    <div class="three-col-block">
      <h2 class="block-title">šalji mjuzu</h2>
      <p class="block-body"><!-- content TBD --> Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijeva mainstream pritiscima.</p>
    </div>
  </section>

  <!-- ── CTAs ── -->
  <div class="cta-section">
    <div class="cta-block">
      <h2 class="cta-title">podržni nas</h2>
      <div class="cta-image" aria-hidden="true"></div>
      <p class="cta-body"><!-- content TBD --></p>
    </div>
    <div class="cta-block">
      <h2 class="cta-title">pridruži se</h2>
      <div class="cta-image" aria-hidden="true"></div>
      <p class="cta-body"><!-- content TBD --></p>
    </div>
  </div>

</main>

<style>
  /* ── Intro ── */
  .intro-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem 1rem 2rem;
    border-bottom: 2px solid var(--color-black);
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  .intro-text {
    font-size: var(--text-body);
    line-height: 1.7;
    color: rgb(0 0 0 / 0.75);
  }

  /* ── Photo grids ── */
  .photo-grid {
    display: grid;
    gap: 2px;
    grid-template-columns: repeat(2, 1fr);
  }

  .photo-grid--landscape {
    grid-template-columns: repeat(2, 1fr);
  }

  .photo-item {
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: zoom-in;
    width: 100%;
    overflow: hidden;
  }

  .photo-item:focus-visible {
    outline: 3px solid var(--color-brand);
    outline-offset: -3px;
    z-index: 1;
    position: relative;
  }

  .photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .photo-item:hover .photo-img {
    transform: scale(1.04);
  }

  .photo-placeholder {
    background: rgb(0 0 0 / 0.08);
    aspect-ratio: 3 / 4;
    width: 100%;
    transition: background 0.2s;
  }

  .photo-grid--landscape .photo-placeholder {
    aspect-ratio: 4 / 3;
  }

  .photo-item:hover .photo-placeholder {
    background: rgb(0 0 0 / 0.13);
  }

  /* ── Two-col section ── */
  .two-col-section {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 1rem;
    margin: 3rem 0;
  }

  .two-col-block {
    padding: 1.5rem 0;
    border-top: 2px solid var(--color-black);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .block-title {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.1;
  }

  .block-text {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .block-text p,
  .block-body {
    font-size: var(--text-body);
    line-height: 1.7;
    color: rgb(0 0 0 / 0.75);
  }

  .studio-link {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-black);
    text-decoration: none;
    margin-top: auto;
  }

  .studio-link:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* ── Three-col section ── */
  .three-col-section {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 1rem;
    margin-bottom: 3rem;
  }

  .three-col-block {
    padding: 1.5rem 0;
    border-top: 2px solid var(--color-black);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* ── CTAs ── */
  .cta-section {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 2px solid var(--color-black);
  }

  .cta-block {
    padding: 1.5rem 1rem 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .cta-block + .cta-block {
    border-top: 2px solid var(--color-black);
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .cta-body {
    font-size: var(--text-body);
    color: rgb(0 0 0 / 0.7);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .cta-image {
    margin-top: auto;
    aspect-ratio: 4 / 3;
    background: rgb(0 0 0 / 0.07);
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .intro-section {
      grid-template-columns: 1fr 1fr;
      padding: 2rem 1.5rem 2.5rem;
    }

    .photo-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .two-col-section {
      grid-template-columns: 1fr 1fr;
      padding: 0 1.5rem;
      gap: 2rem;
      margin: 4rem 0;
    }

    .three-col-section {
      grid-template-columns: repeat(3, 1fr);
      padding: 0 1.5rem;
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .cta-block {
      padding: 2rem 1.5rem 0;
    }
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .intro-section {
      padding: 2.5rem 2rem 3rem;
      gap: 3rem;
    }

    .two-col-section {
      padding: 0 2rem;
      gap: 3rem;
      margin: 5rem 0;
    }

    .three-col-section {
      padding: 0 2rem;
      gap: 3rem;
      margin-bottom: 5rem;
    }

    .cta-section {
      grid-template-columns: 1fr 1fr;
    }

    .cta-block {
      padding: 2rem 2rem 0;
    }

    .cta-block + .cta-block {
      border-top: none;
      border-left: 2px solid var(--color-black);
    }
  }
</style>
