<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import '$lib/styles/fonts.css';
  import '$lib/styles/tokens.css';
  import '$lib/styles/global.css';
  import Nav from '$lib/components/Nav.svelte';
  import Player from '$lib/components/Player.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { installState } from '$lib/stores/install.svelte';

  let { children } = $props();

  // Slušatelj mora stajati ovdje, a ne u Nav-u: beforeinstallprompt zna stići
  // tek nakon interakcije sa stranicom, dakle možda prije nego je izbornik ikad
  // otvoren. Vidljivost gumba je izvedena iz storea, ne izračunata pri montiranju.
  $effect(() => {
    const onPrompt = (e: Event) => installState.capture(e);
    const onInstalled = () => installState.markInstalled();
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
  <Nav />
  <Player />
  <div class="layout-content">
    {@render children()}
  </div>
  <Footer />
</div>

<style>
  .layout {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    padding-top: 70px;
  }

  .layout-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
