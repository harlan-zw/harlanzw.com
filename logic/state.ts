import type {ParsedContent} from '@nuxt/content/dist/runtime/types'
import { queryContent } from '#imports'

export interface ArticleCard extends ParsedContent {
  description: string
}

export const articleQuery = queryContent<ArticleCard>('articles')
export const articleCardQuery = articleQuery.without(['head'])
