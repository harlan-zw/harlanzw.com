import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import unpluginIcons from 'unplugin-icons'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

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
