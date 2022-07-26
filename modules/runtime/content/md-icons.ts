import { visit } from 'unist-util-visit'
import type { ContentTransformer, MarkdownNode } from '@nuxt/content/dist/runtime/types'
import { loadIconForTag, tagIsIcon } from '../util/icons'

const map: Record<string, any> = {}

export default <ContentTransformer> {
  name: 'md-icons',
  extentions: ['.md'],
  async transform(content) {
    const tags = new Set<string>()

    visit(
      content.body,
      (node: any) => tagIsIcon(node.tag),
      (node: MarkdownNode) => {
        tags.add(node.tag)
      },
    )

    for (const name of tags) {
      // avoid looking up icons again
      if (map[name])
        continue

      const { svg } = await loadIconForTag(name)
      if (!svg) {
        map[name] = {
          width: '0',
          height: '0',
          innerHTML: '',
        }
        continue
      }
      map[name] = svg
    }

    visit(
      content.body,
      (node: any) => tags.has(node.tag),
      (node) => {
        node.props = {
          ...node.props,
          ...map[node.tag],
        }
        node.props.style = {
          ...node.props.style,
          'display': 'inline-block',
          'vertical-align': 'text-bottom',
        }
        node.tag = 'svg'
      },
    )
    return content
  },
}
