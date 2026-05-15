const CMS_BASE = 'https://cms.radio-roza.org'

export interface CmsMedia {
  id: number
  url: string
  alt: string | null
  sizes: {
    thumbnail?: { url: string | null }
    square?: { url: string | null }
    small?: { url: string | null }
    medium?: { url: string | null }
    og?: { url: string | null }
  }
}

export interface CmsCategory {
  id: number
  title: string
  slug: string
}

export interface LexicalNode {
  type: string
  version: number
  [key: string]: unknown
}

export interface LexicalContent {
  root: { children: LexicalNode[] }
}

export interface CmsPost {
  id: number
  title: string
  slug: string
  publishedAt: string | null
  updatedAt: string
  heroImage: CmsMedia | null
  content: LexicalContent
  categories: (number | CmsCategory)[]
  populatedAuthors: { id: number; name: string | null }[]
  relatedPosts: (number | CmsPost)[]
  _status: 'published' | 'draft'
}

export interface PostsResponse {
  docs: CmsPost[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

export function mediaUrl(path: string): string {
  if (path.startsWith('http')) return path
  return CMS_BASE + path
}

export async function fetchPosts(
  fetch: typeof globalThis.fetch,
  opts: { page?: number; limit?: number; categoryId?: number } = {},
): Promise<PostsResponse> {
  const params = new URLSearchParams({
    depth: '1',
    limit: String(opts.limit ?? 10),
    page: String(opts.page ?? 1),
    sort: '-publishedAt',
  })
  if (opts.categoryId) {
    params.set('where[categories][in]', String(opts.categoryId))
  }
  const res = await fetch(`${CMS_BASE}/api/posts?${params}`)
  if (!res.ok) throw new Error(`CMS error: ${res.status}`)
  return res.json()
}

export async function fetchPostBySlug(
  fetch: typeof globalThis.fetch,
  slug: string,
): Promise<CmsPost | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    depth: '2',
    limit: '1',
  })
  const res = await fetch(`${CMS_BASE}/api/posts?${params}`)
  if (!res.ok) return null
  const data: PostsResponse = await res.json()
  return data.docs[0] ?? null
}
