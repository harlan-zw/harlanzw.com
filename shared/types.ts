import type { PageCollectionItemBase } from '@harlan-zw/comark-content'

/** Front matter this site adds on top of the fields every page collection has. */
export interface SitePage extends PageCollectionItemBase {
  h1?: boolean
  wide?: boolean
  status?: 'published' | 'sponsors-only' | 'unlisted'
  newsletter?: boolean
}

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

export interface ProjectSourceCategory {
  name: string
  icon?: string
  projects: ProjectSource[]
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
