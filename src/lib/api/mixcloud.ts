// Mixcloud arhiva — dijele je /api/arhiva endpoint i pretraga.
//
// Mixcloud ne gzipa svoje odgovore: jedna stranica od 100 snimki je ~415 KB.
// Zato se sirovi odgovor nikad ne šalje pregledniku, nego se ovdje sasječe na
// polja koja frontend stvarno koristi.

const API_BASE = 'https://api.mixcloud.com/RadioRoza/cloudcasts/';

const PAGE_SIZE = 100;

/** Tri stranice = 300 najnovijih snimki. */
const MAX_PAGES = 3;

interface MixcloudCloudcast {
  key: string;
  url: string;
  name: string;
  created_time: string;
  pictures?: { extra_large?: string; '640wx640h'?: string; large?: string };
  tags?: Array<{ name: string }>;
}

interface MixcloudPage {
  data: MixcloudCloudcast[];
  paging?: { next?: string };
}

export interface ArchiveHit {
  key: string;
  url: string;
  title: string;
  image?: string;
  date: string;
  tags: string[];
}

function toHit(c: MixcloudCloudcast): ArchiveHit {
  return {
    key: c.key,
    url: c.url,
    title: c.name,
    image: c.pictures?.['640wx640h'] ?? c.pictures?.extra_large ?? c.pictures?.large,
    date: new Date(c.created_time).toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    tags: (c.tags ?? []).map((t) => t.name),
  };
}

/**
 * Najnovijih MAX_PAGES × PAGE_SIZE snimki, sasječenih na ArchiveHit.
 *
 * Mixcloud stranica ide kroz kursor, pa se zahtjevi moraju nizati serijski —
 * ali na serveru, jednom po CDN prozoru, umjesto u svakom pregledniku.
 * Ako neka stranica padne, vraća se ono što je dotad prikupljeno.
 */
export async function fetchArchive(fetch: typeof globalThis.fetch): Promise<ArchiveHit[]> {
  const hits: ArchiveHit[] = [];
  let next: string | null = `${API_BASE}?limit=${PAGE_SIZE}`;

  for (let i = 0; i < MAX_PAGES && next; i++) {
    const res: Response = await fetch(next);
    if (!res.ok) break;

    const page: MixcloudPage = await res.json();
    for (const c of page.data) hits.push(toHit(c));

    next = page.paging?.next ?? null;
  }

  return hits;
}

// --- klijentska strana ---

let cache: ArchiveHit[] | null = null;
let inflight: Promise<ArchiveHit[]> | null = null;

/**
 * Arhiva s /api/arhiva, jednom po učitavanju stranice.
 *
 * Dijele je pretraga i /tag/[slug], a oba mogu tražiti isti popis više puta
 * (otvaranje pretrage, skok s taga na tag). Bez ovoga bi svaki put išao novi
 * zahtjev; HTTP keš bi ga uglavnom pokrio, ali ne i dva poziva u istom trenu.
 */
export function loadArchive(): Promise<ArchiveHit[]> {
  if (cache) return Promise.resolve(cache);

  inflight ??= fetch('/api/arhiva')
    .then((r) => (r.ok ? r.json() : { archive: [] }))
    .then((j: { archive: ArchiveHit[] }) => {
      cache = j.archive;
      return cache;
    })
    .catch(() => [] as ArchiveHit[])
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
