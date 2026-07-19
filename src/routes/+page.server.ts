import type { PageServerLoad } from './$types';
import { fetchPosts, cardImageUrl } from '$lib/api/cms';
import { lexicalExcerpt } from '$lib/utils/lexical';
import categoriesJson from '$lib/data/categories.json';

const ALBUM_TJEDNA_ID = categoriesJson.docs.find((c) => c.slug === 'album-tjedna')?.id;

const categoryMap = new Map(
  categoriesJson.docs.map((c) => [c.id, { title: c.title, slug: c.slug }])
);

// CMS odgovara u 0.7–1.4 s; greška se guta da naslovnica preživi ispad CMS-a.
async function loadCitaj(fetch: typeof globalThis.fetch) {
  let docs: Awaited<ReturnType<typeof fetchPosts>>['docs'];
  try {
    docs = (await fetchPosts(fetch, { limit: 10, page: 1 })).docs;
  } catch {
    docs = [];
  }

  const allPosts = docs.map((post) => {
    const rawCat = post.categories[0];
    const cat =
      typeof rawCat === 'number'
        ? categoryMap.get(rawCat)
        : { title: rawCat.title, slug: rawCat.slug };

    const date = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('hr-HR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';

    const catId = typeof rawCat === 'number' ? rawCat : rawCat?.id;

    return {
      href: `/citaj-radio/${post.slug}`,
      title: post.title,
      date,
      author: post.populatedAuthors[0]?.name ?? undefined,
      image: post.heroImage ? cardImageUrl(post.heroImage) : undefined,
      excerpt: lexicalExcerpt(post.content),
      category: cat?.title ?? undefined,
      categorySlug: cat?.slug ?? undefined,
      isAlbumTjedna: catId === ALBUM_TJEDNA_ID,
    };
  });

  return {
    albumTjedna: allPosts.find((p) => p.isAlbumTjedna) ?? null,
    previewPosts: allPosts.filter((p) => !p.isAlbumTjedna).slice(0, 4),
    archivePosts: allPosts.filter((p) => !p.isAlbumTjedna).slice(4),
  };
}

export const load: PageServerLoad = async ({ fetch, setHeaders, isDataRequest }) => {
  // SSR HTML se kešira na Netlify CDN-u; dugi SWR prozor znači da i rijetki
  // posjetitelji dobiju keširanu kopiju odmah, dok se svježa verzija povlači
  // u pozadini. Mixcloud snimke se dohvaćaju klijentski pa tu ne stare.
  setHeaders({
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300, stale-while-revalidate=86400',
  });

  const citaj = loadCitaj(fetch);

  return {
    // SSR čeka postove (pun HTML za tražilice i CDN cache); klijentska
    // navigacija dobiva promise koji se streama, pa je prijelaz trenutan.
    citaj: isDataRequest ? citaj : await citaj,
  };
};
