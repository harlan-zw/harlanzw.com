import { defineNuxtConfig } from 'nuxt'
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
  ],
  schemaOrg: {
    disableRuntimeScriptsWhenSSR: true,
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
  hooks: {
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
