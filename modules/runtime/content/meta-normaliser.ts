import type { ContentTransformer } from '@nuxt/content/dist/runtime/types'
import type { Post } from '~/types'

export default <ContentTransformer> {
  name: 'meta-normaliser',
  extentions: ['.md'],
  async transform(content: Post) {
    // fix paths
    if (content._path.startsWith('/pages/'))
      content.slug = content._path.replace('/pages/', '')
    if (content._path.startsWith('/posts/'))
      content.slug = content._path.replace('/posts/', '')
    // if no published at / modified at is set we can infer from the storage meta
    if (!content.publishedAt)
      content.publishedAt = content.storageMeta.atime
    if (!content.modifiedAt)
      content.modifiedAt = content.storageMeta.mtime
    return content
  },
}
