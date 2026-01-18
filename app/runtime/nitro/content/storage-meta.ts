import type { ParsedContent } from '~/types'
import { useStorage } from '#imports'
import { prefixStorage } from 'unstorage'

const contentStorage = prefixStorage(useStorage(), 'content:source')

export async function StorageMeta(content: ParsedContent) {
  content.storageMeta = { ...(await contentStorage.getMeta(content._id)) }
  return content
}
