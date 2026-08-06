// Kanonski rječnik tagova — jedan izvor istine za normalizaciju i slugove.
//
// Tagovi dolaze iz četiri nepovezana izvora s neujednačenim zapisom:
//  - članci (roza-cms `tags` kolekcija, seedana iz OVOG popisa),
//  - emisije (`$lib/data/shows`),
//  - blokovi programa (`$lib/utils/program`),
//  - Mixcloud arhiva (živo, van naše kontrole).
//
// Odluke: žanrovi u engleskom Title Case po uzoru na Mixcloud; teme i mjesta na
// hrvatskom. Kolekcija u CMS-u je plosnata (samo title + slug) — `kind` ovdje
// služi samo za grupiranje u prikazu na frontendu.

export type TagKind = 'genre' | 'theme' | 'place';

export interface CanonicalTag {
  title: string;
  slug: string;
  kind: TagKind;
}

/**
 * Slug pravilo: lowercase → skini dijakritike (đ→d) → sve što nije [a-z0-9] u
 * '-' → sažmi ponovljene/rubne '-'. Isto pravilo koristi seed skripta u roza-cms.
 *   'Hip Hop' → 'hip-hop', 'Drum & Bass' → 'drum-bass', 'Šlager' → 'slager'.
 */
export function slugifyTag(input: string): string {
  return input
    .toLocaleLowerCase('hr')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// [title, kind] — slug se izvodi iz naslova da se izbjegnu greške.
const CANONICAL: ReadonlyArray<readonly [string, TagKind]> = [
  // — Žanrovi (EN, Title Case) —
  ['Pop', 'genre'],
  ['Rock', 'genre'],
  ['Alternative', 'genre'],
  ['Indie', 'genre'],
  ['Indie Rock', 'genre'],
  ['Grunge', 'genre'],
  ['Punk', 'genre'],
  ['Post-Punk', 'genre'],
  ['Noise', 'genre'],
  ['Metal', 'genre'],
  ['Heavy Metal', 'genre'],
  ['Hard Rock', 'genre'],
  ['Doom', 'genre'],
  ['Sludge', 'genre'],
  ['Hip Hop', 'genre'],
  ['Rap', 'genre'],
  ['R&B', 'genre'],
  ['Soul', 'genre'],
  ['Funk', 'genre'],
  ['Disco', 'genre'],
  ['Post-Disco', 'genre'],
  ['Jazz', 'genre'],
  ['Bossa Nova', 'genre'],
  ['Latin', 'genre'],
  ['Reggae', 'genre'],
  ['Dub', 'genre'],
  ['Dubstep', 'genre'],
  ['Roots', 'genre'],
  ['Electronic', 'genre'],
  ['Electro', 'genre'],
  ['House', 'genre'],
  ['Techno', 'genre'],
  ['Minimal', 'genre'],
  ['Ambient', 'genre'],
  ['Chillout', 'genre'],
  ['Downtempo', 'genre'],
  ['Lo-fi', 'genre'],
  ['Drum & Bass', 'genre'],
  ['Jungle', 'genre'],
  ['Breakbeat', 'genre'],
  ['Bass', 'genre'],
  ['Dance', 'genre'],
  ['Industrial', 'genre'],
  ['Glitch', 'genre'],
  ['Experimental', 'genre'],
  ['Avant-garde', 'genre'],
  ['World Music', 'genre'],
  ['Ethno', 'genre'],
  ['Folk', 'genre'],
  ['Traditional', 'genre'],
  ['Afrobeat', 'genre'],
  ['Šlager', 'genre'],
  ['Oldies', 'genre'],
  ['Retro', 'genre'],
  ['Live', 'genre'],
  ['Mixtape', 'genre'],
  ['Guest Mix', 'genre'],
  ['Eclectic', 'genre'],
  // — Teme (HR) —
  ['Kultura', 'theme'],
  ['Zajednica', 'theme'],
  ['Edukacija', 'theme'],
  ['Ljudska prava', 'theme'],
  ['Mladi', 'theme'],
  ['Inkluzija', 'theme'],
  ['Intervju', 'theme'],
  ['Povijest', 'theme'],
  ['Zdravlje', 'theme'],
  ['Seks', 'theme'],
  ['Životinje', 'theme'],
  ['Videoigre', 'theme'],
  ['Umjetnost', 'theme'],
  ['Poezija', 'theme'],
  ['Vijesti', 'theme'],
  ['Kazalište', 'theme'],
  // — Mjesto / identitet (HR) —
  ['Rijeka', 'place'],
  ['Ri Rock', 'place'],
  ['Domaći', 'place'],
  ['Hrvatska', 'place'],
  ['Ex-Yu', 'place'],
  ['Balkan', 'place'],
  ['Bliski istok', 'place'],
];

export const canonicalTags: CanonicalTag[] = CANONICAL.map(([title, kind]) => ({
  title,
  kind,
  slug: slugifyTag(title),
}));

const bySlug = new Map(canonicalTags.map((t) => [t.slug, t]));

/**
 * Aliasi: slugificiran sirovi zapis → kanonski slug. Ovdje su samo slučajevi
 * gdje se sirovi slug ne poklapa s kanonskim (npr. 'tehno' → 'techno'). Zapisi
 * koji se već slugificiraju u kanonski slug (npr. 'Hip-Hop' → 'hip-hop') ne
 * trebaju alias.
 */
const ALIASES: Record<string, string> = {
  // žanrovi
  tehno: 'techno',
  etno: 'ethno',
  'drum-n-bass': 'drum-bass', // "Drum'n'bass"
  // teme
  culture: 'kultura',
  educational: 'edukacija',
  'human-rights': 'ljudska-prava',
  youth: 'mladi',
  interview: 'intervju',
  history: 'povijest',
  health: 'zdravlje',
  sex: 'seks',
  animals: 'zivotinje',
  inclusion: 'inkluzija',
  art: 'umjetnost',
  poetry: 'poezija',
  theater: 'kazaliste',
  news: 'vijesti',
  info: 'vijesti',
  games: 'videoigre',
  'video-games': 'videoigre',
  // "flavor" opisi koje spajamo u Eclectic umjesto da ih bacimo
  mixed: 'eclectic',
  varied: 'eclectic',
  // mjesto / identitet
  croatia: 'hrvatska',
  yugo: 'ex-yu',
  'middle-east': 'bliski-istok',
};

/**
 * Ne-taksonomske "flavor" riječi iz opisa programskih blokova — namjerno se
 * odbacuju (nisu tagovi za pretragu/povezivanje). Vraćaju `null` iz normalizeTag.
 */
const DROPPED = new Set<string>([
  'rhythm',
  'groove',
  'energetic',
  'cosmic',
  'raw',
  'surprise',
  'digital',
  'vintage',
  'nostalgia',
  'interactive',
  'listener-request',
  'mix',
  'dj',
  'underground',
  'synth',
  'music',
  'talk',
  'spoken-word',
  'storytelling',
]);

/**
 * Mapira bilo koji sirovi tag (iz statičnih podataka ili s Mixclouda) na kanonski
 * tag. Vraća `null` za odbačene ili nepoznate tagove (pozivatelj tad prikaže
 * sirovi tag bez linka, ili ga preskoči).
 */
export function normalizeTag(raw: string): CanonicalTag | null {
  const s = slugifyTag(raw);
  if (!s) return null;
  const direct = bySlug.get(s);
  if (direct) return direct;
  const aliased = ALIASES[s];
  if (aliased) return bySlug.get(aliased) ?? null;
  return null;
}

/** Kanonski tag po slugu (za /tag/[slug] rute). */
export function tagBySlug(slug: string): CanonicalTag | null {
  return bySlug.get(slug) ?? null;
}

/**
 * Normalizira listu sirovih tagova: mapira na kanonske, izbacuje null-ove i
 * deduplicira po slugu (čuva redoslijed prvog pojavljivanja).
 */
export function normalizeTags(raw: string[]): CanonicalTag[] {
  const out: CanonicalTag[] = [];
  const seen = new Set<string>();
  for (const r of raw) {
    const t = normalizeTag(r);
    if (t && !seen.has(t.slug)) {
      seen.add(t.slug);
      out.push(t);
    }
  }
  return out;
}

/** Je li slug namjerno odbačen (za dev-audit; runtime ga tretira kao null). */
export function isDroppedTag(raw: string): boolean {
  return DROPPED.has(slugifyTag(raw));
}

// — Prikaz —

export interface TagChip {
  label: string;
  href?: string;
  slug?: string;
}

/** URL tag stranice za dani slug. */
export function tagHref(slug: string): string {
  return `/tag/${slug}`;
}

/**
 * Chipovi za KURIRANE izvore (emisije, program, članci): normalizira, izbacuje
 * nepoznate/odbačene, deduplicira. Svaki chip vodi na svoju tag stranicu.
 */
export function tagChips(raw: string[]): TagChip[] {
  return normalizeTags(raw).map((t) => ({
    label: t.title,
    slug: t.slug,
    href: tagHref(t.slug),
  }));
}

/**
 * Chipovi za NEKONTROLIRANE izvore (Mixcloud): poznate tagove prikaže kanonski i
 * linka na tag stranicu; nepoznate zadrži kao obični label bez linka.
 */
export function tagChipsKeepUnknown(raw: string[]): TagChip[] {
  const out: TagChip[] = [];
  const seen = new Set<string>();
  for (const r of raw) {
    const c = normalizeTag(r);
    if (c) {
      const key = `k:${c.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ label: c.title, slug: c.slug, href: tagHref(c.slug) });
    } else {
      const label = r.trim();
      const key = `u:${label.toLocaleLowerCase('hr')}`;
      if (!label || seen.has(key)) continue;
      seen.add(key);
      out.push({ label });
    }
  }
  return out;
}
