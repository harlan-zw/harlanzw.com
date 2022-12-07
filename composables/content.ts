import { useAsyncData } from '#app'
import { queryContent } from '#imports'
import type { JsonParsedContent, Page, Post, ProjectList } from '~/types'

export const useProjects = () => {
  return useAsyncData('content:projects', () =>
    queryContent<JsonParsedContent<ProjectList>>('_projects').findOne(),
  )
}

export const usePost = async (path?: string) => useRoutesContent<Post>(path)
export const usePage = async (path?: string) => useRoutesContent<Page>(path)
