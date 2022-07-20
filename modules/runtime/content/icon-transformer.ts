import { visit } from 'unist-util-visit'
import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'
import * as cheerio from 'cheerio'
import type { ContentTransformer, MarkdownNode } from '@nuxt/content/dist/runtime/types'

export const collections = ['mdi', 'mdi-light', 'ic', 'ph', 'icon-park-outline', 'icon-park', 'uil', 'bx', 'ri', 'la', 'iconoir', 'jam', 'ion', 'bi', 'clarity', 'carbon', 'cil', 'gg', 'tabler', 'teenyicons', 'fa-solid', 'fa-regular', 'vaadin', 'icomoon-free', 'eva', 'pixelarticons', 'majesticons', 'ci', 'eos-icons', 'dashicons', 'entypo', 'zondicons', 'flat-color-icons', 'octicon', 'codicon', 'ant-design', 'lucide', 'fe', 'radix-icons', 'line-md', 'system-uicons', 'akar-icons', 'uiw', 'uim', 'uit', 'uis', 'gridicons', 'mono-icons', 'heroicons-outline', 'heroicons-solid', 'file-icons', 'mi', 'ps', 'el', 'foundation', 'typcn', 'subway', 'raphael', 'icons8', 'wpf', 'iwwa', 'topcoat', 'ei', 'bytesize', 'fluent', 'grommet-icons', 'pepicons', 'maki', 'oi', 'et', 'vscode-icons', 'fontisto', 'fa', 'zmdi', 'whh', 'si-glyph', 'ls', 'simple-line-icons', 'flat-ui', 'vs', 'websymbol', 'il', 'bpmn', 'fontelico', 'feather', 'noto', 'noto-v1', 'twemoji', 'openmoji', 'emojione', 'emojione-monotone', 'emojione-v1', 'fxemoji', 'logos', 'cib', 'simple-icons', 'fa-brands', 'brandico', 'entypo-social', 'cryptocurrency', 'gis', 'map', 'geo', 'cif', 'fad', 'wi', 'healthicons', 'medical-icon', 'ep']

const map: Record<string, any> = {}

export default <ContentTransformer> {
  name: 'icon-transformer',
  extentions: ['.md'],
  async transform(content) {
    const tags = new Set<string>()

    // need to make sure we look at the longest collection names first to avoid conflicts
    const colls = collections
      .sort((a, b) => b.length - a.length)

    visit(
      content.body,
      (node: any) => !!colls.find((i) => {
        if (!node.tag || !node.tag.startsWith('i-'))
          return false

        return node.tag.substring(2).startsWith(`${i}-`)
      }),
      (node: MarkdownNode) => {
        tags.add(node.tag)
      },
    )

    for (const name of tags) {
      // avoid looking up icons again
      if (map[name])
        continue

      let tag = name
      // fix up the tag name splitting v and 1
      if (tag.startsWith('i-emojione-v-1'))
        tag = tag.replace('i-emojione-v-1', 'i-emojione-v1')

      const collection = colls.find(i => tag.substring(2).startsWith(`${i}-`))
      const icon = tag.substring(2).slice(collection.length + 1)

      const svg = await loadNodeIcon(collection, icon, {
        addXmlNs: false,
        autoInstall: true,
      })
      if (!svg) {
        console.warn(`Failed to find icon \`${icon}\` in collection \`${collection}\`.`)
        map[name] = {
          width: '0',
          height: '0',
          innerHTML: '',
        }
        continue
      }
      const $ = cheerio.load(svg)
      map[name] = {
        ...$('svg').attr(),
        // presume all icons are decorative
        'aria-hidden': true,
        'title': icon,
        'innerHTML': $('svg').html(),
      }
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
