import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { queryContent, useAsyncData } from '#imports'
import { groupBy } from '~/logic'

export interface Post extends ParsedContent {
  description: string
  published: string
  publishedDate: Date
}

export interface JsonParsedContent<T> extends ParsedContent {
  body: T
}

export interface ProjectCategory extends ParsedContent {
  name: string
  packages: {
    name: string
    description: string
    link: string
  }[]
}

export const articleQuery = queryContent<Post>('posts')

export const fetchProjects = () => {
  return useAsyncData('projects', () => queryContent<JsonParsedContent<ProjectCategory>>('projects').findOne())
}

export const fetchPosts = () => {
  return useAsyncData('posts', () => articleQuery
    .without(['head', 'body', 'excerpt'])
    .sort({
      published: -1,
    })
    .find(), {
    transform: (posts) => {
      posts = posts
        .map((p) => {
          p.publishedDate = new Date(p.published)
          return p
        })
      // group the posts by the publish year
      return groupBy(posts, p => p.publishedDate.getFullYear())
    },
  })
}

export const fetchPost = async (slug: string) => {
  return useAsyncData(`post-${slug}`, () => queryContent<Post>(slug)
    .without(['excerpt'])
    .sort({
      published: -1,
    })
    .findOne(), {
    transform: (post) => {
      post.publishedDate = new Date(post.published)
      return post
    },
  })
}
