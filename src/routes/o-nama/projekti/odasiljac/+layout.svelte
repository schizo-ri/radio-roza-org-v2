<script lang="ts">
  import { page } from '$app/state';

  let { children } = $props();

  const tabs = [
    { href: '/o-nama/projekti/odasiljac', label: 'O projektu' },
    { href: '/o-nama/projekti/odasiljac/nevidljive', label: 'Nevidljive' },
    { href: '/o-nama/projekti/odasiljac/sos', label: 'S.O.S.' },
    { href: '/o-nama/projekti/odasiljac/skolica', label: 'Školica' },
  ];
</script>

<div class="odasiljac-layout">
  <nav class="tabs" aria-label="Odašiljač navigacija">
    <ul>
      {#each tabs as tab (tab.href)}
        <li>
          <a
            href={tab.href}
            class="tab"
            class:active={page.url.pathname === tab.href}
            aria-current={page.url.pathname === tab.href ? 'page' : undefined}
          >
            {tab.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  {@render children()}
</div>

<style>
  .odasiljac-layout {
    width: 100%;
  }

  .tabs {
    position: sticky;
    top: var(--header-height, 60px);
    z-index: 10;
    background: var(--color-bg);
    border-bottom: 2px solid var(--color-black);
  }

  .tabs ul {
    display: flex;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab {
    display: block;
    padding: 0.75rem 1.25rem;
    text-decoration: none;
    color: inherit;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    border-right: 2px solid var(--color-black);
    transition: background 0.15s;
  }

  .tab:first-of-type {
    border-left: none;
  }

  .tab:hover {
    background: rgb(0 0 0 / 0.06);
  }

  .tab.active {
    background: var(--color-black);
    color: var(--color-white);
  }
</style>
