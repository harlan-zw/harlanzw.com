import type { ParsedContent } from '~/types'

export function MetaNormaliser(content: ParsedContent) {
  // turn the content _path to a real path
  if (content._path?.startsWith('/blog/'))
    content.layout = 'post'

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
}
