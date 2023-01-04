import { visit } from 'unist-util-visit'
import type { MarkdownNode } from '@nuxt/content/dist/runtime/types'
import { computeSizes } from '../util/image'
import type { ParsedContent } from '~/types'

export function NuxtImage(content: ParsedContent) {
  // Unwrap images inside Paragraphs
  visit(
    content.body,
    (node: MarkdownNode) => node?.tag === 'p' && node.children?.every(c => c.tag === 'img'),
    (node: MarkdownNode, index, parent: MarkdownNode) => {
      parent.children.splice(index, 1, ...node.children)
      return index
    },
  )

  visit(
    content.body,
    (node: any) => node?.tag === 'img',
    (node) => {
      // image is a simple wrapper around NuxtImg
      node.tag = 'Image'
      const intKeys = ['height', 'width', 'max-height']
      intKeys.forEach((k) => {
        if (node.props[k])
          node.props[k] = parseInt(node.props[k])
      })
      if (node.props.height && node.props.width) {
        node.props = {
          ...node.props,
          ...computeSizes(node.props.width, node.props.height, node.props['max-height']),
        }
      }
    },
  )
  return content
}
