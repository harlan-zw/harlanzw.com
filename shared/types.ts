import type { PagesCollectionItem } from '@nuxt/content'

export type SitePage = PagesCollectionItem

export interface ProjectSource {
  name: string
  repo: string
  icon?: string
}

export interface Project extends ProjectSource {
  description: string
  stars: number
}

export interface ProjectCategory {
  name: string
  icon?: string
  projects: Project[]
}

export type ProjectsResult
  = | { _tag: 'Ok', categories: ProjectCategory[], totalStars: number }
    | { _tag: 'Degraded', categories: ProjectCategory[], totalStars: number, failedRepos: string[] }

interface TweetData {
  id: string
  text: string
  createdAt: string
  favoriteCount: number
  replyCount: number
  user: {
    name: string
    screenName: string
    avatarUrl: string
  }
}

export type TweetResult
  = | { _tag: 'Ok', tweet: TweetData }
    | { _tag: 'Err', reason: string }
