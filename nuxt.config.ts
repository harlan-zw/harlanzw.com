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
    '@nuxtseo/module',
    'nuxt-link-checker',
    'nuxt-simple-sitemap',
  ],

  site: {
    name: 'Harlan Wilton',
    logo: '/harlan-wilton.jpeg',
    url: 'https://harlanzw.com/',
    description: 'Open source developer, contributing to the Vue, Nuxt, and Vite ecosystems.',
    defaultLocale: 'en-AU',
  },

  experimental: {
    headNext: true,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  linkChecker: {
    enabled: false,
    excludeLinks: [
      'https://twitter.com/harlan_zw',
    ],
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
      title: 'Harlan Wilton',
      templateParams: {
        separator: '·',
      },
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
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      ],
    },
  },
  // https://content.nuxtjs.org
  content: {
    documentDriven: {
      injectPage: false,
    },
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
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    // Downside: bigger JS bundle
    // With sync: 465KB, gzip: 204KB
    // Without: 418KB, gzip: 184KB
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },
})
