import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    'nuxt-windicss',
    // content modules need to come first
    '~/modules/unplugin-icons',
    '~/modules/content-utils',
    '@nuxt/content',
    'nuxt-schema-org',
  ],
  schemaOrg: {
    // set to your production domain
    canonicalHost: 'https://harlanzw.com',
  },
  css: [
    '@/resources/main.scss',
  ],
  css: [
    '@/resources/main.scss',
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: '',
  },
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: ['navTitle'],
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula',
    },
  },
})
