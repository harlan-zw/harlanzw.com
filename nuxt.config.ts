import { defineNuxtConfig } from 'nuxt'
import { SiteLanguage, SiteUrl } from './logic'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    'nuxt-schema-org',
    'nuxt-windicss',
    // custom content modules, need to come before the content module
    '~/modules/unplugin-icons',
    '~/modules/content-utils',
    '@nuxt/content',
  ],
  schemaOrg: {
    disableRuntimeScriptsWhenSSR: true,
    canonicalHost: SiteUrl,
    defaultLanguage: SiteLanguage,
  },
  css: [
    '@/resources/code.css',
    '@/resources/main.scss',
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: '',
  },
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: [''],
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
  },
})
