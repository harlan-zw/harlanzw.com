import { SiteLanguage, SiteUrl } from './logic'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    'nuxt-schema-org',
    'nuxt-windicss',
    // custom content modules, need to come before the content module
    '~/modules/unplugin-icons',
    '~/modules/content-utils',
    '@nuxt/content',
    'nuxt-hedge'
  ],
  schemaOrg: {
    canonicalHost: SiteUrl,
    defaultLanguage: SiteLanguage,
  },
  css: [
    '@/resources/scrollbars.css',
    '@/resources/main.scss',
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    fallback: 'dark',
    classSuffix: '',
  },
  app: {
    head: {
      // fathom analytics
      script: [
        {
          'src': 'https://idea-lets-dance.harlanzw.com/script.js',
          'data-spa': 'auto',
          'data-site': 'VDJUVDNA',
          'defer': true,
        },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      ],
      meta: [
        { 'http-equiv': 'accept-ch', 'content': 'DPR' },
      ],
    },
  },
  // https://content.nuxtjs.org
  content: {
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula',
    },
  },

  router: {
    trailingSlash: false,
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
