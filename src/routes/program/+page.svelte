<script lang="ts">
  import { program, blocks, type Day } from '$lib/utils/program';
  import Tag from '$lib/components/Tag.svelte';

  const DAYS_ORDER: Day[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const DAY_NAMES_HR: Record<Day, string> = {
    Monday: 'ponedjeljak',
    Tuesday: 'utorak',
    Wednesday: 'srijeda',
    Thursday: 'četvrtak',
    Friday: 'petak',
    Saturday: 'subota',
    Sunday: 'nedjelja',
  };

  // Monday of the current week → one Date per day
  function getWeekDates(): Record<Day, Date> {
    const now = new Date();
    const dow = now.getDay(); // 0 = Sun
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
    monday.setHours(0, 0, 0, 0);

    return Object.fromEntries(
      DAYS_ORDER.map((day, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return [day, d];
      })
    ) as Record<Day, Date>;
  }

  const weekDates = getWeekDates();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as Day;

  function formatDate(d: Date): string {
    return `${d.getDate()}.${d.getMonth() + 1}.`;
  }

  // Group shows by day, sorted by start time
  const showsByDay = Object.fromEntries(
    DAYS_ORDER.map((day) => [
      day,
      program.filter((s) => s.day === day).sort((a, b) => a.show_start.localeCompare(b.show_start)),
    ])
  ) as Record<Day, typeof program>;

  // Scroll to today's section on mount
  $effect(() => {
    const el = document.getElementById(today.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Dropdown
  let detailsEl: HTMLDetailsElement | undefined = $state();

  function onDayClick() {
    if (detailsEl) detailsEl.open = false;
  }
</script>

<svelte:head>
  <title>Program — Radio Roža</title>
</svelte:head>

<main class="page">
  <header class="page-header">
    <h1 class="page-title">program</h1>

    <details class="pick-date" bind:this={detailsEl}>
      <summary class="pick-date-btn">pick a date</summary>
      <ul class="day-dropdown">
        {#each DAYS_ORDER as day (day)}
          <li>
            <a href="#{day.toLowerCase()}" onclick={onDayClick}>
              <span class="dropdown-day">{DAY_NAMES_HR[day]}</span>
              <span class="dropdown-date">{formatDate(weekDates[day])}</span>
            </a>
          </li>
        {/each}
      </ul>
    </details>
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
            {DAY_NAMES_HR[day]}<span class="day-date">{formatDate(weekDates[day])}</span>
          </h2>
        </div>

        <ul class="show-list">
          {#each showsByDay[day] as show (show.title + show.show_start)}
            {@const block = blocks.find((b) => b.title === show.title)}
            <li class="show-row">
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
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</main>

<style>
  .page {
    padding: 1.5rem 1rem 4rem;
  }

  .content {
    max-width: 640px;
    margin-inline: auto;
    overflow-x: hidden;
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
    z-index: 10;
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
    scroll-margin-top: 1rem;
  }

  .day-header {
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

  @media (min-width: 1600px) {
    .content {
      margin-top: -9rem;
    }
  }
</style>
