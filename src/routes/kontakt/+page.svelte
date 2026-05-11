<script lang="ts">
  import CtaSection from '$lib/components/CtaSection.svelte';
</script>

<svelte:head>
  <title>Kontakt — Radio Roža</title>
  <meta
    name="description"
    content="Kontaktirajte Radio Rožu - nezavisnu riječku internetsku radio stanicu."
  />
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">kontakt</h1>
  </header>

  <!-- ── E-mail ── -->
  <section class="contact-section">
    <h2 class="section-title">e-mail</h2>
    <dl class="contact-list">
      <dt>Redakcija</dt>
      <dd><a href="mailto:redakcija.radioroza@gmail.com">redakcija.radioroza@gmail.com</a></dd>

      <dt>Glazbeno uredništvo</dt>
      <dd><a href="mailto:glazba.radioroza@gmail.com">glazba.radioroza@gmail.com</a></dd>

      <dt>Općenito</dt>
      <dd><a href="mailto:radio.rozari@gmail.com">radio.rozari@gmail.com</a></dd>
    </dl>
  </section>

  <!-- ── Kontakti ── -->
  <section class="contact-section">
    <h2 class="section-title">kontakti</h2>
    <div class="people-grid">
      <div class="person-card">
        <h3 class="person-name">Davor Popdankovski</h3>
        <p class="person-role">Glavni urednik</p>
      </div>

      <div class="person-card">
        <h3 class="person-name">Sebastijan Tomažin</h3>
        <p class="person-role">Audio tehničar i tonac</p>
        <a href="mailto:tomazin.sebastijan@gmail.com">tomazin.sebastijan@gmail.com</a>
      </div>

      <div class="person-card">
        <h3 class="person-name">Edin Vesković</h3>
        <p class="person-role">WEB &amp; Informatička podrška</p>
        <a href="mailto:edin.lockedin@gmail.com">edin.lockedin@gmail.com</a>
      </div>
    </div>
  </section>

  <!-- ── Pratite nas ── -->
  <section class="contact-section">
    <h2 class="section-title">pratite nas</h2>
    <div class="social-links">
      <a
        href="https://facebook.com/radiorozha"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/icons/socials/facebook.svg" alt="" width="24" height="24" />

        <span>Facebook</span>
      </a>
      <a
        href="https://www.instagram.com/radio.rozari/"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/icons/socials/instagram.svg" alt="" width="24" height="24" />
        <span>Instagram</span>
      </a>
      <a
        href="https://mixcloud.com/RadioRoza"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/icons/socials/mixcloud.svg" alt="" width="24" height="24" />

        <span>Mixcloud</span>
      </a>
      <a
        href="https://youtube.com/@radioroza9811"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/icons/socials/youtube.svg" alt="" width="24" height="24" />
        <span>YouTube</span>
      </a>
    </div>
  </section>

  <CtaSection />
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding-bottom: 1rem;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }

  /* ── Sections ── */
  .contact-section {
    margin-top: 2.5rem;
    margin-bottom: 4rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }

  /* ── E-mail list ── */
  .contact-list {
    border: 2px solid var(--color-black);
    padding: 1.5rem;
  }

  dt {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 1.25rem;
    margin-bottom: 0.2rem;
  }

  dt:first-child {
    margin-top: 0;
  }

  dd {
    margin-left: 0;
  }

  dd a {
    font-size: var(--text-title);
    font-weight: 500;
    color: var(--color-brand);
    text-decoration: none;
  }

  dd a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* ── People grid ── */
  .people-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
  }

  .person-card {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    border-bottom: 2px solid var(--color-black);
  }

  .person-card:last-child {
    border-bottom: none;
  }

  .person-name {
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.2;
  }

  .person-role {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.25rem;
  }

  .person-card a {
    font-size: var(--text-body);
    font-weight: 500;
    color: var(--color-brand);
    text-decoration: none;
    word-break: break-all;
  }

  .person-card a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* ── Social links ── */
  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: 2px solid var(--color-black);
    text-decoration: none;
    color: var(--color-black);
    font-size: var(--text-body);
    font-weight: 500;
    transition: background-color 0.15s ease;
  }

  .social-link:hover {
    background: var(--color-brand);
    color: var(--color-white);
  }

  .social-link:hover img {
    filter: invert(1);
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }

    .contact-list {
      padding: 1.5rem 2rem;
    }

    .people-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .person-card {
      border-bottom: none;
      border-right: 2px solid var(--color-black);
    }

    .person-card:last-child {
      border-right: none;
    }
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

    .contact-section {
      margin-top: 3.5rem;
    }
  }
</style>
