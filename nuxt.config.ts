import { isExpectedNitroBuildWarning } from './build/warnings'
import { site } from './shared/site'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },

  features: {
    devLogs: false,
  },

  compatibilityDate: '2026-08-10',

  nuxtDx: {
    report: true,
  },

  // One Report Policy for the browser and the Worker. The module owns
  // registration, the enable gate, the Drop Rules and the Redaction Rules.
  // `dataCollection: 'none'` keeps this site's current setting: no personal
  // field the Sentry SDK collects by default is ever sent.
  nuxtSentry: {
    dsn: 'https://8b3cdae1f3b66b32c99644bdc5da7529@o4510507748163584.ingest.us.sentry.io/4511887363211264',
    project: 'harlanzw-com',
    dataCollection: 'none',
  },

  modules: [
    '@harlan-zw/nuxt-cloudflare',
    '@harlan-zw/nuxt-dx',
    '@nuxt/a11y',
    '@nuxtjs/html-validator',
    '@harlan-zw/nuxt-github-sponsors',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    'nuxt-ai-ready',
    'nuxt-skew-protection',
    '@nuxt/ui',
    '@harlan-zw/comark-content',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@sentry/nuxt/module',
    '@harlan-zw/nuxt-sentry',
  ],

  css: ['~/assets/css/main.css'],

  experimental: {
    checkOutdatedBuildInterval: 5 * 60 * 1000,
    payloadExtraction: true,
    ssrStreaming: true,
    typedPages: true,
  },

  runtimeConfig: {
    githubSponsors: {
      token: '',
    },
  },

  skewProtection: {
    updateStrategy: 'polling',
    reloadStrategy: 'idle',
    multiTab: false,
  },

  aiReady: {
    database: { type: 'd1', bindingName: 'DB' },
  },

  githubSponsors: {
    login: 'harlan-zw',
    mode: 'runtime',
    route: '/api/sponsors',
    overrides: {
      MassiveMonster: { websiteUrl: 'https://massivemonster.co' },
    },
  },

  site: {
    name: site.name,
    logo: site.logo,
    url: site.url,
    description: site.description,
    defaultLocale: site.language,
    // Cloudflare serves prerendered content pages from their directory form
    // (`/blog/` not `/blog`), 307-redirecting the bare path. Sitemap entries
    // and canonical tags need to point at that final URL directly, or Google
    // sees a redirect hop instead of a self-referencing canonical.
    trailingSlash: true,
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
    },
  },

  fonts: {
    providers: {
      adobe: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      google: false,
      googleicons: false,
      npm: false,
    },
    families: [
      {
        name: 'Overused Grotesk',
        src: '/fonts/overused-grotesk-variable.woff2',
        weight: [300, 900],
        style: 'oblique -10deg 0deg',
        display: 'swap',
        global: true,
        preload: true,
      },
      {
        name: 'Commit Mono',
        provider: 'local',
        weights: [400, 700],
        styles: ['normal'],
        subsets: ['latin'],
        formats: ['woff2'],
        global: true,
        preload: true,
      },
    ],
  },

  icon: {
    provider: 'none',
    serverBundle: false,
    clientBundle: {
      icons: [
        'emojione-v1:flag-for-australia',
        'emojione-v1:gem-stone',
        'ic:twotone-route',
        'line-md:heart',
        'line-md:discord',
        'line-md:github',
        'line-md:lightbulb',
        'line-md:text-box-multiple',
        'logos:laravel',
        'logos:eslint',
        'logos:lighthouse',
        'logos:nuxt-icon',
        'logos:vueuse',
        'logos:youtube-icon',
        'lucide:triangle',
        'lucide:bot',
        'lucide:cloud',
        'lucide:search',
        'lucide:settings',
        'lucide:shield-check',
        'noto:bento-box',
        'noto:check-mark',
        'noto:framed-picture',
        'noto:seal',
        'noto:wood',
        'noto:world-map',
        'simple-icons:x',
        'vscode-icons:file-type-js',
        'vscode-icons:file-type-nuxt',
        'vscode-icons:file-type-text',
        'vscode-icons:file-type-typescript',
        'vscode-icons:file-type-vue',
      ],
      scan: true,
      sizeLimitKb: 256,
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: site.language,
        dir: 'ltr',
      },
      title: site.name,
      meta: [
        { name: 'theme-color', content: '#f9f9f9', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#171b22', media: '(prefers-color-scheme: dark)' },
      ],
      templateParams: {
        separator: '·',
      },
      script: [
        {
          'src': 'https://idea-lets-dance.harlanzw.com/script.js',
          'data-spa': 'auto',
          'data-site': 'VDJUVDNA',
          'defer': true,
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://res.cloudinary.com', crossorigin: '' },
      ],
    },
  },

  htmlValidator: {
    failOnError: true,
    options: {
      rules: {
        'long-title': 'off',
        // Markdown images render inside paragraphs, where a native
        // block-level figure would produce invalid HTML.
        'prefer-native-element': 'off',
      },
    },
  },

  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dl6o1xpyq/image/upload/images',
      modifiers: {
        quality: 'auto:best',
        dpr: 'auto',
      },
    },
    domains: ['avatars0.githubusercontent.com'],
  },

  ogImage: {
    componentDirs: ['app/components/OgImage'],
  },

  routeRules: {
    '/**': {
      ssr: true,
      streaming: false,
      headers: {
        'permissions-policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'strict-transport-security': 'max-age=86400',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
      },
    },
    '/api/**': { prerender: false, robots: false },
    // `/hire` and `/meet` were removed in the Nuxt v4 rewrite with no direct
    // replacement; redirect to the homepage rather than leave them 404ing
    // for the traffic and backlinks that still land on them.
    '/hire': { redirect: { to: '/', statusCode: 301 } },
    '/meet': { redirect: { to: '/', statusCode: 301 } },
    '/sponsors': { prerender: false },
    '/experimental': { prerender: false, robots: false, streaming: true },
  },

  vite: {
    build: {
      rolldownOptions: {
        checks: {
          // Small builds make normal Tailwind and font work dominate timings.
          pluginTimings: false,
        },
      },
    },
  },

  nitro: {
    compatibilityDate: {
      cloudflare: '2026-08-08',
    },
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    // Shiki's Oniguruma binary has JS imports, so unwasm intentionally uses
    // module mode for Cloudflare instead of WebAssembly ESM integration.
    wasm: {
      silent: true,
    },
    rollupConfig: {
      onwarn(warning, warn) {
        if (!isExpectedNitroBuildWarning(warning))
          warn(warning)
      },
    },
    prerender: {
      crawlLinks: true,
      routes: ['/', '/feed.xml', '/feed.json', '/feed.atom'],
    },
  },

  // `@harlan-zw/nuxt-sentry` sets `sourcemap.client` to 'hidden' when a Sentry
  // auth token is present. It never writes `sourcemap.server`, and Nuxt defaults
  // that to true, so state it here. Server maps add 79 files to the Worker
  // upload, for no payoff: Nitro stacks are already readable.
  sourcemap: { server: false },

  devtools: {
    enabled: true,
  },
})
