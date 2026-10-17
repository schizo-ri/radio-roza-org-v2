<script lang="ts">
  import { page } from '$app/state';
  import logo from '$lib/assets/logo.svg';

  const year = new Date().getFullYear();

  const links = [
    { href: '/citaj-radio', label: 'Čitaj radio' },
    { href: '/program', label: 'Program' },
    { href: '/emisije', label: 'Emisije' },
    { href: '/arhiva', label: 'Arhiva' },
    { href: '/o-nama', label: 'O nama' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  const emails = [
    'redakcija.radioroza@gmail.com',
    'glazba.radioroza@gmail.com',
    'radio.rozari@gmail.com',
  ];

  const socials = [
    { href: 'https://facebook.com/radiorozha', label: 'FB', title: 'Facebook' },
    { href: 'https://www.instagram.com/radio.rozari/', label: 'IG', title: 'Instagram' },
    { href: 'https://mixcloud.com/RadioRoza', label: 'MX', title: 'Mixcloud' },
    { href: 'https://youtube.com/@radioroza9811', label: 'YT', title: 'YouTube' },
    { href: '/citaj-radio/rss.xml', label: 'RSS', title: 'RSS — Čitaj radio' },
  ];

  /* src prazan = placeholder; izvornici logotipa su u assets-src/logos */
  const supporters = [
    { name: 'HDS ZAMP', src: '/images/logos/hds-zamp.webp', href: 'https://www.zamp.hr' },
    {
      name: 'Primorsko-goranska županija',
      src: '/images/logos/pgz.webp',
      href: 'https://www.pgz.hr',
    },
    {
      name: 'Ministarstvo kulture i medija',
      src: '/images/logos/ministarstvo-kulture.webp',
      href: 'https://min-kulture.gov.hr',
    },
    { name: 'Grad Rijeka', src: '/images/logos/grad-rijeka.webp', href: 'https://www.rijeka.hr' },
  ];

  function isActive(href: string): boolean {
    return page.url.pathname.startsWith(href);
  }
</script>

<footer>
  <div class="footer-inner">
    <div class="brand">
      <a href="/" class="brand-mark" aria-label="Radio Roža — početna stranica">
        <img src={logo} alt="" width="48" height="48" />
        <span>radio roža</span>
      </a>
      <p class="brand-desc">Nezavisna riječka internetska radio stanica.</p>
    </div>

    <nav class="col" aria-label="Stranice">
      <h2 class="col-label">stranice</h2>
      <ul class="pages">
        {#each links as { href, label } (href)}
          <li>
            <a {href} class={{ active: isActive(href) }}>{label}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="col">
      <h2 class="col-label">e-mail</h2>
      <ul class="mail-list">
        {#each emails as email (email)}
          <li><a href="mailto:{email}">{email}</a></li>
        {/each}
      </ul>
    </div>

    <div class="col">
      <h2 class="col-label">pratite nas</h2>
      <ul class="social-list">
        {#each socials as { href, label, title } (href)}
          <li>
            <a {href} target="_blank" rel="noopener noreferrer" {title}>{label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="signoff">
    <p class="signoff-line">
      <span>
        sav sadržaj dijelimo pod licencijom
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/deed.hr"
          rel="license noopener noreferrer"
          target="_blank">cc by-sa 4.0</a
        >
      </span>
      <span>ne koristimo kolačiće — čuvamo ih za goste u studiju</span>
      <span>radio roža · rijeka · {year}</span>
    </p>
  </div>

  <section class="supported-by" aria-labelledby="supported-by-label">
    <h2 id="supported-by-label" class="col-label">uz potporu</h2>
    <ul class="supporters-logos">
      <li class="eu">
        <img
          src="/images/logos/eu-sufinancira.webp"
          alt="Sufinancira Europska unija"
          width="787"
          height="200"
          loading="lazy"
        />
      </li>
      {#each supporters as { name, src, href } (name)}
        <li>
          <a {href} target="_blank" rel="noopener noreferrer" title={name}>
            {#if src}
              <img {src} alt={name} loading="lazy" />
            {:else}
              <span class="logo-placeholder">{name}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
    <p class="funding-note">
      Financirano sredstvima Europske unije. Izneseni stavovi i mišljenja su stavovi i mišljenja
      autora i ne moraju se podudarati sa stavovima i mišljenjima Europske unije ili Europske
      izvršne agencije za obrazovanje i kulturu (EACEA). Ni Europska unija ni EACEA ne mogu se
      smatrati odgovornima za njih.
    </p>
  </section>
</footer>

<style>
  footer {
    margin-top: auto;
    background: var(--color-brand);
    color: var(--color-white);
  }

  .footer-inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 1rem;
  }

  /* ── Brand ── */
  .brand-mark {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .brand-mark span {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    color: var(--color-white);
    white-space: nowrap;
  }

  /* 33⅓ rpm, kao ploča */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .brand-mark:hover img,
  .brand-mark:focus-visible img {
    animation: spin 1.8s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .brand-mark:hover img,
    .brand-mark:focus-visible img {
      animation: none;
    }
  }

  .brand-desc {
    margin-top: 1rem;
    max-width: 26ch;
    line-height: 1.6;
  }

  /* ── Columns ── */
  .col-label {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .pages,
  .mail-list,
  .social-list {
    list-style: none;
  }

  .social-list {
    display: inline-flex;
    gap: 16px;
  }

  .col a {
    display: inline-block;
    color: var(--color-white);
    text-decoration: none;
    padding: 0.15rem 0;
  }

  .col a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .pages a {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
  }

  .pages a.active {
    color: var(--color-black);
  }

  .mail-list a,
  .social-list a {
    font-size: var(--text-body);
    overflow-wrap: anywhere;
  }

  .social-list a {
    font-weight: 600;
    font-family: var(--font-mono);
  }

  /* ── Sign-off strip ── */
  .signoff {
    border-top: 2px solid var(--color-white);
    padding: 1rem 1rem 1.25rem;
  }

  .signoff-line {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1.7;
  }

  .signoff-line a {
    color: var(--color-white);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .signoff-line a:hover {
    color: var(--color-black);
  }

  /* ── Supported-by strip ── */
  .supported-by {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    background: var(--color-white);
    color: var(--color-black);
    padding: 1.5rem 1rem 1.75rem;
  }

  .supported-by .col-label {
    margin-bottom: 0;
  }

  /* svi logotipi na istoj visini; EU znak odvojen crtom jer nosi izjavu ispod */
  .supporters-logos {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem 1.75rem;
  }

  .supporters-logos .eu {
    flex-basis: 100%;
  }

  .supporters-logos a {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .supporters-logos img {
    display: block;
    height: 3rem;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  .funding-note {
    max-width: 88ch;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 0.8125rem;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.75);
  }

  .logo-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    width: 8.5rem;
    padding: 0 0.5rem;
    border: 1px dashed rgba(0, 0, 0, 0.4);
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1.3;
    text-align: center;
    color: rgba(0, 0, 0, 0.55);
  }

  .supporters-logos a:hover .logo-placeholder {
    border-color: var(--color-black);
    color: var(--color-black);
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .footer-inner {
      grid-template-columns: 1fr 1fr;
      padding: 3rem 1.5rem;
    }

    .brand {
      grid-column: 1 / -1;
    }

    .signoff {
      padding: 1rem 1.5rem 1.25rem;
    }

    .supported-by {
      padding: 1.5rem 1.5rem 1.75rem;
    }

    .supporters-logos .eu {
      flex-basis: auto;
      padding-right: 1.75rem;
      border-right: 1px solid rgba(0, 0, 0, 0.15);
    }

    .supporters-logos img {
      height: 3.5rem;
    }
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .footer-inner {
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr);
      gap: 2rem;
      padding: 3.5rem 2rem 3rem;
    }

    .brand {
      grid-column: auto;
    }

    .signoff {
      padding: 1rem 2rem 1.25rem;
    }

    .supported-by {
      padding: 1.75rem 2rem 2rem;
    }

    .supporters-logos {
      gap: 1.25rem 2.25rem;
    }

    .supporters-logos .eu {
      padding-right: 2.25rem;
    }

    .signoff-line {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 0.75em;
    }

    .signoff-line span + span::before {
      content: '···';
      margin-right: 0.75em;
    }
  }

  /* ── Široki ekran (1280px+) ── */
  @media (min-width: 1280px) {
    /* izjava uz logotipe umjesto ispod njih */
    .supported-by {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      align-items: center;
      column-gap: 2.25rem;
    }

    .supported-by .col-label {
      grid-column: 1 / -1;
    }

    .funding-note {
      justify-self: start;
      padding-top: 0;
      padding-left: 2.25rem;
      border-top: 0;
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      max-width: 72ch;
    }
  }
</style>
