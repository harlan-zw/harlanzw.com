import { NitroAppPlugin } from 'nitropack'
import { Breadcrumbs } from './content/breadcrumbs'
import {CodeFilename} from "./content/code-file-name";
import {NuxtImage} from "./content/nuxt-image";
import {ReadTime} from "./content/read-time";
import { StorageMeta } from './content/storage-meta'
import { MetaNormaliser } from './content/meta-normaliser'

export const ContentPostProcess: NitroAppPlugin = (nitroApp) => {
  console.log('nitro plugin')
  nitroApp.hooks.hook('content:file:afterParse', async (content) => {
    if (content._extension === 'md') {
      const plugins = [
        Breadcrumbs,
        CodeFilename,
        NuxtImage,
        ReadTime,
        StorageMeta,
        MetaNormaliser,
      ]
      for(const plugin of plugins) {
        content = await plugin(content)
      }
    }
  })
}

export default ContentPostProcess
