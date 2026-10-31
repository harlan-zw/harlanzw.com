import type { MarkdownRoot, MinimarkNode } from '@harlan-zw/comark-content'
import type { SitePage } from '#shared/types'

const wordsPerMinute = 220

function collectText(node: MinimarkNode): string[] {
  if (typeof node === 'string')
    return [node]
  const children = node.slice(2) as MinimarkNode[]
  return children.flatMap(collectText)
}

export function getReadingMinutes(body: MarkdownRoot): number {
  const wordCount = body.nodes.flatMap(collectText)
    .join(' ')
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .length

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function toPostCard(post: Pick<SitePage, 'path' | 'title' | 'description' | 'publishedAt' | 'status' | 'body'>) {
  return {
    path: post.path,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    status: post.status,
    readingMinutes: getReadingMinutes(post.body),
  }
}

export function groupPostsByYear<T extends { publishedAt?: string }>(posts: T[]): Array<{ year: string, posts: T[] }> {
  const years = posts
    .filter((post): post is T & { publishedAt: string } => Boolean(post.publishedAt))
    .reduce<Record<string, T[]>>((years, post) => {
      const year = String(new Date(post.publishedAt).getFullYear())
      years[year] ??= []
      years[year].push(post)
      return years
    }, {})

  return Object.entries(years)
    .sort(([left], [right]) => Number(right) - Number(left))
    .map(([year, groupedPosts]) => ({ year, posts: groupedPosts }))
}
