<script lang="ts">
  import { page } from '$app/state';

  const is404 = $derived(page.status === 404);
</script>

<div class="error">
  <p class="status">{page.status}</p>
  <h1>{is404 ? 'Stranica nije pronađena' : 'Greška na serveru'}</h1>
  <p class="message">
    {is404
      ? 'Stranica koju tražiš ne postoji ili je premještena.'
      : page.error?.message ?? 'Nešto je pošlo po krivu. Pokušaj ponovo.'}
  </p>
  <a href="/">Natrag na početnu</a>
</div>

<style>
  .error {
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .status {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
  }

  h1 {
    font-size: var(--text-display);
  }

  .message {
    font-size: var(--text-body);
    max-width: 40ch;
  }

  a {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-black);
  }
</style>
