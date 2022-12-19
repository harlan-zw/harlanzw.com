import { createResolver, logger } from '@nuxt/kit'
import { version } from './package.json'

logger.success(`Using Scribe v${version}`)

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus'],

  modules: [
    'nuxt-schema-org',
    resolve('./app/module'),
  ],

  css: [
    resolve('./assets/css/main.css')
  ],

  components: [
    {
      prefix: '',
      path: resolve('./components/scribe'),
      global: true
    }
  ],

  pinceau: {
    configFileName: 'tokens.config',
    debug: false,
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
