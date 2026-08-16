import type { SitePage } from '#shared/types'

export type ContentPageResult
  = | { _tag: 'Ok', page: SitePage, styles: string[] }
    | { _tag: 'NotFound', path: string }

type QueryPage = (path: string) => Promise<SitePage | null>

export async function resolveContentPage(path: string, queryPage: QueryPage): Promise<ContentPageResult> {
  const page = await queryPage(path)
  return page
    ? { _tag: 'Ok', page, styles: [] }
    : { _tag: 'NotFound', path }
}
