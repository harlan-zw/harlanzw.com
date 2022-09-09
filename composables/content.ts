import type { MaybeRef } from '@vueuse/schema-org'
import { packMeta, unpackMeta } from '@zhead/vue'
import { useAsyncData } from '#app'
import { nextTick, queryContent, unref, useHead, watch } from '#imports'
import type { JsonParsedContent, Page, Post, ProjectList } from '~/types'
import { SiteName, groupBy } from '~/logic'

export const useProjects = () => {
  return useAsyncData('content:projects', () =>
    queryContent<JsonParsedContent<ProjectList>>('projects').findOne(),
  )
}

export const useHeaderNav = () => {
  return useAsyncData('content:navigation', () => queryContent('pages')
    .where({ nav: true })
    .only(['title', 'icon', 'path'])
    .find())
}

export const usePostList = () => {
  return useAsyncData('content:post-partials', () => queryContent<Post>()
    .where({ _path: /posts\/*/ })
    .without(['head', 'body', 'excerpt', '_'])
    .sort({
      publishedAt: -1,
    })
    .find(), {
    // group posts by the publish year
    transform: posts => groupBy(posts, p => new Date(p.publishedAt).getFullYear()),
  })
}

export const useRoutesContent = <T extends Post>(path?: string) => {
  if (!path)
    path = useRoute().path
  return useAsyncData(`content:${path}`, () => queryContent<T>()
    .where({ path: new RegExp(path) })
    .without(['excerpt'])
    .findOne(),
  )
}

export const usePost = async (path?: string) => useRoutesContent<Post>(path)
export const usePage = async (path?: string) => useRoutesContent<Page>(path)

export const useContentHead = (doc: MaybeRef<Partial<Page>>) => {
  watch(() => doc, (doc) => {
    doc = unref(doc)
    if (!doc)
      return
    const head = Object.assign({}, doc?.head || {})
    head.title = `${head.title || doc.title}`
    if (!head.title.endsWith(SiteName) && !head.title.startsWith(SiteName))
      head.title = `${head.title} - ${SiteName}`

    head.meta = head.meta || []
    const flatMeta = packMeta(head.meta)

    if (!flatMeta.ogTitle)
      flatMeta.ogTitle = head.title

    if (doc.description && !flatMeta.description)
      flatMeta.description = doc.description

    if (flatMeta.description)
      flatMeta.ogDescription = flatMeta.description

    if (head.image && !flatMeta.ogImage)
      flatMeta.ogImage = head.image

    head.meta = unpackMeta(flatMeta)

    if (process.client)
      nextTick(() => useHead(head))
    else
      useHead(head)
  }, {
    immediate: true,
  })
}
