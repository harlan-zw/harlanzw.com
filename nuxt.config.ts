import { defineNuxtConfig } from 'nuxt'
// Local import of the theme.config file.
// Values used from it will have to be rewritten manually in the user projects nuxt.config file.
import config from './theme.config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  extends: ['nuxt-theme-mycelium'],

  components: [
    {
      path: './node_modules/nuxt-theme-mycelium/components/content',
      global: true,
      prefix: '',
    },
  ],

  autoImports: {
    dirs: [
      './node_modules/nuxt-theme-mycelium/composables',
    ],
  },

  hooks: {
    'nuxt:composables': function () {

    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // automatically import tokens into scss
          additionalData: '@import "./.nuxt/tokens/tokens.scss";',
        },
      },
    },
  },
  // modules: [
  //   // Themify
  //   '@nuxt-themes/config/module',
  //   '@nuxtjs/design-tokens/module',
  //   // Website
  //   '@nuxtjs/color-mode',
  //   '@vueuse/nuxt',
  //   '@nuxt/image',
  //   'nuxt-schema-org',
  //   'nuxt-windicss',
  //   // custom content modules, need to come before the content module
  //  // '~/modules/unplugin-icons',
  //  // '~/modules/content-utils',
  //   '@nuxt/content',
  // ],
  schemaOrg: {
    disableRuntimeScriptsWhenSSR: true,
    // To be rewritten manually by the theme user
    canonicalHost: config.site.url,
    // To be rewritten manually by the theme user
    defaultLanguage: config.site.language,
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dl6o1xpyq/image/upload/images',
      modifiers: {
        quality: 'auto:best',
        dpr: 'auto',
      },
    },
    domains: [
      'avatars0.githubusercontent.com',
    ],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/sitemap.xml',
        '/feed.xml',
        '/feed.json',
        '/feed.atom',
      ],
    },
  },
})
