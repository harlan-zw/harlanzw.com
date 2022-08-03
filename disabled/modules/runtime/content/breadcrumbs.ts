import { visit } from 'unist-util-visit'
import type { ContentTransformer, MarkdownNode } from '@nuxt/content/dist/runtime/types'

export default <ContentTransformer> {
  name: 'breadcrumbs',
  extentions: ['.md'],
  async transform(content) {
    let insertedBreadcrumbs = false
    // insert breadcrumbs after the h1 tag
    visit(
      content.body,
      (node: MarkdownNode) => node?.tag === 'h1',
      (node: MarkdownNode, index, parent: MarkdownNode) => {
        // ensure we only insert once
        if (insertedBreadcrumbs)
          return
        parent.children.splice(index, 0, ...[
          {
            type: 'element',
            tag: 'Breadcrumbs',
          },
        ])
        insertedBreadcrumbs = true
      },
    )
    return content
  },
}
