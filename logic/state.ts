import { useAsyncData } from '#app'
import { groupBy } from '~/logic'
import { queryContent } from '#imports'
import type { JsonParsedContent, Post, ProjectCategory } from '~/logic/types'

export const fetchProjects = () => {
  return useAsyncData('projects', () => queryContent<JsonParsedContent<ProjectCategory>>('projects').findOne())
}

export const fetchPosts = () => {
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
