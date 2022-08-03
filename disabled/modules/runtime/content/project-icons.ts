import type { ContentTransformer } from '@nuxt/content/dist/runtime/types'
import { loadIconForTag, tagIsIcon } from '~/modules/runtime/util/icons'

export default <ContentTransformer> {
  name: 'project-icons',
  extentions: ['.json'],
  async transform(content) {
    if (content._file !== 'projects.json')
      return content

    for (const ecosystem of content.body) {
      for (const project of ecosystem.projects) {
        if (tagIsIcon(project.icon))
          project.icon = (await loadIconForTag(project.icon)).svgRaw
      }
    }

    return content
  },
}
