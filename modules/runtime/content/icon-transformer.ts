import { visit } from 'unist-util-visit'
import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'
import * as cheerio from 'cheerio'
import type { ContentTransformer } from '@nuxt/content/dist/runtime/types'

export const collections = ['mdi', 'mdi-light', 'ic', 'ph', 'icon-park-outline', 'icon-park', 'uil', 'bx', 'ri', 'la', 'iconoir', 'jam', 'ion', 'bi', 'clarity', 'carbon', 'cil', 'gg', 'tabler', 'teenyicons', 'fa-solid', 'fa-regular', 'vaadin', 'icomoon-free', 'eva', 'pixelarticons', 'majesticons', 'ci', 'eos-icons', 'dashicons', 'entypo', 'zondicons', 'flat-color-icons', 'octicon', 'codicon', 'ant-design', 'lucide', 'fe', 'radix-icons', 'line-md', 'system-uicons', 'akar-icons', 'uiw', 'uim', 'uit', 'uis', 'gridicons', 'mono-icons', 'heroicons-outline', 'heroicons-solid', 'file-icons', 'mi', 'ps', 'el', 'foundation', 'typcn', 'subway', 'raphael', 'icons8', 'wpf', 'iwwa', 'topcoat', 'ei', 'bytesize', 'fluent', 'grommet-icons', 'pepicons', 'maki', 'oi', 'et', 'vscode-icons', 'fontisto', 'fa', 'zmdi', 'whh', 'si-glyph', 'ls', 'simple-line-icons', 'flat-ui', 'vs', 'websymbol', 'il', 'bpmn', 'fontelico', 'feather', 'noto', 'noto-v1', 'twemoji', 'openmoji', 'emojione', 'emojione-monotone', 'emojione-v1', 'fxemoji', 'logos', 'cib', 'simple-icons', 'fa-brands', 'brandico', 'entypo-social', 'cryptocurrency', 'gis', 'map', 'geo', 'cif', 'fad', 'wi', 'healthicons', 'medical-icon', 'ep']

export default <ContentTransformer> {
  name: 'icon-transformer',
  extentions: ['.md'],
  async transform(content) {
    const tags: string[] = []
    const map: Record<string, any> = {}
    visit(
      content.body,
      (node: any) => !!collections.find((i) => {
        if (!node.tag || !node.tag.startsWith('i-'))
          return false

        return node.tag.substring(2).startsWith(`${i}-`)
      }),
      (node) => {
        tags.push(node.tag)
      },
    )

    for (const name of tags) {
      const collection = collections.find(i => name.substring(2).startsWith(`${i}-`))
      const icon = name.substring(2).slice(collection.length + 1)
      const svg = await loadNodeIcon(collection, icon, {
        addXmlNs: false,
        autoInstall: true,
      })
      const $ = cheerio.load(svg)
      map[name] = {
        ...$('svg').attr(),
        innerHTML: $('svg').html(),
      }
    }

    visit(
      content.body,
      (node: any) => tags.includes(node.tag),
      (node) => {
        node.props = {
          ...node.props,
          ...map[node.tag],
        }
        node.props.style = {
          ...node.props.style,
          display: 'inline-block',
        }
        node.tag = 'svg'
      },
    )
    return content
  },
}
