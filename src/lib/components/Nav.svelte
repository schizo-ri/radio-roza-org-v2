<script lang="ts">
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { fly, fade } from 'svelte/transition';
  import logo from '$lib/assets/logo.svg';
  import SearchPanel from '$lib/components/SearchPanel.svelte';
  import { installState } from '$lib/stores/install.svelte';

  let menuOpen = $state(false);
  let searchOpen = $state(false);
  let iosHelpOpen = $state(false);
  let hidden = $state(false);
  let lastScrollY = 0;
  let upDistance = 0;
  const SHOW_THRESHOLD = 20; // px kontinuiranog scrolla prema gore prije nego se traka vrati

  afterNavigate(() => {
    menuOpen = false;
    iosHelpOpen = false;
  });

  $effect(() => {
    document.body.style.overflow = menuOpen || searchOpen || iosHelpOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });

  function getNavHeight() {
    return 70;
  }

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastScrollY;

    if (y < 80) {
      hidden = false;
      upDistance = 0;
    } else if (delta > 0) {
      hidden = true;
      upDistance = 0;
    } else if (delta < 0) {
      upDistance += -delta;
      if (upDistance > SHOW_THRESHOLD) {
        hidden = false;
      }
    }

    document.documentElement.style.setProperty(
      '--nav-offset',
      hidden ? '0px' : `${getNavHeight()}px`
    );
    lastScrollY = y;
  }

  $effect(() => {
    document.documentElement.style.setProperty('--nav-offset', `${getNavHeight()}px`);
  });

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      menuOpen = false;
      searchOpen = false;
      iosHelpOpen = false;
    }
  }

  const links = [
    { href: '/', label: 'Radio Roža' },
    { href: '/citaj-radio', label: 'Čitaj radio' },
    { href: '/program', label: 'Program' },
    { href: '/emisije', label: 'Emisije' },
    { href: '/o-nama', label: 'O nama' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  function isActive(href: string): boolean {
    if (href === '/') return page.url.pathname === '/';
    return page.url.pathname.startsWith(href);
  }

  function onInstallClick() {
    menuOpen = false;
    if (installState.mode === 'prompt') {
      installState.promptInstall();
    } else {
      iosHelpOpen = true;
    }
  }
</script>

<svelte:window onkeydown={onKeydown} onscroll={onScroll} />

<nav class={{ hidden }}>
  <div class="nav-bar">
    <a href="/" class="logo" aria-label="Radio Roža — početna stranica">
      <img src={logo} alt="Radio Roža" width="40" height="40" />
    </a>

    <ul class="links" aria-label="Navigacija">
      {#each links as { href, label } (href)}
        <li>
          <a {href} class={{ active: isActive(href) }}>{label}</a>
        </li>
      {/each}
    </ul>

    <a href="/" class="site-name" aria-label="Radio Roža — početna stranica">Radio Roža</a>

    <button
      class="search-btn"
      onclick={() => {
        searchOpen = !searchOpen;
        menuOpen = false;
      }}
      aria-expanded={searchOpen}
      aria-label={searchOpen ? 'Zatvori pretragu' : 'Otvori pretragu'}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2" />
        <line
          x1="15.5"
          y1="15.5"
          x2="21"
          y2="21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <button
      class="hamburger"
      onclick={() => {
        menuOpen = !menuOpen;
        searchOpen = false;
      }}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
    >
      <span class="bar" class:open={menuOpen}></span>
      <span class="bar" class:open={menuOpen}></span>
      <span class="bar" class:open={menuOpen}></span>
    </button>
  </div>
</nav>

<SearchPanel open={searchOpen} onclose={() => (searchOpen = false)} />

{#if menuOpen}
  <div
    class="backdrop"
    role="presentation"
    onclick={() => (menuOpen = false)}
    transition:fade={{ duration: 200 }}
  ></div>
  <ul class="mobile-menu" aria-label="Navigacija" transition:fly={{ y: -8, duration: 200 }}>
    {#each links.filter((l) => l.href !== '/') as { href, label } (href)}
      <li>
        <a {href} class={{ active: isActive(href) }}>{label}</a>
      </li>
    {/each}
    {#if installState.mode !== 'none'}
      <li class="install-item">
        <button class="install-btn" onclick={onInstallClick}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Instaliraj aplikaciju
        </button>
      </li>
    {/if}
  </ul>
{/if}

{#if iosHelpOpen}
  <div
    class="backdrop"
    role="presentation"
    onclick={() => (iosHelpOpen = false)}
    transition:fade={{ duration: 200 }}
  ></div>
  <div
    class="ios-help"
    role="dialog"
    aria-label="Upute za dodavanje na početni zaslon"
    transition:fly={{ y: -8, duration: 200 }}
  >
    <h2>Dodaj Radio Rožu na početni zaslon</h2>
    <ol>
      <li>Dodirni ikonu <strong>Podijeli</strong> u traci preglednika</li>
      <li>Odaberi <strong>Dodaj na početni zaslon</strong></li>
      <li>Potvrdi s <strong>Dodaj</strong></li>
    </ol>
    <p class="hint">
      Stigla si iz Instagrama ili Facebooka? Prvo otvori stranicu u Safariju — u pregledniku unutar
      aplikacije te opcije nema.
    </p>
    <button class="close-btn" onclick={() => (iosHelpOpen = false)}>U redu</button>
  </div>
{/if}

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 300;
    background: var(--color-brand);
    transform: translateY(0);
    transition: transform 0.3s ease;
  }

  nav.hidden {
    transform: translateY(-100%);
  }

  .nav-bar {
    display: flex;
    align-items: center;
    height: 70px;
    padding: 0 1rem;
    gap: 1rem;
  }

  .logo {
    display: flex;
    flex-shrink: 0;
    text-decoration: none;
  }

  /* Desktop links — hidden on mobile */
  .links {
    display: none;
    list-style: none;
  }

  .site-name {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    color: var(--color-white);
    text-decoration: none;
    white-space: nowrap;
  }

  .search-btn {
    display: flex;
    align-items: center;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
    color: var(--color-white);
  }

  .search-btn:hover,
  .search-btn[aria-expanded='true'] {
    color: var(--color-black);
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }

  .bar {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-white);
    border-radius: 1px;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
    transform-origin: center;
  }

  .bar:nth-child(1).open {
    transform: translateY(7px) rotate(45deg);
  }

  .bar:nth-child(2).open {
    opacity: 0;
  }

  .bar:nth-child(3).open {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Backdrop */
  .backdrop {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
    background: rgb(0 0 0 / 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  /* Mobile overlay menu */
  .mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    z-index: 301;
    list-style: none;
    background: var(--color-brand);
    padding: 0.5rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu a {
    display: block;
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    color: var(--color-white);
    text-decoration: none;
    padding: 0.4rem 0;
  }

  .mobile-menu a.active {
    color: var(--color-black);
  }

  .install-item {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgb(255 255 255 / 0.3);
  }

  .install-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.4rem 0;
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    color: var(--color-white);
    text-align: left;
  }

  /* Upute za iOS — ondje nema install API-ja, samo Podijeli izbornik */
  .ios-help {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    z-index: 301;
    background: var(--color-bg);
    color: var(--color-black);
    padding: 1.25rem 1rem 1.5rem;
  }

  .ios-help h2 {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
    margin: 0 0 0.75rem;
  }

  .ios-help ol {
    margin: 0;
    padding-left: 1.25rem;
    font-size: var(--text-body);
    line-height: 1.6;
  }

  .ios-help .hint {
    margin: 0.75rem 0 0;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    line-height: 1.5;
  }

  .close-btn {
    margin-top: 1rem;
    background: var(--color-brand);
    color: var(--color-white);
    border: none;
    cursor: pointer;
    padding: 0.5rem 1.25rem;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* md: landscape tablet and up */
  @media (min-width: 1024px) {
    .nav-bar {
      padding: 0 1.25rem;
    }

    .site-name {
      display: none;
    }

    .hamburger {
      display: none;
    }

    .links {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-left: 0.5rem;
    }

    .links a {
      font-family: var(--font-display);
      font-size: var(--text-title);
      font-weight: 400;
      color: var(--color-white);
      text-decoration: none;
      white-space: nowrap;
    }

    .links a.active {
      color: var(--color-black);
    }
  }
</style>
