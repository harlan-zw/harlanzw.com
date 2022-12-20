# Nuxt 3 Migration Cheatsheet

## Pre-migration

This assumes you are on the latest Nuxt 2.x version. If you are on an earlier version, the first step is upgrading.

## Vuex 3

- Vuex 4 or Pinia

## Migrate from Options API To Composition API

https://github.com/miyaoka/vue-composition-converter

Recommendation, but not required. The alternative is you can wrap all option API pages / components in `defineNuxtComponent`.

## Migrate to TypeScript

- Learn the difference between CJS and ESM
- Migrate to Nuxt 2.15
- Switch to TypeScript
- Switch to Composition API
- Switch to Vite
- Migrate to Pinia 

## Starting the Migration

- create a new project

## Nuxt 3 Module Migration

## Deprecated Modules

These can be safely removed as the Nuxt core provides the same functionality.

- @nuxtjs/typescript
- @nuxtjs/typescript-runtime
- composition-api
- dotenv

## @nuxtjs/auth

https://github.com/nuxt-alt/auth
https://github.com/sidebase/nuxt-auth

## @nuxtjs/axios & @nuxt/http

Use $fetch / useFetch (https://nuxt.com/docs/migration/component-options/)

- https://github.com/nuxt-alt/http

## @nuxtjs/pwa

https://github.com/kevinmarrec/nuxt-pwa-module

## @nuxtjs/i18n

https://v8.i18n.nuxtjs.org/

## @nuxtjs/proxy

https://github.com/nuxt-alt/proxy

Coming to nitro route rules: https://github.com/unjs/nitro/issues/113

## @nuxtjs/eslint-module

Remove module, use https://github.com/nuxt/eslint-config

## @nuxtjs/sitemap

Recommendation: Use nuxt-seo-kit or @funken-studio/sitemap-nuxt-3

## Thin Wrapper Modules

## @nuxtjs/robots

Recommendation: Remove module. Use nuxt-seo-kit if you want to avoid writing your own robots.txt file.

To create your own robots.txt file, simply:

1. Create a `public/robots.txt` file

```text
User-agent: *
Disallow: /
```

2. OR create a `server/routes/robots.txt.ts` and generate robots dynamically

```ts
export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/plain')
  return `User-agent: *\nDisallow: /\nSitemap: https://YOUR_SITE/sitemap_index.xml`
})
```

## @nuxtjs/gtm

## @nuxtjs/vuetify

https://github.com/nuxt-alt/vuetify
(wait for official support)


### bootstrap-vue

### @nuxtjs/google-analytics

### nuxt-facebook-pixel-module

### @nuxtjs/device

Use https://github.com/faisalman/ua-parser-js


## Components

- asyncData ->useFetch / useAsyncData
- nuxtServerInit
