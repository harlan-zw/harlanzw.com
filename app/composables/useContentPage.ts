import type { MaybeRefOrGetter } from 'vue'
import type { SitePage } from '#shared/types'
import { toValue } from 'vue'
import { resolveContentPage } from '../utils/content-page'

export function useContentPage(path: MaybeRefOrGetter<string>) {
  return useAsyncData(
    () => `page:${toValue(path)}`,
    () => {
      const pagePath = toValue(path)
      return resolveContentPage(
        pagePath,
        async queryPath => await queryCollection('pages').path(queryPath).first() as SitePage | null,
      )
    },
  )
}
