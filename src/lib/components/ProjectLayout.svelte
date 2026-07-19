<script lang="ts">
  import type { Snippet } from 'svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';

  interface Props {
    /** "projekti" za projektne stranice, naziv emisije za emisije Odašiljača */
    title?: string;
    left: Snippet;
    right: Snippet;
  }

  let { title = 'projekti', left, right }: Props = $props();
</script>

<main class="page">
  <PageHeader {title} />

  <div class="project-layout">
    <div class="project-left">{@render left()}</div>
    <div class="project-right">{@render right()}</div>
  </div>
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  .project-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-right {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* ── Zajednički obrasci sadržaja koje stranice slažu u left/right snippetima ── */
  .page :global(.project-cover) {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: rgb(0 0 0 / 0.08);
  }

  .page :global(.project-cover img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .page :global(.project-about) {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .page :global(.project-name) {
    font-family: var(--font-display);
    font-size: var(--text-title);
    font-weight: 400;
    line-height: 1.1;
  }

  .page :global(.project-org) {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .page :global(.project-desc) {
    font-size: var(--text-body);
    line-height: 1.7;
  }

  .page :global(.project-meta) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 1rem;
    font-size: var(--text-body);
    line-height: 1.5;
  }

  .page :global(.project-meta dt) {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-top: 0.15em;
    white-space: nowrap;
    align-self: start;
  }

  .page :global(.project-meta dd) {
    margin: 0;
  }

  .page :global(.project-meta a) {
    color: inherit;
    text-underline-offset: 3px;
  }

  .page :global(.project-content) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .page :global(.project-content p) {
    font-size: var(--text-body);
    line-height: 2;
  }

  .page :global(.project-content hr) {
    border: none;
    border-top: 2px solid var(--color-black);
  }

  .page :global(.project-content a) {
    color: inherit;
    text-underline-offset: 3px;
  }

  .page :global(.project-list) {
    font-size: var(--text-body);
    line-height: 2;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .page :global(.eu-notice) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .page :global(.eu-notice p) {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    line-height: 1.5;
  }

  .page :global(.eu-notice img) {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }
  }

  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

    .project-layout {
      grid-template-columns: 40fr 60fr;
      gap: 3rem;
      align-items: start;
    }
  }
</style>
