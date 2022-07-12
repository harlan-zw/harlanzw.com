import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Post extends ParsedContent {
  description: string
  published: string
  publishedDate: Date
}

export interface JsonParsedContent<T> extends ParsedContent {
  body: T
}

export interface Project {
  name: string
  description: string
  link: string
  icon?: string
}

export interface ProjectCategory extends ParsedContent {
  name: string
  projects: Project[]
}
