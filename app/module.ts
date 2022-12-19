import {addServerPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'harlanzw',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false
    },
    configKey: 'harlanzw'
  },
  setup(_) {
    const { resolve } = createResolver(import.meta.url)
    addServerPlugin(resolve('./nitro/content-post-process'))
  }
})
