import { visit } from 'unist-util-visit'
import type { MarkdownNode } from '@nuxt/content/dist/runtime/types'
import type { ParsedContent } from '~/types'

export function OgImage(content: ParsedContent) {
  content.ogImage = content.ogImage || {}
  if (content.ogImage.image)
    return content
  // get first img
  visit(
    content.body,
    (node: MarkdownNode) => node?.tag === 'img',
    (node: MarkdownNode) => {
      if (node?.props?.src && !content.ogImage.image)
        content.ogImage = { image: node.props.src }
    },
  )
  return content
}
