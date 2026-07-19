<script lang="ts">
  let { data }: { data: Record<string, unknown> } = $props();

  // < umjesto < da se sadržaj ne može probiti iz <script> bloka
  const json = $derived(JSON.stringify(data).replace(/</g, '\\u003c'));
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<script type="application/ld+json">${json}<\/script>`}
</svelte:head>
