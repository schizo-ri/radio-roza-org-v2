<script lang="ts">
  interface Props {
    label: string;
    href?: string;
    color?: string;
  }

  let { label, href, color = 'black' }: Props = $props();
</script>

{#if href}
  <a class="tag" {href} data-color={color}>{label}</a>
{:else}
  <span class="tag" data-color={color}>{label}</span>
{/if}

<style>
  .tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 700;
    text-transform: uppercase;
    /*letter-spacing: 0.04em;*/
    color: var(--color-black);
    border: 1px solid rgb(0 0 0 / 0.35);
    border-radius: var(--text-body);
    padding: 0.5em 0.8em;
    white-space: nowrap;
    text-decoration: none;
    line-height: 1;
    width: min-content;
  }

  .tag[data-color='black'] {
    border-color: var(--color-black, #000);
    background-color: var(--color-black, #000);
    color: var(--color-white, #fff);
  }

  .tag[data-color='red'] {
    border-color: var(--color-brand, #e20000);
    background-color: var(--color-brand, #e20000);
    color: var(--color-white, #fff);
  }

  a.tag:hover {
    border-color: var(--color-black);
    background: rgb(0 0 0 / 0.05);
  }
</style>
