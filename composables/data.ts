import { fetchContentNavigation, queryContent, useAsyncData } from '#imports'
import type { JsonParsedContent, Page, Post, ProjectList } from '~/types'
import { groupBy } from '~/logic'

export function useProjects() {
  return useAsyncData('content:projects', () =>
    queryContent<JsonParsedContent<ProjectList>>('_projects').findOne())
}

export function useHeaderNav() {
  return useAsyncData('content:navigation', () => fetchContentNavigation())
}

export function usePostList() {
  return useAsyncData('content:post-partials', () => queryContent<Post>()
    .where({ _path: /blog\/*/ })
    .without(['head', 'body', 'excerpt', '_'])
    .sort({
      publishedAt: -1,
    })
    .find(), {
    // group posts by the publish year
    transform: posts => groupBy(posts, p => new Date(p.publishedAt).getFullYear()),
  })
}

export function useRoutesContent<T extends Post>(path?: string) {
  if (!path)
    path = useRoute().path
  return useAsyncData(`content:${path}`, () => queryContent<T>()
    .where({ path: new RegExp(path) })
    .without(['excerpt'])
    .findOne())
}

export const usePost = async (path?: string) => useRoutesContent<Post>(path)
export const usePage = async (path?: string) => useRoutesContent<Page>(path)
