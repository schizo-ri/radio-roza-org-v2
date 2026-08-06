<script lang="ts">
  import { playerState } from '$lib/stores/player.svelte';
  import { playerSettings } from '$lib/stores/settings.svelte';

  const SLEEP_OPTIONS = [30, 60, 90];

  let { mode }: { mode: 'live' | 'mixcloud' } = $props();

  let open = $state(false);
  let menuEl = $state<HTMLDivElement | undefined>(undefined);
  let now = $state(Date.now());

  const timerActive = $derived(playerState.sleepTimerEndsAt !== null);

  const countdown = $derived.by(() => {
    const endsAt = playerState.sleepTimerEndsAt;
    if (endsAt === null) return '';
    const s = Math.max(0, Math.round((endsAt - now) / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  });

  // Countdown tick — only while the panel shows it
  $effect(() => {
    if (!open || !timerActive) return;
    now = Date.now();
    const id = setInterval(() => (now = Date.now()), 1000);
    return () => clearInterval(id);
  });

  // Click outside closes the panel
  $effect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (menuEl && !menuEl.contains(e.target as Node)) open = false;
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  });

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window onkeydown={open ? onKeydown : undefined} />

<div class="menu" bind:this={menuEl}>
  <button
    class="cog-btn"
    onclick={() => (open = !open)}
    aria-expanded={open}
    aria-label="Postavke playera"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="5" />
      <line x1="10" y1="4" x2="10" y2="1" />
      <line x1="10" y1="16" x2="10" y2="19" />
      <line x1="4" y1="10" x2="1" y2="10" />
      <line x1="16" y1="10" x2="19" y2="10" />
      <line x1="5.8" y1="5.8" x2="3.6" y2="3.6" />
      <line x1="14.2" y1="14.2" x2="16.4" y2="16.4" />
      <line x1="5.8" y1="14.2" x2="3.6" y2="16.4" />
      <line x1="14.2" y1="5.8" x2="16.4" y2="3.6" />
    </svg>
    {#if timerActive}
      <span class="timer-dot" aria-hidden="true"></span>
    {/if}
  </button>

  {#if open}
    <div class="panel">
      {#if mode === 'mixcloud' && playerState.mixcloudShow?.url}
        <a
          class="mc-link"
          href={playerState.mixcloudShow.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          otvori na mixcloudu ↗
        </a>
      {/if}

      <label class="row">
        <input
          type="checkbox"
          checked={playerSettings.autoplayOnVisit}
          onchange={(e) => playerSettings.setAutoplay(e.currentTarget.checked)}
        />
        pokreni radio pri posjetu
      </label>
      <p class="hint">preglednik može svejedno tražiti klik</p>

      {#if mode === 'live'}
        <div class="row volume-row">
          <span class="row-label" id="volume-label">glasnoća</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(playerSettings.volume * 100)}
            oninput={(e) => playerSettings.setVolume(Number(e.currentTarget.value) / 100)}
            aria-labelledby="volume-label"
          />
        </div>
      {/if}

      <div class="sleep">
        <span class="row-label">sleep timer</span>
        {#if timerActive}
          <div class="sleep-controls">
            <span class="countdown">{countdown}</span>
            <button class="sleep-btn" onclick={() => playerState.cancelSleepTimer()}>otkaži</button>
          </div>
        {:else}
          <div class="sleep-controls">
            {#each SLEEP_OPTIONS as min (min)}
              <button class="sleep-btn" onclick={() => playerState.startSleepTimer(min)}>
                {min} min
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .menu {
    position: relative;
    flex-shrink: 0;
  }

  .cog-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: rgb(0 0 0 / 0.9);
  }

  .cog-btn:hover,
  .cog-btn:focus-visible,
  .cog-btn[aria-expanded='true'] {
    color: var(--color-black);
  }

  .timer-dot {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 7px;
    height: 7px;
    background: var(--color-brand);
    border-radius: 50%;
  }

  .panel {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    /* iznad sadržaja stranice; .player je vlastiti stacking context (z-200) */
    z-index: 20;
    min-width: 15rem;
    background: var(--color-bg);
    border: 2px solid var(--color-black);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-black);
  }

  label.row {
    cursor: pointer;
  }

  .row input[type='checkbox'] {
    accent-color: var(--color-black);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  .hint {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: rgb(0 0 0 / 0.45);
    margin-top: -0.375rem;
  }

  .mc-link {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-black);
    text-decoration: none;
  }

  .mc-link:hover,
  .mc-link:focus-visible {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* Glasnoća ima smisla samo uz miš/trackpad — na touch uređajima je vrte
     hardverske tipke (a iOS audio.volume ionako ignorira) */
  .volume-row {
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .volume-row {
      display: flex;
    }
  }

  .volume-row input[type='range'] {
    flex: 1;
    min-width: 0;
    accent-color: var(--color-black);
  }

  .sleep {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .row-label {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-black);
    flex-shrink: 0;
  }

  .sleep-controls {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .sleep-btn {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    color: var(--color-black);
    background: var(--color-bg);
    border: 2px solid var(--color-black);
    padding: 0.25em 0.5em;
    cursor: pointer;
    white-space: nowrap;
  }

  .sleep-btn:hover,
  .sleep-btn:focus-visible {
    background: var(--color-black);
    color: var(--color-bg);
  }

  .countdown {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    color: var(--color-brand);
    min-width: 3.25rem;
  }
</style>
