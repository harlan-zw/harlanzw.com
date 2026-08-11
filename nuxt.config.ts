import { existsSync } from 'node:fs'
import { isExpectedNitroBuildWarning } from './build/warnings'
import { SENTRY_DSN, sentryRelease } from './shared/sentry'
import { site } from './shared/site'

const hasSentryAuthToken = Boolean(process.env.SENTRY_AUTH_TOKEN)
  || existsSync('.env.sentry-build-plugin')

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
    sizeBudget: {
      ignoreModules: ['@nuxt/icon', '@nuxt/ui', '@sentry/nuxt/module'],
      overridesKb: { 'server/plugins/sentry.ts': 326 },
    },
  },

  modules: [
    '@harlan-zw/nuxt-dx',
    '@nuxt/a11y',
    '@nuxtjs/html-validator',
    '@harlan-zw/nuxt-github-sponsors',
    '@nuxtjs/seo',
    'nuxt-ai-ready',
    'nuxt-skew-protection',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@sentry/nuxt/module',
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
    sentry: {
      dsn: SENTRY_DSN,
      enabled: process.env.NODE_ENV === 'production',
      environment: 'production',
      release: sentryRelease() ?? '',
      tracesSampleRate: 0.05,
    },
  },

  skewProtection: {
    updateStrategy: 'polling',
    reloadStrategy: 'idle',
  },

  aiReady: {
    database: { type: 'd1', bindingName: 'DB' },
  },

  githubSponsors: {
    login: 'harlan-zw',
    mode: 'runtime',
    route: '/api/sponsors',
    tiers: [
      { key: 'top', minimumMonthlyDollars: 50 },
      { key: 'gold', minimumMonthlyDollars: 25 },
    ],
    overrides: {
      MassiveMonster: { websiteUrl: 'https://massivemonster.co' },
    },
  },

  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: {
              name: 'harlanzw-light-high-contrast',
              type: 'light',
              fg: '#0e1116',
              bg: '#fff',
              settings: [
                { settings: { foreground: '#0e1116', background: '#fff' } },
              ],
            },
            light: 'github-light-high-contrast',
            dark: 'github-dark-high-contrast',
          },
        },
      },
    },
  },

  site: {
    name: site.name,
    logo: site.logo,
    url: site.url,
    description: site.description,
    defaultLocale: site.language,
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
    },
  },

  fonts: {
    families: [
      { name: 'JetBrains Mono', provider: 'google' },
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
        // Nuxt Content wraps Markdown images in paragraphs, where a native
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

  sentry: {
    enabled: process.env.NODE_ENV === 'production',
    org: 'harlan-zw',
    project: 'harlanzw-com',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    release: { name: sentryRelease() },
    sourcemaps: {
      disable: !hasSentryAuthToken,
      filesToDeleteAfterUpload: ['**/*.map'],
    },
    bundleSizeOptimizations: {
      excludeReplayShadowDom: true,
      excludeReplayIframe: true,
      excludeReplayWorker: true,
    },
    telemetry: false,
  },

  sourcemap: {
    client: hasSentryAuthToken ? 'hidden' : false,
    server: false,
  },

  devtools: {
    enabled: true,
  },
})
