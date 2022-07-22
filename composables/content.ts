import { useAsyncData } from '#app'
import type { MaybeRef } from '@vueuse/schema-org'
import { nextTick, queryContent, unref, useHead } from '#imports'
import type { JsonParsedContent, Page, Post, ProjectList } from '~/types'
import { SiteName, groupBy } from '~/logic'

export const useProjects = () => {
  return useAsyncData('content:projects', () =>
    queryContent<JsonParsedContent<ProjectList>>('projects').findOne(),
  )
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

export const addHead = (doc: MaybeRef<Partial<Page>>) => {
  doc = unref(doc)
  if (!doc)
    return
  const head = Object.assign({}, doc?.head || {})
  head.title = `${head.title || doc.title} - ${SiteName}`
  head.meta = head.meta || []
  const description = head.description || doc.description
  if (description && head.meta.filter(m => m.name === 'description').length === 0) {
    head.meta.push({
      name: 'description',
      content: description,
    })
  }
  if (head.image && head.meta.filter(m => m.property === 'og:image').length === 0) {
    head.meta.push({
      property: 'og:image',
      content: head.image,
    })
  }
  if (process.client)
    nextTick(() => useHead(head))
  else
    useHead(head)
  return {
    title: head.title,
    description: head.description,
    image: head.image,
  }
}
