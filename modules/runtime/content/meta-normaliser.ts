import type { ContentTransformer } from '@nuxt/content/dist/runtime/types'
import type { Post } from '~/logic'

export default <ContentTransformer> {
  name: 'meta-normaliser',
  extentions: ['.md'],
  async transform(content: Post) {
    // if no published at / modified at is set we can infer from the storage meta
    if (!content.publishedAt)
      content.publishedAt = content.storageMeta.atime
    if (!content.modifiedAt)
      content.modifiedAt = content.storageMeta.mtime
    return content
  },
}
