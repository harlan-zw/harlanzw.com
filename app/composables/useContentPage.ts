import type { SitePage } from '#shared/types'
import { resolveContentPage } from '~/utils/content-page'

export function useContentPage(path: string) {
  return useAsyncData(`page:${path}`, () => resolveContentPage(
    path,
    async pagePath => await queryCollection('pages').path(pagePath).first() as SitePage | null,
  ))
}
