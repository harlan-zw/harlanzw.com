import { useAsyncData } from '#app'
import type { MaybeRef } from '@vueuse/schema-org'
import { nextTick, queryContent, unref, useHead } from '#imports'
import type { JsonParsedContent, Page, Post, ProjectCategory } from '~/types'
import { SiteName, groupBy } from '~/logic'

export const useProjects = () => {
  return useAsyncData('projects', () => queryContent<JsonParsedContent<ProjectCategory>>('projects').findOne())
}

export const usePostList = () => {
  return useAsyncData('posts', () => queryContent<Post>('posts')
    .without(['head', 'body', 'excerpt', '_'])
    .sort({
      publishedAt: -1,
    })
    .find(), {
    transform: posts => groupBy(posts, p => new Date(p.publishedAt).getFullYear()),
  })
}

export const usePost = async (slug: string) => {
  return useAsyncData(`post-${slug}`, () => queryContent<Post>(slug)
    .without(['excerpt'])
    .sort({
      publishedAt: -1,
    })
    .findOne())
}

export const usePage = async (slug: string) => {
  return useAsyncData(`page-${slug}`, () => queryContent<Page>(slug)
    .without(['excerpt'])
    .findOne(),
  )
}

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
