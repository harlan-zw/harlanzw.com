import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'
import * as cheerio from 'cheerio'

export const collections = ['mdi', 'mdi-light', 'ic', 'ph', 'icon-park-outline', 'icon-park', 'uil', 'bx', 'ri', 'la', 'iconoir', 'jam', 'ion', 'bi', 'clarity', 'carbon', 'cil', 'gg', 'tabler', 'teenyicons', 'fa-solid', 'fa-regular', 'vaadin', 'icomoon-free', 'eva', 'pixelarticons', 'majesticons', 'ci', 'eos-icons', 'dashicons', 'entypo', 'zondicons', 'flat-color-icons', 'octicon', 'codicon', 'ant-design', 'lucide', 'fe', 'radix-icons', 'line-md', 'system-uicons', 'akar-icons', 'uiw', 'uim', 'uit', 'uis', 'gridicons', 'mono-icons', 'heroicons-outline', 'heroicons-solid', 'file-icons', 'mi', 'ps', 'el', 'foundation', 'typcn', 'subway', 'raphael', 'icons8', 'wpf', 'iwwa', 'topcoat', 'ei', 'bytesize', 'fluent', 'grommet-icons', 'pepicons', 'maki', 'oi', 'et', 'vscode-icons', 'fontisto', 'fa', 'zmdi', 'whh', 'si-glyph', 'ls', 'simple-line-icons', 'flat-ui', 'vs', 'websymbol', 'il', 'bpmn', 'fontelico', 'feather', 'noto', 'noto-v1', 'twemoji', 'openmoji', 'emojione', 'emojione-monotone', 'emojione-v1', 'fxemoji', 'logos', 'cib', 'simple-icons', 'fa-brands', 'brandico', 'entypo-social', 'cryptocurrency', 'gis', 'map', 'geo', 'cif', 'fad', 'wi', 'healthicons', 'medical-icon', 'ep']

const iconCache: Record<string, any> = {}

interface LoadIconResponse {
  icon: string
  collection: string
  // attributes
  svg: false | Record<string, any>
  svgRaw: string
}

// need to make sure we look at the longest collection names first to avoid conflicts
export const iconCollections = collections
  .sort((a, b) => b.length - a.length)

export const tagIsIcon = (tag: string) => !!iconCollections.find((i) => {
  if (!tag || !tag.startsWith('i-'))
    return false

  return tag.substring(2).startsWith(`${i}-`)
})

export const normaliseSvgAttrs = (svg: string, icon: string) => {
  // svg is possibly empty for an invalid icon
  if (!svg)
    return false
  const $ = cheerio.load(svg)
  return <Record<string, any>> {
    ...$('svg').attr(),
    // presume all icons are decorative
    'aria-hidden': true,
    'title': icon,
    'innerHTML': $('svg').html(),
  }
}

export const loadIconForTag = async (tag: string) => {
  // fix up the tag name splitting v and 1
  if (tag.startsWith('i-emojione-v-1'))
    tag = tag.replace('i-emojione-v-1', 'i-emojione-v1')

  if (iconCache[tag])
    return iconCache[tag]

  const collection = iconCollections.find(i => tag.substring(2).startsWith(`${i}-`))
  const icon = tag.substring(2).slice(collection.length + 1)
  const svg = await loadNodeIcon(collection, icon, {
    addXmlNs: false,
    autoInstall: true,
  })

  if (!svg)
    console.warn(`Failed to find icon \`${icon}\` in collection \`${collection}\`.`)

  const res: LoadIconResponse = {
    svgRaw: svg,
    svg: normaliseSvgAttrs(svg, icon),
    icon,
    collection,
  }

  iconCache[tag] = res
  return res
}
