import type { NitroAppPlugin } from 'nitropack'

// import { Breadcrumbs } from './content/breadcrumbs'
import { CodeFilename } from './content/code-file-name'
import { NuxtImage } from './content/nuxt-image'
import { ReadTime } from './content/read-time'
import { StorageMeta } from './content/storage-meta'
import { MetaNormaliser } from './content/meta-normaliser'
import { Projects } from './content/projects'
import { Links } from './content/links'
import { OgImage } from './content/og-image'

const mdPlugins = [
  // Breadcrumbs,
  OgImage,
  CodeFilename,
  NuxtImage,
  ReadTime,
  StorageMeta,
  MetaNormaliser,
  Links,
]

const miscPlugins = [
  Projects,
]

export const ContentPostProcess: NitroAppPlugin = (nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', async (content) => {
    if (content._extension === 'md') {
      for (const plugin of mdPlugins)
        content = await plugin(content)
    }
    for (const plugin of miscPlugins)
      content = await plugin(content)
  })
}

export default ContentPostProcess
