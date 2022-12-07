import { createResolver, logger } from '@nuxt/kit'
import { $fetch } from 'ofetch'
import { version } from './package.json'

logger.success(`Using Scribe v${version}`)

const { resolve } = createResolver(import.meta.url)

// That allows to overwrite these dependencies paths via `.env` for local development
const envModules = {
  tokens: process?.env?.THEME_DEV_TOKENS_PATH || '@nuxt-themes/tokens',
  elements: process?.env?.THEME_DEV_ELEMENTS_PATH || '@nuxt-themes/elements',
  studio: process?.env?.THEME_DEV_STUDIO_PATH || '@nuxthq/studio',
  typography: process?.env?.THEME_DEV_TYPOGRAPHY_PATH || '@nuxt-themes/typography'
}

export default defineNuxtConfig({
  extends: [envModules.typography, envModules.elements],

  modules: [
    envModules.tokens,
    envModules.studio,
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
    resolve('./app/module'),
    (_, nuxt) => {
      if (nuxt.options.dev) {
        $fetch('https://ungh.unjs.io/repos/nuxt-themes/scribe/releases/latest').then(({ release }) => {
          if (release.tag !== `v${version}`) {
            logger.warn(`A new version of Scribe (${release.tag}) is available: https://github.com/nuxt-themes/scribe/releases/tag/${release.tag}`)
          }
        }).catch((_) => {})
      }
    }
  ],

  css: [
    resolve('./assets/css/main.css')
  ],

  components: [
    {
      prefix: '',
      path: resolve('./components/app'),
      global: true
    },
    {
      prefix: '',
      path: resolve('./components/docs'),
      global: true
    }
  ],

  pinceau: {
    configFileName: 'tokens.config',
    debug: true
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-light'
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    navigation: {
      fields: ['icon', 'titleTemplate', 'aside']
    }
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme'
  }
})
