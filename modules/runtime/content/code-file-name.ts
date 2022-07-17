import { visit } from 'unist-util-visit'
import type { ContentTransformer, MarkdownNode } from '@nuxt/content/dist/runtime/types'

export default <ContentTransformer> {
  name: 'code-file-name',
  extentions: ['.md'],
  async transform(content) {
    visit(
      content.body,
      (node: MarkdownNode) => node?.tag === 'code' && (node?.props?.filename || node?.props?.language),
      (node: MarkdownNode, index, parent: MarkdownNode) => {
        parent.children.splice(index, 1, ...[
          {
            type: 'element',
            tag: 'div',
            props: {
              class: ['code-block', 'with-filename', `language-${node.props.language}`].join(' '),
            },
            children: [
              {
                type: 'element',
                tag: 'span',
                props: {
                  class: 'code-block-filename',
                },
                children: [
                  { type: 'text', value: node?.props?.filename },
                ],
              },
              node,
            ],
          },
        ])
      },
    )
    return content
  },
}
