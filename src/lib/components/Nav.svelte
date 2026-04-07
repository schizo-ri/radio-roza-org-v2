<script lang="ts">
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { fly, fade } from 'svelte/transition';
  import logo from '$lib/assets/logo.svg';

  let menuOpen = $state(false);

  afterNavigate(() => {
    menuOpen = false;
  });

  $effect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') menuOpen = false;
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

<svelte:window onkeydown={onKeydown} />

<nav>
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

    <button
      class="menu-button"
      onclick={() => (menuOpen = !menuOpen)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
    >
      <!-- IZBORNIK -->
      MENU
    </button>

    <!-- <button
      class="hamburger"
      onclick={() => (menuOpen = !menuOpen)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button> -->
  </div>
</nav>

{#if menuOpen}
  <div
    class="backdrop"
    role="presentation"
    onclick={() => (menuOpen = false)}
    transition:fade={{ duration: 200 }}
  ></div>
  <ul class="mobile-menu" aria-label="Navigacija" transition:fly={{ y: -8, duration: 200 }}>
    {#each links as { href, label } (href)}
      <li>
        <a {href} class={{ active: isActive(href) }}>{label}</a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  nav {
    background: var(--color-brand);
  }

  .nav-bar {
    display: flex;
    align-items: center;
    height: 60px;
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

  .menu-button {
    font-family: var(--font-mono);
    font-size: var(--text-title);
    font-weight: 400;
    color: var(--color-white);
    white-space: nowrap;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Backdrop */
  .backdrop {
    position: fixed;
    top: 60px;
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
    top: 60px;
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
      height: 70px;
      padding: 0 1.25rem;
    }

    .menu-button {
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
