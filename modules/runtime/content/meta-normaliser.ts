import type { ContentTransformer } from '@nuxt/content/dist/runtime/types'
import type { Page, Post } from '~/types'

export default <ContentTransformer> {
  name: 'meta-normaliser',
  extensions: ['.md'],
  async transform(content: Post | Page) {
    console.log(content)
    // turn the content _path to a real path
    if (content.id.includes(':pages:')) {
      content.path = content._path.replace('/pages/', '/')
      if (content.path === '/home')
        content.path = '/'
      content.renderer = 'page'
    }
    else if (content._path.startsWith('/posts/')) {
      content.path = content._path.replace('/posts/', '/blog/')
      content.renderer = 'post'
    }
    content.schemaOrg = content.schemaOrg || {}
    // if no published at / modified at is set we can infer from the storage meta
    if (!content.publishedAt) {
      content.publishedAt = content.storageMeta.atime
      content.schemaOrg.publishedAt = content.publishedAt
    }
    if (!content.modifiedAt) {
      content.modifiedAt = content.storageMeta.mtime
      content.schemaOrg.modifiedAt = content.modifiedAt
    }
    return content
  },
}
