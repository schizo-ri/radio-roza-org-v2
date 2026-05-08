<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import '$lib/styles/fonts.css';
  import '$lib/styles/tokens.css';
  import '$lib/styles/global.css';
  import Nav from '$lib/components/Nav.svelte';
  import Player from '$lib/components/Player.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
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
  }

  .layout-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
