import { defineNuxtConfig } from 'nuxt'
// Local import of the theme.config file.
// Values used from it will have to be rewritten manually in the user projects nuxt.config file.
import config from './theme.config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    /**
     * https://nuxt-theme-kit.netlify.app
     */
    // TODO: Remove this ignore
    // https://github.com/nuxt-themes/config/issues/5
    // @ts-expect-error untyped
    theme: {
      meta: {
        name: 'harlanzw.com',
        author: '@harlan_zw',
        description: 'My personal website built with Nuxt v3 and Nuxt Content v2. ✨',
      },
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
  modules: [
    // Themify
    '@nuxt-themes/config/module',
    '@nuxtjs/design-tokens/module',
    // Website
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-schema-org',
    'nuxt-windicss',
    // custom content modules, need to come before the content module
    '~/modules/unplugin-icons',
    '~/modules/content-utils',
    '@nuxt/content',
  ],
  schemaOrg: {
    disableRuntimeScriptsWhenSSR: true,
    // To be rewritten manually by the theme user
    canonicalHost: config.site.url,
    // To be rewritten manually by the theme user
    defaultLanguage: config.site.language,
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
  hooks: {
    // @todo fix via nuxt, does not work
    'components:extend': function (components) {
      for (const component of components) {
        if (component.chunkName.startsWith('components/prose')) {
          component.chunkName = 'prose-components'
          component.prefetch = false
        }
      }
    },
    'app:templates': function (app) {
      app.templates = app.templates.map((t) => {
        if (t.filename !== 'views/document.template.mjs')
          return t

        const analyticsScript = '<script src="https://idea-lets-dance.harlanzw.com/script.js" data-spa="auto" data-site="VDJUVDNA" defer></script>'

        t.getContents = () => {
          return `export default (params) => \`
<!DOCTYPE html>
<!--
  Hey :) Thanks for inspecting my site.
  Are you interested in the source code? You can find it here: https://github.com/harlan-zw/harlanzw.com
-->
<html \${params.HTML_ATTRS}>

<head \${params.HEAD_ATTRS}>
  \${params.HEAD}
</head>

<body \${params.BODY_ATTRS}>\${params.BODY_PREPEND}
  \${params.APP}
</body>
<!-- Start Analytics -->
${process.env.NODE_ENV === 'production' ? analyticsScript : '<!-- Ommited -->'}
<!-- End Analytics -->
</html>\`
`
        }
        return t
      })
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
