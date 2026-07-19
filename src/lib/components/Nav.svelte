<script lang="ts">
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { fly, fade } from 'svelte/transition';
  import logo from '$lib/assets/logo.svg';
  import SearchPanel from '$lib/components/SearchPanel.svelte';

  let menuOpen = $state(false);
  let searchOpen = $state(false);
  let hidden = $state(false);
  let lastScrollY = 0;

  afterNavigate(() => {
    menuOpen = false;
  });

  $effect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });

  function getNavHeight() {
    return 70;
  }

  function onScroll() {
    const y = window.scrollY;
    if (y < 80) {
      hidden = false;
      document.documentElement.style.setProperty('--nav-offset', `${getNavHeight()}px`);
    } else if (y > lastScrollY) {
      hidden = true;
      document.documentElement.style.setProperty('--nav-offset', '0px');
    } else {
      hidden = false;
      document.documentElement.style.setProperty('--nav-offset', `${getNavHeight()}px`);
    }
    lastScrollY = y;
  }

  $effect(() => {
    document.documentElement.style.setProperty('--nav-offset', `${getNavHeight()}px`);
  });

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      menuOpen = false;
      searchOpen = false;
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
  </ul>
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
