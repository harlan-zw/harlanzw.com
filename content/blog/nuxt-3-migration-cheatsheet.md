---
title: "Nuxt 3 Migration Simplified: A Cheat Sheet"
description: "Effortlessly migrate to Nuxt 3 with our cheat sheet. It includes step-by-step instructions and helpful tips for a seamless transition."
publishedAt: "2022-12-27"
aside: false
tags:
- nuxt
---

## Introduction

Upgrading to from Nuxt 2 to Nuxt 3 is intimidating. There are a lot of changes, and it's easy to get lost in the process.

I've started this cheat sheet to simplify the upgrade process for my own use and to help others. It's a work in progress and not exhaustive, I'll be updating it as I migrate more sites.

Upgrading will take some time, depending on the size of your project and your prior experience. It will take patience and persistence.

If you are only trying to upgrade modules, I've documented the upgrade path for [23 modules](#2-modules).

Let's do this!


## Resources

### Links

- [Nuxt 3 - Docs](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt 3 - Official Migration Guide](https://nuxt.com/docs/migration/overview)
- [Nuxt 3 - Migration guide discussion](https://github.com/nuxt/framework/discussions/3989)
- [nuxt.new](https://nuxt.new)

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
- [Vite.js](https://vitejs.dev) and [Rollup](https://rollupjs.org/) – Backbone of Nuxt 3 bundling.
- [Nuxt Movies](https://github.com/nuxt/movies) – A complex Nuxt 3 example app.

## Pre-migration 

Before you start upgrading, it's important to familiarise yourself with the new features and changes in Nuxt 3 and prepare your 
project for the upgrade.

### 1. Get familiar with Nuxt 3

Learn the key differences between Nuxt 2 and Nuxt 3 and the new technologies that power it.

::checkbox
[Nuxt 3 Architecture](https://nuxt.com/docs/getting-started/introduction)
#tip
While there are many similarities to Nuxt 2, the underlying architecture is completely new, more complex and more powerful.

Start by learning the differences between:
- [Nuxt](https://nuxt.com/docs/guide/going-further/internals#the-nuxt-interface) (core context)
- [Nuxt App](https://nuxt.com/docs/guide/going-further/internals#the-nuxtapp-interface) (app context)
- [Nitro](https://nuxt.com/docs/guide/concepts/server-engine) (server engine)
- Nuxi (command line interface)

You may want to re-familiarise yourself with the [Rendering modes](https://nuxt.com/docs/guide/concepts/rendering) (SSR, SPA, Static).

Daniel Roe's talk [What happens when you start Nuxt 3](https://www.youtube.com/watch?v=IVA_76hKEwE) is a great place to start.
::

::checkbox
Read the [official migration guide](https://nuxt.com/docs/migration/overview) 
#tip
Read the official migration guide to get a high-level overview of the changes.

Keep this open as you'll reference this as you continue on with the migration process.
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

You don't need to be an expert, but you should be able to read and understand the Nuxt 3 skeleton code. 

You can learn the basics with [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).
::

::checkbox
Learn about modules: CJS and ESM
#tip
Nuxt 3 requires EmcaScript modules, so you'll need to convert your CommonJS modules. See the Nuxt [ES modules](https://nuxt.com/docs/guide/concepts/esm) page.

Many of the issues you'll come across are due to using dependencies which are CJS.
So understanding the difference between them can be critical.

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

Additionally, check your asset folder for anything which can be removed.
::


## Migration

This cheat sheet requires a fresh Nuxt 3 project and migrating things over one by one.

In each step of migrating, you should test to see if everything is working. 
If there are bugs, then you will be able to debug and get help for them easily.

### 1. Create the new app

The first step is creating the new apps boilerplate and migrate over safe config from `nuxt.config.ts`.

::checkbox
Create a Fresh Nuxt 3 App
#tip
You can do so with `npx nuxi init my-app`.

This will create a new Nuxt 3 project with the latest version of Nuxt 3 and some boilerplate.
::

::checkbox
Create Boilerplate
#tip

We're creating Nuxt 2 compatible boilerplate files. This will allow us to migrate single pieces easily.

By default, Nuxt 3 does not provide page routing and layouts. To enable them we update `app.vue` with `NuxtLayout` and `NuxtPage`.

```vue [app.vue]
<template>
<div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</div>
</template>
```

Create an empty default layout file that will be updated later.

```vue [layouts/default.vue]
<template>
<div>
  <slot />
</div>
</template>
```

Create a basic index page so we can see our changes.

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

The `env` key in `nuxt.config.ts` is no longer supported, you should use runtime config exclusively.

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
If you previously had head configuration in your `nuxt.config.ts`, you should migrate it to `app.head` config.

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

If you're having issues with linked images within CSS,
you may need to use absolute links to the images in the public directory.

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

In Nuxt 3 all modules should belong under the `modules` key. You will need to copy over your modules from the `buildModules` and `modules` fields.

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
The following modules can be safely removed as functionality they provide is redundent.

- [@nuxtjs/typescript](https://typescript.nuxtjs.org/)
- [@nuxtjs/typescript-runtime](https://typescript.nuxtjs.org/)
- [@nuxtjs/composition-api](https://composition-api.nuxtjs.org/)
- [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)
- [nuxt-build-optimisations / nuxt-webpack-optimisations](https://github.com/harlan-zw/nuxt-webpack-optimisations)
::

::checkbox
Remove Modules No Longer Recommended
#tip
[@nuxtjs/axios](https://axios.nuxtjs.org/) and [@nuxt/http](https://http.nuxtjs.org/) are not recommended with Nuxt 3. 

It's best practice to use the [$fetch / useFetch](https://nuxt.com/docs/migration/component-options/) API.

If are determined to use `$http` you can use [nuxt-alt/http](https://github.com/nuxt-alt/http). 

See the [Nuxt 3 and Axios](https://github.com/nuxt/framework/discussions/4514) discussion for additional context.
::

::checkbox
Use alternative modules
#tip

#### @nuxtjs/auth

Official `@nuxt/auth` support is a [work-in-progress](https://nuxt.com/docs/community/roadmap#core-modules).

In the meantime, you can use:

- [sidebase/nuxt-auth](https://github.com/sidebase/nuxt-auth)
- [nuxt-alt/auth](https://github.com/nuxt-alt/auth)
- [@nuxtjs/supabase](https://supabase.nuxtjs.org/)


#### @nuxtjs/pwa

Official nuxt/auth support is a work-in-progress. 

In the meantime, you can use:

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

Not currently supporting Nuxt 3.

Instead, you can use:
- [nuxt-simple-sitemap](https://github.com/harlan-zw/nuxt-simple-sitemap) or [nuxt-seo-kit](https://github.com/harlan-zw/nuxt-seo-kit).
- [@funken-studio/sitemap-nuxt-3](https://github.com/funkenstudio/sitemap-module-nuxt-3)

#### @nuxtjs/robots

Not currently supporting Nuxt 3.

Instead, you can use:
- [nuxt-simple-robots](https://github.com/harlan-zw/nuxt-simple-robots) or [nuxt-seo-kit](https://github.com/harlan-zw/nuxt-seo-kit).

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

Not supporting Nuxt 3.

Create your own plugin to detect the device instead, you can use the [ua-parser-js](https://github.com/faisalman/ua-parser-js) package directly.

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

Not supporting Nuxt 3.

Create your own plugin to use Moment instead.

```ts [plugins/moment.ts]
import moment from 'moment'
import 'moment/locale/en'

export default defineNuxtPlugin(nuxtApp => {
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

#### @nuxtjs/fontawesome

See the [Using FontAwesome in Nuxt 3](https://github.com/nuxt/framework/discussions/3823) discussion for plugin code sample.


#### @nuxtjs/dayjs

See [Nuxt3 support](https://github.com/nuxt-community/dayjs-module/issues/376) for plugin code sample.

#### @nuxtjs/toast

See [Examples of using the @nuxtjs/toast or any vue toast plugin?](https://github.com/nuxt/framework/discussions/2732) discussion for plugin code sample.

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

#### bootstrap-vue

See [nuxt3 starter?](https://github.com/cdmoro/bootstrap-vue-3/issues/232) issue for code sample.

Work in progress.

#### @nuxtjs/google-analytics

See [Vue Plugins](https://nuxt.com/docs/guide/directory-structure/plugins/#vue-plugins) from the docs for an example of how to use Google Analytics with Nuxt 3.
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

Additionally, if you are dealing with data client side, you can always reference global refs. This isn't recommended for
server-side rendering as state is shared between users.

```ts [composables/useCounter.client.ts]
import { ref } from 'vue'

// You can import this counter from any file and the data will stay in sync
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
The folders have the same name and will be auto-imported. You don't need to add anything to `nuxt.config.ts`.

I'd recommend doing this one at a time and skipping any non-essential plugins.
::

::checkbox
Follow Component Options Migration
#tip
See the [Component Options Migration](https://v3.vuejs.org/guide/migration/composition-api.html#component-options-migration) guide for more information.
::

::checkbox
Migrate to Composition API or `defineNuxtComponent`
#tip
Using the composition API over the options API is the recommended way to write Nuxt code. However, it can be quite time-consuming for
existing projects.

If you have a large app, you may want to keep using the options API for now and migrate to the composition API later.

Doing so is possible with the `defineNuxtComponent` function.

```vue [components/MyComponent.vue]
<script setup lang="ts">
export default defineNuxtComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log(this.name)
  }
})
</script>
```
::

::checkbox
Migrate to TypeScript (optional)
#tip
Using TypeScript is the recommended way to write Nuxt code.

If you have a large app, you may want to keep using plain JavaScript and migrate to TypeScript later.
::

### 5. Pages / Layouts / Plugins

This is the starting point of where things are going to break big time. You should repeat this step for each page.

::checkbox
Copy pages over one by one
#tip

Nuxt 3 uses a new file system routing system, which means that all our pages need to be converted to the new format.

- plugins
- layouts
- middleware

Work in progress.
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
Work in progress.
::


::checkbox
Find CJS issues
#tip
Search for "require" in any components. If you find any, you'll need to convert them to ESM.
::

::checkbox
Remove imports
#tip
Work in progress.
::

[//]: # (- asyncData ->useFetch / useAsyncData)
[//]: # (- nuxtServerInit___)

### 7. Global Middleware / Server Routes

### 6. Testing

::checkbox
Migrate to Vitest
#tip
Nuxt 3 uses Vitest for testing. If you're using Jest or Mocha, you'll need to migrate.
::

## Going Further

### 1. Tips

::checkbox
Load static assets from an absolute path
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

### 2. Common Errors
