import type { Day } from './program';

// The schedule follows the studio clock in Rijeka, not the visitor's — a
// listener abroad (or the UTC server during SSR) must see the same
// "program danas" as someone in the studio.
const STATION_TZ = 'Europe/Zagreb';

export const DAYS_ORDER: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const weekdayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: STATION_TZ });

const timeFmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: STATION_TZ,
});

// en-CA formats as YYYY-MM-DD
const ymdFmt = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: STATION_TZ,
});

export function stationWeekday(date: Date = new Date()): Day {
  return weekdayFmt.format(date) as Day;
}

/** Minutes since midnight, station time. */
export function stationMinutes(date: Date = new Date()): number {
  const [h, m] = timeFmt.format(date).split(':').map(Number);
  return h * 60 + m;
}

/** "18.7."-style labels for Monday–Sunday of the current station-time week. */
export function stationWeekDateLabels(date: Date = new Date()): Record<Day, string> {
  const [y, m, d] = ymdFmt.format(date).split('-').map(Number);
  // Noon UTC keeps day arithmetic away from DST boundaries
  const base = new Date(Date.UTC(y, m - 1, d, 12));
  const monday = new Date(base);
  monday.setUTCDate(base.getUTCDate() - DAYS_ORDER.indexOf(stationWeekday(date)));

  return Object.fromEntries(
    DAYS_ORDER.map((day, i) => {
      const dd = new Date(monday);
      dd.setUTCDate(monday.getUTCDate() + i);
      return [day, `${dd.getUTCDate()}.${dd.getUTCMonth() + 1}.`];
    })
  ) as Record<Day, string>;
}
