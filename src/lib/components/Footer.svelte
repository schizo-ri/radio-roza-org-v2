<script lang="ts">
  import { page } from '$app/state';
  import logo from '$lib/assets/logo.svg';

  const year = new Date().getFullYear();

  const links = [
    { href: '/citaj-radio', label: 'Čitaj radio' },
    { href: '/program', label: 'Program' },
    { href: '/emisije', label: 'Emisije' },
    { href: '/o-nama', label: 'O nama' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  const emails = [
    'redakcija.radioroza@gmail.com',
    'glazba.radioroza@gmail.com',
    'radio.rozari@gmail.com',
  ];

  const socials = [
    { href: 'https://facebook.com/radiorozha', label: 'Facebook' },
    { href: 'https://www.instagram.com/radio.rozari/', label: 'Instagram' },
    { href: 'https://mixcloud.com/RadioRoza', label: 'Mixcloud' },
    { href: 'https://youtube.com/@radioroza9811', label: 'YouTube' },
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
        {#each socials as { href, label } (href)}
          <li>
            <a {href} target="_blank" rel="noopener noreferrer">{label}</a>
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
</style>
