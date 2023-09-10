import { queryContent, useAsyncData } from '#imports'
import type { Post } from '~/types'

export function groupBy<T extends {}>(values: T[], fn: (v: T) => any) {
  return values.reduce((rv, x) => {
    (rv[fn(x)] = rv[fn(x)] || []).push(x)
    return rv
  }, {})
}

export interface UsePostsOptions {
  limit: number
  offset: number | string
  category: string
  sort: string
}
export function usePosts(options?: UsePostsOptions) {
  return useAsyncData('content:post-partials', () => queryContent<Post>('blog/')
    .only(['_path', 'description', 'title', 'publishedAt', 'readingMins', 'status', 'tags', 'publishOn'])
    .sort({
      publishedAt: -1,
    })
    .where({
      newsletter: {
        $eq: false,
      },
    })
    .limit(options?.limit || 10)
    .find(), {
    // group posts by the publish year
    transform: (posts) => {
      posts = posts.filter(p => p.publishedAt)
      return groupBy(posts, p => new Date(p.publishedAt).getFullYear())
    },
  })
}

export function useNewsletterPosts(options?: UsePostsOptions) {
  return useAsyncData('content:newsletter-partials', () => queryContent<Post>('blog/')
    .only(['_path', 'description', 'title', 'publishedAt', 'readingMins', 'status', 'tags', 'publishOn'])
    .sort({
      publishedAt: -1,
    })
    .where({
      newsletter: {
        $eq: true,
      },
    })
    .limit(options?.limit || 10)
    .find(), {
    // group posts by the publish year
    transform: (posts) => {
      posts = posts.filter(p => p.publishedAt)
      return groupBy(posts, p => new Date(p.publishedAt).getFullYear())
    },
  })
}
