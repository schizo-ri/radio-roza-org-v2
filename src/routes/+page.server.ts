import type { PageServerLoad } from './$types';
import { fetchPosts, mediaUrl } from '$lib/api/cms';
import { lexicalExcerpt } from '$lib/utils/lexical';
import categoriesJson from '$lib/data/categories.json';

const ALBUM_TJEDNA_ID = categoriesJson.docs.find((c) => c.slug === 'album-tjedna')?.id;

const categoryMap = new Map(
  categoriesJson.docs.map((c) => [c.id, { title: c.title, slug: c.slug }]),
);

interface MixcloudCloudcast {
  key: string;
  url: string;
  name: string;
  created_time: string;
  pictures: {
    extra_large?: string;
    '640wx640h'?: string;
    large?: string;
    medium?: string;
  };
  tags: Array<{ name: string }>;
}

interface MixcloudResponse {
  data: MixcloudCloudcast[];
}

export const load: PageServerLoad = async ({ fetch }) => {
  const [mixcloudRes, cmsRes] = await Promise.allSettled([
    fetch('https://api.mixcloud.com/RadioRoza/cloudcasts/?limit=16&metadata=1'),
    fetchPosts(fetch, { limit: 10, page: 1 }),
  ]);

  const shows =
    mixcloudRes.status === 'fulfilled' && mixcloudRes.value.ok
      ? await mixcloudRes.value.json().then((json: MixcloudResponse) =>
          json.data.map((c) => ({
            href: c.url,
            title: c.name,
            date: new Date(c.created_time).toLocaleDateString('hr-HR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            image: c.pictures['640wx640h'] ?? c.pictures.extra_large ?? c.pictures.large,
            tags: c.tags.slice(0, 3).map((t) => t.name),
            mixcloudKey: c.key,
          })),
        )
      : [];

  const allPosts =
    cmsRes.status === 'fulfilled'
      ? cmsRes.value.docs.map((post) => {
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
            image: post.heroImage?.url ? mediaUrl(post.heroImage.url) : undefined,
            excerpt: lexicalExcerpt(post.content),
            category: cat?.title ?? undefined,
            categorySlug: cat?.slug ?? undefined,
            isAlbumTjedna: catId === ALBUM_TJEDNA_ID,
          };
        })
      : [];

  const albumTjedna = allPosts.find((p) => p.isAlbumTjedna) ?? null;
  const previewPosts = allPosts.filter((p) => !p.isAlbumTjedna).slice(0, 4);
  const archivePosts = allPosts.filter((p) => !p.isAlbumTjedna).slice(4);

  return {
    shows,
    albumTjedna,
    previewPosts,
    archivePosts,
  };
};
