import { visit } from 'unist-util-visit'
import type { MarkdownNode } from '@nuxt/content/dist/runtime/types'
import type { ParsedContent } from '~/types'

export function Links(content: ParsedContent) {
  // insert breadcrumbs after the h1 tag
  visit(
    content.body,
    (node: MarkdownNode) => node?.tag === 'a',
    (node: MarkdownNode) => {
      // avoid links for h1
      if (node.props?.href.startsWith('https://')) {
        node.props.target = '_blank'
        if (!node.props.title) {
          // get host name of href
          const hostname = new URL(node.props.href).hostname
          node.props.title = `Open ${hostname} in a new tab`
        }
        // @todo this blocks some content from being rendered, re-enable at some point
        // if (parent.type === 'element' && parent.tag === 'p') {
        //   parent.children?.splice(index + 1, 0, {
        //     // fetch the favicon from the href link
        //     type: 'element',
        //     tag: 'div',
        //     props: {
        //       class: 'link-favicon',
        //     },
        //     children: [
        //       {
        //         type: 'element',
        //         tag: 'img',
        //         props: {
        //           src: `https://www.google.com/s2/favicons?domain=${encodeURIComponent(node.props.href)}`,
        //           alt: 'favicon',
        //           width: 16,
        //           height: 16,
        //         },
        //       },
        //     ]
        //   })
        // }
      }
    },
  )
  return content
}
