<script lang="ts">
  interface Props {
    label: string;
    href: string;
  }

  let { label, href }: Props = $props();
</script>

<a {href}>→→→ {label}</a>

<style>
  a {
    font-size: var(--text-card);
    text-transform: uppercase;
    color: var(--color-black);
    text-decoration: none;
    line-height: 1;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
