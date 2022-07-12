import { createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    const nuxt = useNuxt()
    const resolver = createResolver(import.meta.url)

    // read time
    nuxt.hooks.hook('content:context', (ctx) => {
      ctx.transformers.push(resolver.resolve('runtime/content/read-time'))
      ctx.transformers.push(resolver.resolve('runtime/content/meta-normaliser'))
    })
  },
})
