<script lang="ts">
  import { program, blocks, type Day } from '$lib/utils/program';
  import {
    DAYS_ORDER,
    stationWeekday,
    stationMinutes,
    stationWeekDateLabels,
  } from '$lib/utils/time';
  import Seo from '$lib/components/Seo.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { browser } from '$app/environment';

  const DAY_NAMES_HR: Record<Day, string> = {
    Monday: 'ponedjeljak',
    Tuesday: 'utorak',
    Wednesday: 'srijeda',
    Thursday: 'četvrtak',
    Friday: 'petak',
    Saturday: 'subota',
    Sunday: 'nedjelja',
  };

  const weekDates = stationWeekDateLabels();

  // Group shows by day, sorted by start time
  const showsByDay = Object.fromEntries(
    DAYS_ORDER.map((day) => [
      day,
      program.filter((s) => s.day === day).sort((a, b) => a.show_start.localeCompare(b.show_start)),
    ])
  ) as Record<Day, typeof program>;

  // --- trenutna emisija ---
  let now = $state(new Date());

  $effect(() => {
    const id = setInterval(() => {
      now = new Date();
    }, 60_000);
    return () => clearInterval(id);
  });

  const today = $derived(stationWeekday(now));
  const currentTime = $derived(stationMinutes(now));

  // Samo u pregledniku — SSR HTML se kešira pa bi zapečena "sada" oznaka
  // vrlo brzo postala kriva; nakon hidratacije računa se iz stvarnog vremena.
  const currentShow = $derived(
    browser
      ? (showsByDay[today].findLast((s) => {
          const [h, m] = s.show_start.split(':').map(Number);
          return h * 60 + m <= currentTime;
        }) ?? null)
      : null
  );

  function scrollToNow() {
    const row = currentShow ? document.getElementById('trenutno') : null;
    if (row) {
      // center: uz tekuću emisiju vidi se i što je bilo prije / što slijedi
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // prije prve emisije dana — na vrh današnje sekcije
      const section = document.getElementById(today.toLowerCase());
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Dropdown
  let detailsEl: HTMLDetailsElement | undefined = $state();

  function onDayClick() {
    if (detailsEl) detailsEl.open = false;
  }

  // Scroll-to-top
  let showScrollTop = $state(false);

  $effect(() => {
    function onScroll() {
      showScrollTop = window.scrollY > 300;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<Seo
  title="Program — Radio Roža"
  description="Tjedni raspored emisija Radio Rože — što je danas u eteru i što slijedi."
/>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">program</h1>

    <div class="header-actions">
      <button class="now-btn" onclick={scrollToNow}>trenutno</button>

      <details class="pick-date" bind:this={detailsEl}>
        <summary class="pick-date-btn">odaberi dan</summary>
        <ul class="day-dropdown">
          {#each DAYS_ORDER as day (day)}
            <li>
              <a href="#{day.toLowerCase()}" onclick={onDayClick}>
                <span class="dropdown-day">{DAY_NAMES_HR[day]}</span>
                <span class="dropdown-date">{weekDates[day]}</span>
              </a>
            </li>
          {/each}
        </ul>
      </details>
    </div>
  </header>

  <div class="content">
    {#each DAYS_ORDER as day (day)}
      <section
        class="day-section"
        id={day.toLowerCase()}
        aria-current={day === today ? 'true' : undefined}
      >
        <div class="day-header">
          <h2 class="day-name">
            {DAY_NAMES_HR[day]}<span class="day-date">{weekDates[day]}</span>
          </h2>
        </div>

        <ul class="show-list">
          {#each showsByDay[day] as show (show.title + show.show_start)}
            {@const block = blocks.find((b) => b.title === show.title)}
            {@const isNow = show === currentShow}
            <li class="show-row" class:is-now={isNow} id={isNow ? 'trenutno' : undefined}>
              <span class="show-time">{show.show_start}</span>
              <div class="show-info">
                <h3 class="show-title">{show.title}</h3>
                {#if block}
                  <p class="show-desc">{block.description}</p>
                  <div class="show-tags">
                    {#each block.tags as tag (tag)}
                      <Tag label={tag} color="black" />
                    {/each}
                  </div>
                {/if}
              </div>
              {#if isNow}
                <span class="now-badge">sada</span>
              {/if}
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</main>

<button
  class="scroll-top"
  class:visible={showScrollTop}
  onclick={scrollToTop}
  aria-label="Scroll to top"
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <polyline
      points="4,13 10,7 16,13"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
    /* donji rub playera — Player.svelte mjeri stvarnu visinu bara (live/Mixcloud
       mod se razlikuju); fallback za SSR prije nego što se --player-offset postavi */
    --stack-top: var(--player-offset, calc(var(--nav-offset, 70px) + 57px));
  }

  .content {
    max-width: 640px;
    margin-inline: auto;
    /* clip umjesto hidden: hidden bi pretvorio .content u scrollport i
       ubio position: sticky na day-headerima */
    overflow-x: hidden;
    overflow-x: clip;
  }

  /* Header row */
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding-bottom: 1rem;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .now-btn {
    font: inherit;
    font-weight: 600;
    color: var(--color-brand);
    background: none;
    border: 2px solid var(--color-brand);
    border-radius: 2em;
    padding: 0.5em 1em;
    cursor: pointer;
    white-space: nowrap;
  }

  .now-btn:hover {
    background: var(--color-brand);
    color: var(--color-bg);
  }

  /* pick a date — <details> */
  .pick-date {
    position: relative;
  }

  .pick-date-btn {
    background: none;
    border: 2px solid var(--color-black);
    font-weight: 600;
    border-radius: 2em;
    padding: 0.5em 1em;
    cursor: pointer;
    list-style: none;
    white-space: nowrap;
    user-select: none;
  }

  .pick-date-btn::-webkit-details-marker {
    display: none;
  }

  .day-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    /* iznad sticky day-headera (z-index 10, kasnije u DOM-u) */
    z-index: 20;
    list-style: none;
    background: var(--color-bg);
    border: 2px solid var(--color-black);
    min-width: 11rem;
  }

  .day-dropdown a {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5em 0.75em;
    text-decoration: none;
    color: var(--color-black);
    font-size: var(--text-body);
  }

  .day-dropdown a:hover {
    background: rgb(0 0 0 / 0.06);
  }

  .dropdown-day {
    text-transform: lowercase;
  }

  .dropdown-date {
    color: rgb(0 0 0 / 0.45);
  }

  /* Day section */
  .day-section {
    margin-top: 3rem;
    /* anchor skokovi moraju sletjeti ispod playera */
    scroll-margin-top: calc(var(--stack-top) + 0.5rem);
  }

  .day-header {
    position: sticky;
    top: var(--stack-top);
    transition: top 0.3s ease; /* prati animaciju skrivanja nava, kao player */
    z-index: 10;
    background: var(--color-bg);
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-black);
  }

  .day-name {
    font-family: var(--font-display);
    font-size: var(--text-display); /* clamp(1.75rem, 7vw, 5rem); */
    font-weight: 400;
    line-height: 1.1;
    display: flex;
    align-items: baseline;
    gap: 0.35em;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .day-date {
    font-family: var(--font-mono);
    font-size: clamp(0.875rem, 2vw, 1.5rem);
    font-weight: 400;
    color: rgb(0 0 0 / 0.45);
  }

  /* Highlight today */
  .day-section[aria-current='true'] .day-name {
    color: var(--color-brand);
  }

  /* Show list */
  .show-list {
    list-style: none;
  }

  .show-row {
    display: flex;
    gap: 1rem;
    padding: 0.875rem 0;
    border-bottom: 1px solid rgb(0 0 0 / 0.1);
  }

  .show-row.is-now .show-time,
  .show-row.is-now .show-title {
    color: var(--color-brand);
  }

  .now-badge {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-brand);
    flex-shrink: 0;
    padding-top: 0.3em;
  }

  .show-time {
    /*font-family: var(--font-mono);*/
    font-size: var(--text-card);
    /*color: rgb(0 0 0 / 0.45);*/
    flex-shrink: 0;
    width: 2.75rem;
    /*padding-top: 0.2em;*/
  }

  .show-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .show-title {
    font-family: var(--font-display);
    font-size: var(--text-card);
    font-weight: 400;
  }

  .show-desc {
    font-size: var(--text-body);
    line-height: 1.5;
  }

  .show-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }

  /* Tablet+ */
  @media (min-width: 640px) {
    .page {
      padding: 2rem 1.5rem 5rem;
    }

    .show-row {
      gap: 2rem;
    }

    .show-time {
      width: 3.5rem;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .page {
      padding: 2.5rem 2rem 6rem;
    }

    .show-row {
      padding: 1rem 0;
    }
  }

  @media (min-width: 1400px) {
    .content {
      /* povuci kolonu gore, uz naslov (botuni su u redu s naslovom,
         pa header zauzima samo visinu naslova + 1rem paddinga) */
      margin-top: -9.5rem;
    }
  }

  .scroll-top {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 50;
    background: var(--color-bg);
    border: 2px solid var(--color-black);
    color: var(--color-black);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .scroll-top.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .scroll-top:hover {
    background: var(--color-black);
    color: var(--color-bg);
  }
</style>
