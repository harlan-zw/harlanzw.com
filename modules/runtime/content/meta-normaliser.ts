import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export default {
  name: 'meta-normaliser',
  extentions: ['.*'],
  async transform(content: ParsedContent) {
    if (content.publishedAt)
      content.publishedAt = new Date(content.publishedAt)
    if (!content.publishedAt)
      content.publishedAt = new Date()
    if (content.updatedAt)
      content.updatedAt = new Date(content.updatedAt)
    return content
  },
}
