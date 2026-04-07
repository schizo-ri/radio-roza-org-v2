<script lang="ts">
  interface Props {
    label: string;
    href?: string;
  }

  let { label, href }: Props = $props();
</script>

{#if href}
  <a class="tag" {href}>{label}</a>
{:else}
  <span class="tag">{label}</span>
{/if}

<style>
  .tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-black);
    border: 1px solid rgb(0 0 0 / 0.35);
    padding: 0.2em 0.5em;
    white-space: nowrap;
    text-decoration: none;
    line-height: 1.4;
  }

  a.tag:hover {
    border-color: var(--color-black);
    background: rgb(0 0 0 / 0.05);
  }
</style>
