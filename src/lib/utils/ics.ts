import { blocks, program, type Day, type Show } from './program';
import { DAYS_ORDER, stationDateAtNoonUTC, stationMinutes, stationWeekday } from './time';

// Mora odgovarati VTIMEZONE bloku dolje
const TZID = 'Europe/Zagreb';

const BYDAY: Record<Day, string> = {
  Monday: 'MO',
  Tuesday: 'TU',
  Wednesday: 'WE',
  Thursday: 'TH',
  Friday: 'FR',
  Saturday: 'SA',
  Sunday: 'SU',
};

const WEEK_MINUTES = 7 * 24 * 60;

const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  `TZID:${TZID}`,
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0200',
  'TZNAME:CEST',
  'DTSTART:19700329T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0100',
  'TZNAME:CET',
  'DTSTART:19701025T030000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
];

function parseMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** Minuta u tjednu, ponedjeljak 00:00 = 0. */
function weekMinute(day: Day, hhmm: string): number {
  return DAYS_ORDER.indexOf(day) * 1440 + parseMinutes(hhmm);
}

// Emisije u rasporedu nemaju eksplicitni kraj — blok traje do sljedeće emisije
// u tjednom redoslijedu (i preko ponoći / preko kraja tjedna).
function durationMinutes(show: Show): number {
  const start = weekMinute(show.day, show.show_start);
  let best = Infinity;
  for (const other of program) {
    const delta = (weekMinute(other.day, other.show_start) - start + WEEK_MINUTES) % WEEK_MINUTES;
    if (delta > 0 && delta < best) best = delta;
  }
  return Number.isFinite(best) ? best : 60;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** "YYYYMMDDTHHMM00" — lokalno (zidno) vrijeme uz TZID, iz noon-UTC datuma + minuta u danu. */
function fmtLocal(date: Date, minutes: number): string {
  const y = date.getUTCFullYear();
  const mo = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mi = String(minutes % 60).padStart(2, '0');
  return `${y}${mo}${d}T${h}${mi}00`;
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

const encoder = new TextEncoder();

// RFC 5545 traži lomljenje linija na 75 okteta; nastavak počinje razmakom.
// Brojimo oktete po znaku jer je dijakritika u UTF-8 dvobajtna.
function foldLine(line: string): string {
  const out: string[] = [];
  let cur = '';
  let bytes = 0;
  for (const ch of line) {
    const b = encoder.encode(ch).length;
    if (bytes + b > 73) {
      out.push(cur);
      cur = ' ';
      bytes = 1;
    }
    cur += ch;
    bytes += b;
  }
  out.push(cur);
  return out.join('\r\n');
}

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildShowIcs(show: Show): string {
  const base = stationDateAtNoonUTC();
  const todayIdx = DAYS_ORDER.indexOf(stationWeekday());
  const targetIdx = DAYS_ORDER.indexOf(show.day);

  // Prva pojava: sljedeći takav dan u tjednu; danas vrijedi samo ako termin nije prošao
  let ahead = (targetIdx - todayIdx + 7) % 7;
  if (ahead === 0 && parseMinutes(show.show_start) <= stationMinutes()) ahead = 7;

  const startDate = addDays(base, ahead);
  const startMin = parseMinutes(show.show_start);
  const endTotal = startMin + durationMinutes(show);
  const endDate = addDays(startDate, Math.floor(endTotal / 1440));
  const endMin = endTotal % 1440;

  const dtstamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  const description = blocks.find((b) => b.title === show.title)?.description;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Radio Roža//program//HR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...VTIMEZONE,
    'BEGIN:VEVENT',
    `UID:${slugify(show.title)}-${BYDAY[show.day].toLowerCase()}-${show.show_start.replace(':', '')}@radio-roza.org`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${TZID}:${fmtLocal(startDate, startMin)}`,
    `DTEND;TZID=${TZID}:${fmtLocal(endDate, endMin)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${BYDAY[show.day]}`,
    `SUMMARY:${escapeText(show.title)}`,
    ...(description ? [`DESCRIPTION:${escapeText(description)}`] : []),
    'URL:https://radio-roza.org/program',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.map(foldLine).join('\r\n') + '\r\n';
}

export function downloadShowIcs(show: Show) {
  const blob = new Blob([buildShowIcs(show)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `radio-roza-${slugify(show.title)}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
