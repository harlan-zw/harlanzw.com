import type { ContentTransformer } from '@nuxt/content/dist/runtime/types'
import { loadIconForTag, tagIsIcon } from '~/modules/runtime/util/icons'
import { $fetch } from 'ohmyfetch'

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
        const { repo } = await $fetch(`https://ungh.unjs.io/repo/${project.repo}`)
        console.log(repo)
        project.stars = repo.stars
        project.description = repo.description
        project.updatedAt = repo.updatedAt
      }
    }

    return content
  },
}
