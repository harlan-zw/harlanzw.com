import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import unpluginIcons from 'unplugin-icons'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtModule({
  setup() {
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
