// Koliko sadržaja stoji iza pojedinog taga — dijele ga `/tag` indeks i sitemap.
//
// Broje se samo izvori koje server pouzdano zna: emisije (statični podaci) i
// članci (CMS). Mixcloud arhiva se filtrira klijentski (nema pretrage po tagu),
// pa tag s nula pogodaka ovdje i dalje može imati snimke u arhivi.

import { fetchPosts } from '$lib/api/cms';
import { shows } from '$lib/data/shows';
import { normalizeTag } from '$lib/data/tags';

export interface TagHits {
  shows: number;
  articles: number;
}

export type TagHitMap = Map<string, TagHits>;

function bump(map: TagHitMap, slug: string, key: keyof TagHits) {
  const entry = map.get(slug) ?? { shows: 0, articles: 0 };
  entry[key] += 1;
  map.set(slug, entry);
}

/**
 * Mapa kanonski slug → broj pogodaka. Tagovi bez ijednog pogotka izostaju iz
 * mape (pozivatelj ih tretira kao 0). Ako CMS padne, vraćaju se samo emisije.
 */
export async function collectTagHits(fetch: typeof globalThis.fetch): Promise<TagHitMap> {
  const map: TagHitMap = new Map();

  for (const show of shows) {
    const seen = new Set<string>();
    for (const raw of show.tags) {
      const slug = normalizeTag(raw)?.slug;
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        bump(map, slug, 'shows');
      }
    }
  }

  try {
    const { docs } = await fetchPosts(fetch, { limit: 100, depth: 1 });
    for (const post of docs) {
      const seen = new Set<string>();
      for (const tag of post.tags ?? []) {
        // depth 1 vrati tagove kao objekte; goli ID-evi se preskaču.
        if (typeof tag !== 'object' || !tag?.slug) continue;
        if (seen.has(tag.slug)) continue;
        seen.add(tag.slug);
        bump(map, tag.slug, 'articles');
      }
    }
  } catch {
    // CMS nedostupan — indeks i sitemap žive dalje samo s emisijama.
  }

  return map;
}

/** Slugovi s barem jednim pogotkom, abecedno (stabilan redoslijed za sitemap). */
export function taggedSlugs(map: TagHitMap): string[] {
  return [...map.keys()].sort();
}
