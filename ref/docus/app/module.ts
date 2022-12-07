import { fileURLToPath } from 'url'
import { addPlugin, defineNuxtModule } from '@nuxt/kit'
import { resolve } from 'pathe'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

export default defineNuxtModule({
  meta: {
    name: 'scribe',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0-rc.14',
      bridge: false
    },
    configKey: 'scribe'
  },
  setup(_, nuxt) {
    if (nuxt.options?.runtimeConfig?.public?.algolia?.docSearch) {
      addPlugin({
        src: resolveThemeDir('integrations/docsearch.ts')
      })
    }
  }
})
