import {createResolver, defineNuxtModule, addServerPlugin } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: 'scribe',
    version: '3.0.0',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false
    },
    configKey: 'scribe'
  },
  setup(_) {
    const { resolve } = createResolver(import.meta.url)
    addServerPlugin(resolve('./runtime/nitro/content-post-process'))
  }
})
