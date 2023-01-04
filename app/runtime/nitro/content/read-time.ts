import { visit } from 'unist-util-visit'
import type { MarkdownNode } from '@nuxt/content/dist/runtime/types'
import type { ParsedContent } from '~/types'

function calculateReadingMins(text: string) {
  const wordsPerMinute = 220
  const words = text.trim().split(' ').length
  return Math.ceil(words / wordsPerMinute)
}

const TEXT_NODES = [
  'p',
  'a',
  'blockquote',
  'code-inline',
  'code',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'ul',
  'ol',
  'li',
  'strong',
  'table',
  'thead',
  'tbody',
  'td',
  'th',
  'tr',
]

export function ReadTime(content: ParsedContent) {
  const textNodes: string[] = []
  visit(
    content.body,
    (node: MarkdownNode) => {
      return node?.tag && TEXT_NODES.includes(node?.tag)
    },
    (node: MarkdownNode) => {
      textNodes.push(
        // check the node itself and children for text nodes
        ...[...node.children, node]
          .filter(n => n.type === 'text')
          .map(n => n.value.trim()),
      )
    },
  )
  content.readingMins = calculateReadingMins(textNodes.join(' '))
  return content
}
