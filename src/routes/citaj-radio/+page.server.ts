import type { PageServerLoad } from './$types';
import { fetchPosts, cardImageUrl } from '$lib/api/cms';
import { lexicalExcerpt } from '$lib/utils/lexical';
import categoriesJson from '$lib/data/categories.json';

const categoryMap = new Map(
  categoriesJson.docs.map((c) => [c.id, { title: c.title, slug: c.slug }])
);

const categories = categoriesJson.docs.map((c) => ({ id: c.id, title: c.title, slug: c.slug }));

export const load: PageServerLoad = async ({ fetch, url, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300, stale-while-revalidate=3600',
  });

  const page = Math.max(1, Number(url.searchParams.get('stranica')) || 1);
  const categorySlug = url.searchParams.get('kategorija') ?? null;

  const categoryId = categorySlug
    ? categoriesJson.docs.find((c) => c.slug === categorySlug)?.id
    : undefined;

  const data = await fetchPosts(fetch, { page, limit: 9, categoryId });

  const posts = data.docs.map((post) => {
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

    return {
      href: `/citaj-radio/${post.slug}`,
      title: post.title,
      date,
      author: post.populatedAuthors[0]?.name ?? undefined,
      image: post.heroImage ? cardImageUrl(post.heroImage) : undefined,
      excerpt: lexicalExcerpt(post.content),
      category: cat?.title ?? undefined,
      categorySlug: cat?.slug ?? undefined,
    };
  });

  return {
    posts,
    categories,
    totalPages: data.totalPages,
    currentPage: data.page,
  };
};
