import type { LexicalContent, LexicalNode } from '$lib/api/cms'

const CMS_BASE = 'https://cms.radio-roza.org'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderText(node: LexicalNode): string {
  let text = escapeHtml((node.text as string) ?? '')
  const format = (node.format as number) ?? 0
  if (format & 1) text = `<strong>${text}</strong>`
  if (format & 2) text = `<em>${text}</em>`
  if (format & 4) text = `<s>${text}</s>`
  if (format & 8) text = `<u>${text}</u>`
  if (format & 16) text = `<code>${text}</code>`
  return text
}

function renderChildren(children: LexicalNode[]): string {
  return children.map(renderNode).join('')
}

function renderNode(node: LexicalNode): string {
  const children = (node.children as LexicalNode[] | undefined) ?? []

  switch (node.type) {
    case 'text':
      return renderText(node)

    case 'linebreak':
      return '<br>'

    case 'paragraph':
      return `<p>${renderChildren(children)}</p>`

    case 'heading': {
      const tag = (node.tag as string) ?? 'h2'
      return `<${tag}>${renderChildren(children)}</${tag}>`
    }

    case 'link': {
      const fields = node.fields as { url?: string; linkType?: string } | undefined
      const href = fields?.url ? escapeHtml(fields.url) : '#'
      const external = fields?.linkType === 'custom' ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${external}>${renderChildren(children)}</a>`
    }

    case 'list': {
      const tag = (node.listType as string) === 'number' ? 'ol' : 'ul'
      return `<${tag}>${renderChildren(children)}</${tag}>`
    }

    case 'listitem':
      return `<li>${renderChildren(children)}</li>`

    case 'horizontalrule':
      return '<hr>'

    case 'quote':
      return `<blockquote>${renderChildren(children)}</blockquote>`

    case 'block': {
      const fields = node.fields as Record<string, unknown> | undefined
      const blockType = fields?.blockType as string | undefined

      if (blockType === 'mediaBlock') {
        const media = fields?.media as { url?: string; alt?: string | null } | undefined
        if (media?.url) {
          const src = escapeHtml(
            media.url.startsWith('http') ? media.url : CMS_BASE + media.url,
          )
          return `<figure><img src="${src}" alt="${escapeHtml(media.alt ?? '')}" /></figure>`
        }
      }

      if (blockType === 'banner') {
        const style = (fields?.style as string) ?? 'info'
        const content = fields?.content as LexicalContent | undefined
        const inner = content ? lexicalToHtml(content) : ''
        return `<div class="banner banner--${escapeHtml(style)}">${inner}</div>`
      }

      if (blockType === 'code') {
        const code = escapeHtml((fields?.code as string) ?? '')
        const lang = escapeHtml((fields?.language as string) ?? '')
        return `<pre><code class="language-${lang}">${code}</code></pre>`
      }

      return ''
    }

    default:
      return renderChildren(children)
  }
}

export function lexicalToHtml(content: LexicalContent): string {
  return content.root.children.map(renderNode).join('')
}

export function lexicalExcerpt(content: LexicalContent, maxLength = 220): string {
  function extractText(node: LexicalNode): string {
    if (node.type === 'text') return (node.text as string) ?? ''
    if (node.type === 'linebreak') return ' '
    const children = node.children as LexicalNode[] | undefined
    return children ? children.map(extractText).join('') : ''
  }

  for (const node of content.root.children) {
    if (node.type === 'paragraph') {
      const text = extractText(node).trim()
      if (text) {
        return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '…' : text
      }
    }
  }
  return ''
}
