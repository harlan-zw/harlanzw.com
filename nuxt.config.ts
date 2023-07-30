export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus', 'nuxt-lego'],
  modules: [
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    'nuxt-windicss',
    // custom content modules, need to come before the content module
    '~/app/module',
    '~/modules/unplugin-icons',
    '@nuxt/content',
    'nuxt-seo-kit-module',
  ],

  site: {
    name: 'Harlan Wilton',
    logo: '/harlan-wilton.jpeg',
    titleSeparator: '·',
    url: 'https://harlanzw.com/',
    siteName: 'Harlan Wilton',
    siteDescription: 'Open source developer, contributing to the Vue, Nuxt, and Vite ecosystems.',
    language: 'en-AU',
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  runtimeConfig: {
    public: {
      titleSeparator: '·',
      siteUrl: 'https://harlanzw.com/',
      siteName: 'Harlan Wilton',
      siteDescription: 'Open source developer, contributing to the Vue, Nuxt, and Vite ecosystems.',
      language: 'en-AU',
    },
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

  pinceau: {
    configFileName: 'tokens.config',
    studio: false,
    debug: true,
    followSymbolicLinks: false,
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
    documentDriven: true,
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula',
    },
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

  studio: {
    enabled: false,
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: [
        '/',
        '/feed.xml',
        '/feed.json',
        '/feed.atom',
      ],
    },
  },
})
