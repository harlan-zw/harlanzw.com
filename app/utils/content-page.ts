import type { SitePage } from '#shared/types'

export type ContentPageResult
  = | { _tag: 'Ok', page: SitePage, styles: string[] }
    | { _tag: 'NotFound', path: string }

type QueryPage = (path: string) => Promise<SitePage | null>

/**
 * Content documents are stored without a trailing slash, but Cloudflare serves
 * every page with one. Normalize the route path before it reaches a content
 * query or a payload cache key, otherwise `/blog/post/` misses the prerendered
 * payload keyed as `page:/blog/post` and renders a 404.
 */
export function normalizeContentPath(path: string): string {
  const withoutTrailingSlash = path.replace(/\/+$/, '')
  return withoutTrailingSlash || '/'
}

export async function resolveContentPage(path: string, queryPage: QueryPage): Promise<ContentPageResult> {
  const contentPath = normalizeContentPath(path)
  const page = await queryPage(contentPath)
  return page
    ? { _tag: 'Ok', page, styles: [] }
    : { _tag: 'NotFound', path: contentPath }
}
