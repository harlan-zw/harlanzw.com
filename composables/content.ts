import { useAsyncData } from '#app'
import type { MaybeRef } from '@vueuse/schema-org'
import { nextTick, queryContent, unref, useHead } from '#imports'
import type { JsonParsedContent, ParsedContent, Post, ProjectCategory } from '~/types'
import { AppName, groupBy } from '~/logic'

export const useProjects = () => {
  return useAsyncData('projects', () => queryContent<JsonParsedContent<ProjectCategory>>('projects').findOne())
}

export const usePostList = () => {
  return useAsyncData('posts', () => queryContent<Post>('posts')
    .without(['head', 'body', 'excerpt'])
    .sort({
      publishedAt: -1,
    })
    .find(), {
    transform: (posts) => {
      posts = posts
        .map((p) => {
          p.publishedAt = new Date(p.publishedAt)
          return p
        })
      // group the posts by the publish year
      return groupBy(posts, p => p.publishedAt.getFullYear())
    },
  })
}

export const usePost = async (slug: string) => {
  return useAsyncData(`post-${slug}`, () => queryContent<Post>(slug)
    .without(['excerpt'])
    .sort({
      published: -1,
    })
    .findOne(), {
    transform: (post) => {
      post.publishedAt = new Date(post.publishedAt)
      return post
    },
  })
}

export const usePage = async (slug: string) => {
  return useAsyncData(`page-${slug}`, () => queryContent<ParsedContent>(slug)
    .without(['excerpt'])
    .findOne())
}

export const addHead = (doc: MaybeRef<Partial<ParsedContent>>) => {
  doc = unref(doc)
  if (!doc?.head)
    return
  const head = Object.assign({}, doc.head)
  head.title = `${head.title || doc.title} - ${AppName}`
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
}
