import { visit } from 'unist-util-visit'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

function calculateReadingMins(text: string) {
  const wordsPerMinute = 170
  const words = text.trim().split(' ').length
  return Math.ceil(words / wordsPerMinute)
}

export default {
  name: 'read-time',
  extentions: ['.md'],
  async transform(content: ParsedContent) {
    const textNodes: string[] = []
    visit(
      content.body,
      (node: any) => {
        return node?.tag === 'p'
      },
      (node) => {
        textNodes.push(
          ...node.children
            .filter(n => n.type === 'text')
            .map(n => n.value.trim()),
        )
      },
    )
    content.readingMins = calculateReadingMins(textNodes.join(' '))
    return content
  },
}
