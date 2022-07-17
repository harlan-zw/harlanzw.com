import { visit } from 'unist-util-visit'
import type { ContentTransformer, MarkdownNode } from '@nuxt/content/dist/runtime/types'

export default <ContentTransformer> {
  name: 'nuxt-image',
  extentions: ['.md'],
  async transform(content) {
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
        if (!node.props.width)
          node.props.width = 900
      },
    )
    return content
  },
}
