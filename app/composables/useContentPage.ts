import type { SitePage } from '#shared/types'
import { normalizeContentPath, resolveContentPage } from '~/utils/content-page'

export function useContentPage(path: string) {
  const contentPath = normalizeContentPath(path)
  return useAsyncData(`page:${contentPath}`, () => resolveContentPage(
    contentPath,
    async pagePath => await queryCollection('pages').path(pagePath).first() as SitePage | null,
  ))
}
