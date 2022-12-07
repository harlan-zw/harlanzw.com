import { useAsyncData } from '#app'
import { queryContent } from '#imports'
import type { JsonParsedContent, Page, Post, ProjectList } from '~/types'
import { groupBy } from '~/logic'

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
