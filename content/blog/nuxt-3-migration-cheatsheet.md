---
title: "Nuxt 3 Migration Simplified: A Cheat Sheet"
description: "Effortlessly migrate to Nuxt 3 with our cheat sheet. It includes step-by-step instructions and helpful tips for a seamless transition."
publishedAt: "2022-12-27"
aside: false
tags:
- nuxt
---

## Introduction

Upgrading to Nuxt 3 can be intimidating, but it's totally worth it!
The latest version brings a ton of new features and improvements that can seriously level up your project.

Knowing firsthand how overwhelming it can be, I made this cheat sheet to simplify the upgrade process for my own use and to help others.

Upgrading will take some time, depending on the size of your project and your prior experience. But with patience and persistence, you'll be able to enjoy all the benefits of the latest version of Nuxt. 

This cheat sheet is a work in progress and not exhaustive, I'll be updating it as I migrate more sites.

If you have any questions or suggestions, please let me know on [Twitter](https://twitter.com/harlan_zw) or [Discord](https://discord.gg/275MBUBvgP).

Let's do this!


## Resources

### Links

- [Nuxt 3 docs](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt 3 Migration Guide](https://nuxt.com/docs/migration/overview)
- Create a new Nuxt project: [nuxt.new](https://nuxt.new)

### Education

- Free: NuxtNation 2022 [YouTube playlist](https://www.youtube.com/playlist?list=PLxddmVXxb3Hu4yg6jEUBcQ6xix6QM0ews)
- Paid: [Mastering Nuxt](https://masteringnuxt.com/)

### Getting help

- [Discord](https://discord.com/invite/ps2h6QT): create a post in `#nuxt3-help` if you get stuck
- [Twitter Nuxt Community](https://twitter.com/i/communities/1498235047194808320)
- Post on StackOverflow with the tag [Nuxt](https://stackoverflow.com/questions/tagged/nuxt), [kissu](https://stackoverflow.com/users/8816585/kissu) may help you if you're lucky
- [Reddit Nuxt.js](https://www.reddit.com/r/nuxtjs/)

::tip
Want someone to help quicker? Try providing a [reproduction repo](https://nuxt.com/docs/community/reporting-bugs#create-a-minimal-reproduction).
<br>
<br>
At a minimal, you should should provide your environment details from running `npx nuxi info`. 
::

### Tech

- [UnJS](https://unjs.io/) – A collection of packages which make up the Nuxt core.
- [VueUse](https://vueuse.org/) – Essential Vue Composition API utilities.
- [Vite](https://vitejs.dev) and [Rollup](https://rollupjs.org/) – Backbone of Nuxt 3 bundling.

## Pre-migration 

Before you start upgrading, it's important to familiarise yourself with the new features and changes in Nuxt 3 and prepare your 
project for the upgrade.

### 1. Get familiar with Nuxt 3

Learn the key differences between Nuxt 2 and Nuxt 3 and the new technologies that power it.

::checkbox
[Nuxt 3 architecture](https://nuxt.com/docs/getting-started/introduction)
#tip
While there are many similarities to Nuxt 2, the underlying architecture is completely new, more complex and more powerful.

At a minimal you should learn the differences between:
- Nuxi (command line interface)
- [Nuxt](https://nuxt.com/docs/guide/going-further/internals#the-nuxt-interface) (core context)
- [Nuxt App](https://nuxt.com/docs/guide/going-further/internals#the-nuxtapp-interface) (app context)
- [Nitro](https://nuxt.com/docs/guide/concepts/server-engine) (server engine)

As well as the [Rendering modes](https://nuxt.com/docs/guide/concepts/rendering) (SSR, SPA, Static).

Daniel Roe's talk [What happens when you start Nuxt 3](https://www.youtube.com/watch?v=IVA_76hKEwE) is a great place to start.
::

::checkbox
Read the [official migration guide](https://nuxt.com/docs/migration/overview) 
#tip
Get a high-level overview of the changes, you'll reference this as you continue on with the migration process.
::

::checkbox
Play with Nuxt 3: [nuxt.new](https://nuxt.new)
#tip
Create a new fresh Nuxt 3 project and have a play around with it. This will help you get a feel for the new features and how they work.
::

::checkbox
Learn Vue 3 / Composition API
#tip
Vue 3 is a major upgrade from Vue 2. You will need to learn the new syntax and features to be able to use Nuxt 3, particularly
the [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html).
::

::checkbox
Learn the basics of TypeScript
#tip
Whether you like TypeScript or not is irrelevant. Nuxt 3 is written in TypeScript, trying to avoid it will only make your life harder.
::

::checkbox
Learn about modules: CJS and ESM
#tip
Nuxt 3 uses ESM, so you'll need to convert your CJS modules to ESM. See the Nuxt [ES modules](https://nuxt.com/docs/guide/concepts/esm) page.

Many of the issues you'll come accross is using dependencies which are CJS. You'll need to find ESM alternatives or convert them yourself.

Node modules can be a challenging subject, if you need further guidance see [this article](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/).
::


### 2. Prepare your Nuxt v2 app

Before you start migrating, you should prepare your Nuxt v2 app to make the upgrade process easier.

::checkbox
Upgrade Nuxt v2
#tip
If you are on an earlier version, the first step is upgrading. 

This will identify any issues your app may have using the Vue composition API,
as the latest version uses [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html),
which ships with the composition API.

```bash
npm i nuxt@^2.15.4
# yarn add nuxt@^2.15.4
```
::

::checkbox
Enable component auto-imports
#tip
Nuxt 3 has auto-imports enabled by default, if you're not using this feature in Nuxt 2, you should enable it to identify
any component paths that need to be updated.

All manual component imports should be removed. 

See [Components Discovery](https://nuxtjs.org/docs/directory-structure/components/#components-discovery) for more information.

```ts [nuxt.config.ts]
export default {
    components: true
}
```
::

::checkbox
Audit your app
#tip
Your goal with the audit should be to identify any code and / or dependencies you can remove. The less code you have, the
less code you'll need to migrate.

Also check your assets folder for anything which can be removed.
::


## Migration

For each step of the migration, you should be testing to see if everything is working as expected. If your
app breaks, then you should be able to easily identify the rough cause of the issue.

### 1. Create the new app

The first step is creating our new apps boilerplate and migrate over config from nuxt.config.ts which will not break anything.

This cheat sheet requires a fresh Nuxt 3 project and migrating things over one by one. This helps you debug breaking changes easily.

::checkbox
Create a fresh Nuxt 3 app
#tip
You can do so with `npx nuxi init my-app`.

This will create a new Nuxt 3 project with the latest version of Nuxt 3 and some boilerplate.
::

::checkbox
Create compatible boilerplate
#tip

We're creating Nuxt 2 compatible boilerplate files. This will allow us to migrate single pieces easily.

```vue [app.vue]
<template>
<div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</div>
</template>
```

```vue [layouts/default.vue]
<template>
<div>
  <slot />
</div>
</template>
```

```vue [pages/index.vue]
<template>
<div>
  <h1>hello world</h1>
</div>
</template>
```
::

::checkbox 
Migrate Runtime Config / env
#tip
Follow the [Migrate Runtime Config](https://nuxt.com/docs/bridge/overview#update-runtime-config) doc.

The `env` key in nuxt.config is no longer supported, you should use runtime config exclusively.

You can safely ignore TypeScript issues this causes for now.

```diff
- privateRuntimeConfig: {
-   apiKey: process.env.NUXT_API_KEY || 'super-secret-key'
- },
- publicRuntimeConfig: {
-   websiteURL: 'https://public-data.com'
- }
- env: {
-   NUXT_API_KEY: process.env.NUXT_API_KEY
- }
+ runtimeConfig: {
+   apiKey: process.env.NUXT_API_KEY || 'super-secret-key',
    // reminder: `public` is exposed on client and server (DON'T PUT ANYTHING SENSITIVE)
+   public: {
+     websiteURL: 'https://public-data.com'
+   }
+ }
```
::


::checkbox
Migrate head
#tip
If you previously had head configuration in your nuxt.config, you should migrate it to app.head config.

If you're using `hid` in your head config, unless you have a good reason, you should remove it. Read [@vueuse/head v1 release notes](https://harlanzw.com/blog/vue-use-head-v1)
to learn more.

Note: Tags with `href` and `src` will not resolve relative links / aliases.
You will need to reference absolute links from the public directory. If you'd like to use aliases, you can use the [nuxt-unhead](https://github.com/harlan-zw/nuxt-unhead) module.

```ts
// nuxt 2
head: {
  meta: [
      { hid: 'description', name: 'description', content: 'My custom description' },
  ]
}
```

```ts
// nuxt 3
app: {
  head: {
    meta: [
      { name: 'description', content: 'My custom description' }
    ]
  }
}
```

::


::checkbox
Copy Static files
#tip
In Nuxt 3 the `/static` folder has been renamed to `/public`. 
Make the `public` directory and copy all of these files over.
::

::checkbox
Copy CSS / Assets
#tip
In Nuxt 3, the assets folder serves the same function.
Simply copy over your assets folder. 

Once done, update the `css` field.

```ts [nuxt.config.ts]
css: [
  '~/assets/main.css',
]
```

Most pre-processors will work with no extra config, you will just need to install the dependencies. 

For example, if you see an error like:

```bash
Preprocessor dependency "sass" not found. Did you install it? 
```

You will need to run `npm install -D sass`.

If your have issues with linked images within CSS you may need to use absolute links to the images in the public directory.

```css
/* Nuxt 2 - we have the file: assets/images/logo.png */
body {
  background-image: url('~/assets/images/logo.png');
}
```

```css
/* Nuxt 3 - we have the file: public/images/logo.png */
body {
    background-image: url('/images/logo.png');
}
```

You may have some node_module dependencies in your css entries, install each of these as needed.
::

### 2. Modules

Module migration can be a challenging part of the migration process. You will need to migrate each module one by one and test your app after each module.

Nuxt 2 modules are not compatible with Nuxt 3 out of the box, so many modules are not supported yet. I have tried to provide an 
upgrade path for the most popular modules which are not supported.

::checkbox
Copy over modules
#tip

In Nuxt 3 all modules are build time modules. You will need to copy over your modules from the `buildModules` and `modules` fields.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
    modules: [
       // buildModules example
      '@nuxt/typescript-build',
      '@nuxtjs/moment',
      'nuxt-build-optimisations',
       // modules example
      '@nuxtjs/axios',
      '@nuxtjs/auth',
      '@nuxt/content',
      '@nuxtjs/sitemap',
    ]
}
```
::


::checkbox
Remove redundant modules
#tip
The following modules can be safely removed as the Nuxt core provides the same functionality.

- @nuxtjs/typescript
- @nuxtjs/typescript-runtime
- nuxt-composition-api
- nuxt-dotenv
- nuxt-build-optimisations (nuxt-webpack-optimisations)
::

::checkbox
Remove @nuxtjs/axios, @nuxt/http
#tip
@nuxtjs/axios and @nuxt/http are not recommended with Nuxt 3. 

Instead, the best practice, is using the [$fetch / useFetch](https://nuxt.com/docs/migration/component-options/) API.

If are determined to use `$http` you can use [nuxt-alt/http](https://github.com/nuxt-alt/http). See the [Nuxt 3 and Axios](https://github.com/nuxt/framework/discussions/4514) discussion
for context on using axios.
::

::checkbox
Use alternative modules
#tip

#### @nuxtjs/auth

Official nuxt/auth support is a work-in-progress. In the meantime, you can use:

- [sidebase/nuxt-auth](https://github.com/sidebase/nuxt-auth)
- [nuxt-alt/auth](https://github.com/nuxt-alt/auth)
- [@nuxtjs/supabase](https://supabase.nuxtjs.org/)


#### @nuxtjs/pwa

Official nuxt/auth support is a work-in-progress. In the meantime, you can use:

[nuxt-pwa-module](https://github.com/kevinmarrec/nuxt-pwa-module)

#### @nuxtjs/i18n

Official support is in beta, check the [docs](https://v8.i18n.nuxtjs.org/).

#### @nuxtjs/proxy

This feature is coming to nitro route rules, you can track it here: https://github.com/unjs/nitro/issues/113.

In the meantime, you can use the [nuxt-alt/proxy](https://github.com/nuxt-alt/proxy) module.

#### @nuxtjs/eslint-module

The Nuxt 2 version of this module is called  `@nuxtjs/eslint-config`, you should remove this.

Instead, follow the [documentation](https://github.com/nuxt/eslint-config) for `@nuxt/eslint-config`.

#### @nuxtjs/sitemap

I'd recommended using [nuxt-seo-kit](https://github.com/harlan-zw/nuxt-seo-kit).

Alternatively, you can use:
- [nuxt-simple-sitemap](https://github.com/harlan-zw/nuxt-simple-sitemap)
- [@funken-studio/sitemap-nuxt-3](https://github.com/funkenstudio/sitemap-module-nuxt-3)

#### @nuxtjs/robots

I'd recommended using [nuxt-seo-kit](https://github.com/harlan-zw/nuxt-seo-kit).

Alternatively, create your own robots.txt file at `public/robots.txt`.

```text [public/robots.txt]
User-agent: *
Disallow: /
```

OR you can generate robots dynamically.

```ts [server/routes/robots.txt.ts]
export default defineEventHandler(
    e => `User-agent: *\nDisallow: /\nSitemap: https://YOUR_SITE/sitemap_index.xml`
)
```

#### @nuxtjs/vuetify

Official support is coming soon. You can use [nuxt-alt/vuetify](https://github.com/nuxt-alt/vuetify) in the meantime. 

#### @nuxtjs/device

Another thin wrapper, you can use the [ua-parser-js](https://github.com/faisalman/ua-parser-js) package directly.

```ts [composables/useDevice.ts]
import UAParser from 'ua-parser-js'

export function useDevice() {
  const parser = new UAParser()
  const { os, browser, device } = parser.getResult()

  return {
    os,
    browser,
    device,
    isMobile: device.type === 'mobile',
    isDesktop: device.type === 'desktop',
    isTablet: device.type === 'tablet',
    // etc
  }
}
```

```vue [pages/index.vue]
<script lang="ts" setup>
const { isDesktop, browser } = useDevice()
</script>
```

### @nuxtjs/moment

Module is a thin wrapper, you can make a simple plugin to replace it.

```ts [plugins/moment.ts]
import moment from 'moment'
import 'moment/locale/en'

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  moment.locale('en')
  moment.tz.setDefault('UTC')
  return {
      provide: {
        moment,
      }
  }
})
```

```vue [pages/index.vue]
<script setup lang="ts">
// access moment via $moment
const { $moment } = useNuxtApp()
</script>
```

#### @nuxtjs/gtm

You can create your own code to handle gtm.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  app: {
      head: {
        script: [
          {
             innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','YOUR_GTM_ID');`
          },
        ],
    },
  }
})
```

```vue [pages/index.vue]

#### bootstrap-vue

#### @nuxtjs/google-analytics

#### nuxt-facebook-pixel-module
::

::checkbox
Upgrade supported modules
#tip
If the module you're using supports Nuxt 3, it's important to check the migration notes. 
It's likely that the upgrade will include some
breaking changes.
::


### 3. State management

::checkbox
Consider if you need a state management library
#tip
Nuxt 3 ships with its own statement management with the [useState](https://nuxt.com/docs/getting-started/state-management) composable.

If you're using a state management library, you should consider if you need it.

Additionally, if you are rendering as a static app, you can always just reference global refs. This isn't recommended for
server-side rendering as state is shared between users.

```ts [composables/useCounter.ts]
import { ref } from 'vue'

export const counter = ref(0)

export function useCounter() {
  return {
    counter,
    increment() {
      counter.value++
    },
    decrement() {
      counter.value--
    }
  }
}
```
::

::checkbox
If you need state management, migrate to [Pinia](https://pinia.vuejs.org/ssr/nuxt.html#nuxt-2-without-bridge) or Vuex 4
#tip
If you're using Vuex 3, you will need to upgrade your state management, as Vue 3 does not support it.

Pinia is the recommended state management solution for Nuxt 3, but you can use [Vuex 4](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html) if you prefer.
::

### 4. Components

Components will only be parsed if they are imported. This means it's safe to copy over all our components and mixin files from Nuxt 2.


::checkbox
Copy over components / mixins
#tip
The folders have the same name and will be auto-imported. You don't need to add anything to nuxt.config.ts.

I'd recommend doing this one at a time and skipping any non-essential plugins.
::

::checkbox
Convert mixins to CAPI (optional)
#tip
It's recommended to convert your plugins and middleware to TypeScript.
::

::checkbox
Convert components to CAPI (optional)
#tip
It's recommended to convert your plugins and middleware to TypeScript.
::

### 5. Pages

This is the starting point of where things are going to break big time. You should repeat this step for each page.

::checkbox
Copy pages over one by one
#tip

Nuxt 3 uses a new file system routing system, which means that all our pages need to be converted to the new format.

- plugins
- layouts
- middleware
::

::checkbox
Follow component options migration guide
#tip
See [Migrate Component Options](https://nuxt.com/docs/migration/component-options).
::

::checkbox
Migrate to Composition API
#tip
While this is not required, it is highly recommended
(options API is supported using [defineNuxtComponent](https://nuxt.com/docs/api/utils/define-nuxt-component)).
The Composition API is a much better way to write Vue code and Nuxt provides
better support for it.

Use the [@nuxtjs/composition-api](https://composition-api.nuxtjs.org/getting-started/introduction) module. You can also
use the tool [vue-composition-convertor](https://github.com/miyaoka/vue-composition-converter) to give you a head start.
::

::checkbox
Migrate to TypeScript
#tip
Again, not required but highly recommended.
::


::checkbox
Migrate Mixins
#tip
Search for "require" in any components. If you find any, you'll need to convert them to ESM.
::


::checkbox
Find CJS issues
#tip
Search for "require" in any components. If you find any, you'll need to convert them to ESM.
::

::checkbox
Remove imports
#tip
Search for "require" in any components. If you find any, you'll need to convert them to ESM.
::

[//]: # (- asyncData ->useFetch / useAsyncData)
[//]: # (- nuxtServerInit___)

### 6. Testing

::checkbox
Migrate to Vitest
#tip
Nuxt 3 uses Vitest for testing. If you're using Jest or Mocha, you'll need to migrate.
::

### 7. Tips

::checkbox
Load static assets from absolute path (optional)
#tip
In Nuxt 2 it was common to load everything from `~/assets`, however with Nuxt 3 the default is to use absolute paths.

This way the bundler does not need to parse them. This will save you time when migrating and improve your build performance.

Simply move images which aren't going to change to `static` and load them from `/` instead of `~/assets`.
::


::checkbox
Switch to UnJS / VueUse where appropriate
#tip
The VueUse and UnJS packages all support Nuxt 2 and Nuxt 3. If you can migrate to using them over other dependencies,
you'll save yourself a lot of time.
::
