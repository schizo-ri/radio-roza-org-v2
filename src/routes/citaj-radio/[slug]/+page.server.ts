import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { fetchPostBySlug, mediaUrl } from '$lib/api/cms'
import { lexicalToHtml } from '$lib/utils/lexical'
import categoriesJson from '$lib/data/categories.json'

const categoryMap = new Map(
  categoriesJson.docs.map((c) => [c.id, { title: c.title, slug: c.slug }]),
)

export const load: PageServerLoad = async ({ fetch, params }) => {
  const post = await fetchPostBySlug(fetch, params.slug)
  if (!post) error(404, 'Članak nije pronađen')

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : ''

  const cats = post.categories.map((rawCat) =>
    typeof rawCat === 'number'
      ? categoryMap.get(rawCat)
      : { title: rawCat.title, slug: rawCat.slug },
  ).filter(Boolean) as { title: string; slug: string }[]

  const related = post.relatedPosts
    .filter((r): r is Exclude<typeof r, number> => typeof r !== 'number')
    .map((r) => ({
      href: `/citaj-radio/${r.slug}`,
      title: r.title,
      date: r.publishedAt
        ? new Date(r.publishedAt).toLocaleDateString('hr-HR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : '',
      image: r.heroImage && typeof r.heroImage !== 'number' ? mediaUrl(r.heroImage.url) : undefined,
    }))

  return {
    article: {
      title: post.title,
      date,
      author: post.populatedAuthors[0]?.name ?? undefined,
      image: post.heroImage?.url ? mediaUrl(post.heroImage.url) : undefined,
      imageAlt: post.heroImage?.alt ?? post.title,
      categories: cats,
      contentHtml: lexicalToHtml(post.content),
    },
    related,
  }
}
