import type { SitePage } from '#shared/types'

export type ContentPageResult
  = | { _tag: 'Ok', page: SitePage, styles: string[] }
    | { _tag: 'NotFound', path: string }

type QueryPage = (path: string) => Promise<SitePage | null>

/**
 * Content documents are stored without a trailing slash, and every prerendered
 * payload is keyed from that bare path. Cloudflare still serves the directory
 * form, so `/blog/post/` hydrates with the key `page:/blog/post/`, misses the
 * prerendered `page:/blog/post` entry, queries a path no document owns, and
 * renders a fatal 404 from `[...all].vue`.
 */
export function normalizeContentPath(path: string): string {
  const withoutTrailingSlash = path.replace(/\/+$/, '')
  return withoutTrailingSlash || '/'
}

/**
 * The payload cache key and the content query share one normalization, so a
 * route form can never resolve to a key the prerender did not write.
 */
export function contentPageKey(path: string): string {
  return `page:${normalizeContentPath(path)}`
}

export async function resolveContentPage(path: string, queryPage: QueryPage): Promise<ContentPageResult> {
  const contentPath = normalizeContentPath(path)
  const page = await queryPage(contentPath)
  return page
    ? { _tag: 'Ok', page, styles: [] }
    : { _tag: 'NotFound', path: contentPath }
}
