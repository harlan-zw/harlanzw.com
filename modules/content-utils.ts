import { createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'

export default defineNuxtModule({
  async setup() {
    const nuxt = useNuxt()
    const resolver = createResolver(import.meta.url)
    const resolveTransformer = (path: string) => resolver.resolve('runtime/content', path)

    // custom transformers
    nuxt.hooks.hook('content:context', (ctx) => {
      // before nuxt content transformers
      ctx.transformers.unshift(...[
        resolveTransformer('code-file-name'),
      ])

      // after nuxt content transformers
      ctx.transformers.push(...[
        resolveTransformer('breadcrumbs'),
        resolveTransformer('nuxt-image'),
        resolveTransformer('storage-meta'),
        resolveTransformer('read-time'),
        resolveTransformer('meta-normaliser'),
      ])
    })
  },
})
