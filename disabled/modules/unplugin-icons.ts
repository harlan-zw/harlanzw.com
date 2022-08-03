import { addVitePlugin, createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'
import unpluginIcons from 'unplugin-icons'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtModule({
  setup() {
    const nuxt = useNuxt()
    const resolver = createResolver(import.meta.url)

    // register unplugin icons
    nuxt.hooks.hook('content:context', (ctx) => {
      ctx.transformers.push(resolver.resolve('runtime/content/md-icons'))
      ctx.transformers.push(resolver.resolve('runtime/content/project-icons'))
    })

    addVitePlugin(unpluginIcons.vite({
      autoInstall: true,
    }))

    addVitePlugin(Components({
      dts: '.nuxt/icons.d.ts',
      // no nuxt components
      dirs: [],
      resolvers: [
        IconsResolver(),
      ],
    }))
  },
})
