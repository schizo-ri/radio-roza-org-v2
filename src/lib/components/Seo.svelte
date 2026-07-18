<script lang="ts">
  import { page } from '$app/state';

  interface Props {
    title: string;
    description?: string;
    /** Absolute URL — social crawlers ignore relative paths */
    image?: string;
    type?: 'website' | 'article';
  }

  let { title, description, image, type = 'website' }: Props = $props();

  const url = $derived(page.url.origin + page.url.pathname);
</script>

<svelte:head>
  <title>{title}</title>
  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
  {/if}
  <meta property="og:title" content={title} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:site_name" content="Radio Roža" />
  <meta property="og:locale" content="hr_HR" />
  {#if image}
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
  {:else}
    <meta name="twitter:card" content="summary" />
  {/if}
</svelte:head>
