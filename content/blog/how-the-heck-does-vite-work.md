---
title: "How Does Vite Work - A Comparison to webpack"
description: "A deep-dive into the comparisons between the earliest Vite version and webpack. Discover what I learnt digging into internals and how I, correctly, guessed Vite was the next big thing."
publishedAt: '2020-12-01'
aside: false
status: published
image: "https://harlanzw.com/social/how-vite-works.png"
tags:
  - webpack
  - vite
newsletter: false
---

::tip
Note: This article was written for the alpha of Vite. I'd recommend reading Patak's great article on [The Vite Ecosystem](https://patak.dev/vite/ecosystem.html).
::

In rebuilding my old Nuxt.js personal site, I wanted to challenge myself to learn the latest tech, the unknown.

The unknown was the new project by Evan You: [⚡ Vite](https://github.com/vitejs/vite) (/veet/). Called Fast, for the 🇫🇷 Frenchies.

I'll be comparing how Vite works to the standard [webpack](https://github.com/webpack/webpack) config using [webpack-dev-server](https://github.com/webpack/webpack-dev-server), which all major Vue frameworks
are using.

We'll be looking at how Vite no-bundling works, by first looking at how webpack's bundling works and what the difference is. Afterwards I'll give you some
recommendations for setting up Vite for yourself.

Vite could the next best thing in tooling, currently, it's still in a pre-release stage though so be careful out there 🐛.

## A Recap on Vite

Vite is a web development build tool which supports Vue, React and Preact. It's an experimental new direction in how build tools can work with a greenfield ecosystem.

Vite's core functionality is similar to webpack + webpack-dev-server with some core improvements
on developer experience:

- ⌛ Less time waiting for your app to start, regardless of app size
- 🔥 Hot module reloading (HMR) that is basically instant, regardless of app size
- 🔨 On-demand compilation
- 🙅‍♂️ Zero configuration for numerous pre-processors out of the box
- 📜 Esbuild powered typescript / jsx (super quick)

### Speed Example

To give you a quick idea on how much faster it is, the below comparison is for Vue CLI which uses webpack. The bigger your app
is the more noticeable the speed difference will be.

<figure>

|   | Build Time        | Dev Server Start Time  | Dev Page Load Time  |
| ------------- |-------------:| -----:| -----:|
| Vue CLI     | <span class="text-red-400">5.14s</span> | <span class="text-red-400">2568ms</span> | <span class="text-yellow-400">320ms</span> |
| Vite     | <span class="text-green-500">2.39s</span> | <span class="text-green-500">232ms</span>️ | <span class="text-yellow-500">379ms</span> |

<figcaption>New Vue 3 project / 10 components / no Babel / 2nd run, in development.</figcaption>
</figure>

## Vite vs webpack

The main functional difference you'll notice with Vite and your webpack app, is how code is served in development and which modules are supported.

Don't worry if the below terms don't make sense to you, we'll be exploring them below.

### webpack (Nuxt.js / Vue CLI / etc)
- Supported Modules: [ES Modules](https://www.2ality.com/2014/09/es6-modules-final.html), [CommonJS](http://wiki.commonjs.org/) and [AMD Modules](https://github.com/amdjs/amdjs-api/wiki/AMD)
- Dev Server: Bundled modules served via webpack-dev-server using [Express.js](https://expressjs.com/) web server
- Production Build: webpack

### Vite
- Supported Modules: [ES Modules](https://www.2ality.com/2014/09/es6-modules-final.html)
- Dev Server: Native-ES-Modules, served via Vite using a [Koa](https://github.com/koajs/koa) web server
- Production build: [Rollup](https://github.com/rollup/rollup)

::tip
Check out Mozilla's <a href="https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/" target="_blank">article</a> on ES Modules if they're new to you.
::

## Understanding webpack

To understand how Vite works, it's best to look at how webpack works first. Even with its popularly, understanding webpack can be intimidating, so I'll try to keep it simple.

webpack is versatile in what you can do with it, but at its core, it will:
- Starting with an entry file, build a tree of your dependencies: all the imports, exports, requires from your code/files
- Transform / compile modules: think transpiling js for older browsers, turning SCSS into CSS
- Use algorithms to sort, rewrite and concatenate code
- Optimise

### webpack In Development

Assuming you're using one of the main Vue frameworks, when you start your app in development, it is going to do a few things:
1. Bundle all of your code
2. Start the webpack-dev-server, the Express.js web server which will serve the bundled code
3. Setup sockets which will handle the Hot Module Reloading

As you may notice with your own apps, the bigger they grow, the longer you have to wait to start coding.

![The Nuxt logo is almost burnt into my monitor at this point.](/blog/nuxt-start.png){width="789" height="549"}

Bundling in development is quicker because you don't need to do as much with the code, however,
as your app grows, it will become painfully slow, especially on older machines.

### webpack Component Example

I created a default Vue 3 [Vue CLI](https://cli.vuejs.org/) project, which has an entry `App.vue` file using the `HelloWorld.vue` component.
Let's see how this component gets to my browser.

HelloWorld.vue component:

```vue [HelloWorld.vue]
<script>
export default {
  props: {
    msg: String
  }
}
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  color: green;
}
</style>
```

When I start my app and visit localhost I get the following HTML from the Express.js server.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="/js/chunk-vendors.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
  </body>
</html>
```

You'll notice we have 2 script files there: `chunk-vendor.js` and `app.js`. On inspecting them you'd see a lot of gibberish looking code.
 it helps to use the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) to see how it works visually.

#### chunk-vendors.js

These are third-party modules, usually coming from `node_modules`. The two main libraries in here are Vue itself and sockjs which is used for HMR.

![The two top libraries are Vue.js and Sock.js (For HMR)](/blog/vendor-chunk.png){width="1860" height="960" max-height="400"}

#### app.js

 This is all the code for my application. It contains components, assets, etc. You'll notice that for an SFC it splits
 it into multiple modules.

![My app is two components, App.vue and HelloWorld.vue](/blog/app-chunk.png){width="1857" height="953" max-height="450"}

Taking a quick look at the `app.js` file, we can find some of the `HelloWorld` component code. As you can see in the above image,
all parts of the SFC are separate modules: the wrapper, CSS, template, js.

The wrapper module is defining and importing the other models, some beautiful code.

```js
/***/ "./src/components/HelloWorld.vue":
/*!***************************************!*\
  !*** ./src/components/HelloWorld.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HelloWorld_vue_vue_type_template_id_469af010_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelloWorld.vue?vue&type=template&id=469af010&scoped=true */ \"./src/components/HelloWorld.vue?vue&type=template&id=469af010&scoped=true\");\n/* harmony import */ var _HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HelloWorld.vue?vue&type=script&lang=js */ \"./src/components/HelloWorld.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport *//* harmony import */ var _HelloWorld_vue_vue_type_style_index_0_id_469af010_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HelloWorld.vue?vue&type=style&index=0&id=469af010&scoped=true&lang=css */ \"./src/components/HelloWorld.vue?vue&type=style&index=0&id=469af010&scoped=true&lang=css\");\n\n\n\n\n\n_HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render = _HelloWorld_vue_vue_type_template_id_469af010_scoped_true__WEBPACK_IMPORTED_MODULE_0__[\"render\"]\n_HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].__scopeId = \"data-v-469af010\"\n/* hot reload */\nif (true) {\n  _HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].__hmrId = \"469af010\"\n  const api = __VUE_HMR_RUNTIME__\n  module.hot.accept()\n  if (!api.createRecord('469af010', _HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])) {\n    api.reload('469af010', _HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n  }\n  \n  module.hot.accept(/*! ./HelloWorld.vue?vue&type=template&id=469af010&scoped=true */ \"./src/components/HelloWorld.vue?vue&type=template&id=469af010&scoped=true\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _HelloWorld_vue_vue_type_template_id_469af010_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelloWorld.vue?vue&type=template&id=469af010&scoped=true */ \"./src/components/HelloWorld.vue?vue&type=template&id=469af010&scoped=true\");\n(() => {\n    api.rerender('469af010', _HelloWorld_vue_vue_type_template_id_469af010_scoped_true__WEBPACK_IMPORTED_MODULE_0__[\"render\"])\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n\n}\n\n_HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].__file = \"src/components/HelloWorld.vue\"\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_HelloWorld_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);");
```

The main takeaway here is that within the `app.js` file contains all modules for my app.

webpack does let you chunk the bundles how you like, for Nuxt.js it chunks routes individually. The more chunks though,
the more requests and more potential blocking js.

You may see the problem here, we have multiple monolith files that need to be generated anytime we want to use our app.
When we change a file for HMR, we need to regenerate the entire file.

## Understanding Vite

Vite doesn't set out to be a new bundler. Rather, it's a pre-configured build environment using the Rollup
bundler and a tool for local development.

### Vite In Development

Vite makes the assumption that developers are going to be using the latest browser versions, so it can safely rely on the
latest JS functionality straight from the browser - in other words, no babel transpiling!

When you start Vite for the first time pre-optimisations will be done on your `node_modules`, then [Koa](https://github.com/koajs/koa),
a light-weight node web server starts to serve your app.

There is no bundling or compiling needed to start the dev server, so it's damn quick (< 300ms).

When you open your Vite app you'll be served the `index.html` from the server. The browser is going to read the `index.html`
and know how to parse the Native-ES-Module code.

```html
<script type="module">import "/vite/client"</script>
<div id="app"></div>
<script type="module" src="/@app/index.js"></script>
```

Parsing the Native-ES-Module means it will read the `export` and `import` lines from your code. It will convert those
lines into HTTP requests back to the server, where it will again read the `export` and `import` lines and make new requests.

It will keep going through like this with your dependencies recursively, in a waterfall process, until everything has been resolved.

![Recursive network requests triggered from the entry - VitePress.](/blog/network-requests.png){width="964" height="551" max-height="450"}

### Vite Component Example

Let's take a look at how these requests are working in the browser. After I open my app at `http://localhost:3000`, the browser has fetched the following `index.js` file from the web server:

```js{5}
import '/@theme/styles/main.scss?import';
import Layout from '/@theme/Layout.vue';
import NotFound from '/@theme/NotFound.vue';
import CardPost from '/@theme/components/CardPost.vue';

const theme = {
    Layout,
    NotFound,
    enhanceApp({ app, }) {
        app.component('CardPost', CardPost)
    }
};
export default theme;
```

::tip
Normally, in webpack, you would have to transpile this code to something legacy browsers can understand. Newer browsers know what to do with it, see [es6 module dynamic import](https://caniuse.com/es6-module-dynamic-import).
::

Let's drill into that highlighted line which is requesting the CardPost SFC. The browser will turn that import into a request for `http://localhost:3000/@theme/components/CardPost.vue`.

```vue [CardPost.vue]
<script>
import posts from '../../posts'

export default {
  props: {
    postIndex: {
      type: Number,
      required: true,
    }
  },
  computed: {
    post() {
      return posts[this.postIndex]
    }
  }
}
</script>

<template>
  <div class="card-post">
    ...
  </div>
</template>

<style lang="scss" scoped>
.card-post {
  ...
}
</style>
```

Once the web server gets this request, it will need to compile the `CardPost.vue` file to javascript and send it back. Vite has many
optimisations around the Vue compiling so this takes no time.

Let's see what comes through:

```js [CardPost.vue - Transpiled]
import posts from '/.vitepress/posts.ts'

import '/@theme/components/CardPost.vue?type=style&index=0'
import { render as __render } from '/@theme/components/CardPost.vue?type=template'

const __script = {
  props: {
    postIndex: {
      type: Number,
      required: true,
    }
  },
  computed: {
    post() {
      return posts[this.postIndex]
    }
  }
}
__script.__scopeId = 'data-v-287b4794'
__script.render = __render
__script.__hmrId = '/@theme/components/CardPost.vue'
typeof __VUE_HMR_RUNTIME__ !== 'undefined' && __VUE_HMR_RUNTIME__.createRecord(__script.__hmrId, __script)
__script.__file = '/home/harlan/sites/new.harlanzw.com/app/.vitepress/theme/components/CardPost.vue'
export default __script
```

Cool, so quite a bit going on here. The main thing to note here is how it's split up the SFC into different modules which
will need separate requests to fetch. It hasn't bundled these imports into the SFC or some other monolith file.

- Dependencies: `/.vitepress/posts.ts`
- Template: `/@theme/components/CardPost.vue?type=template`
- Stylesheet: `/@theme/components/CardPost.vue?type=style&index=0`

If you're curious, this is what the style component response looks like, some nifty for sure.

```js  [CardPost.vue - CSS]
import { updateStyle } from '/vite/client'

const css = '.card-post[data-v-287b4794] {\n  position: relative;\n}\n.card-post .prose[data-v-287b4794] {\n  max-width: 100% !important;\n}\n.card-post__link[data-v-287b4794] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  content: " ";\n  z-index: 1;\n}\n.card-post__content[data-v-287b4794] {\n  background-color: white;\n  z-index: 1;\n}\n.card-post__effect[data-v-287b4794] {\n  z-index: -1;\n  content: " ";\n  height: 30px;\n  width: 100%;\n  position: absolute;\n  background-color: #059669;\n  transition: 0.2s;\n  opacity: 0;\n  top: 30px;\n}\n.card-post:hover .card-post__effect[data-v-287b4794] {\n  top: -5px;\n  opacity: 1;\n  transform: rotate(0.25deg);\n}'
updateStyle('287b4794-0', css)
export default css
```

You can see how the above allows the Hot Module Replacement to work efficiently. When you have a module that is changed,
say the styles within a component, instead of reloading the entire component tree, only the style module needs to be replaced.

You can also imagine with the above, where Vite slows down. Imagine hundreds of HTTP requests which rely on nested HTTP requests, recursively.
Fortunately, there are optimisation to avoid this situation after the first load. The server will return a 304
Unmodified HTTP Status code for modules which haven't changed, meaning they will use the browser's cached version of the file.

Vite scales well for any app size because it only needs to request the modules for the route you're on.

## Production Builds

Since Vite is using Rollup, pre-configured, you'd expect a similar output from Vite as webpack. Vite does boast a quicker
builder and potentially a smaller artifact size, as Rollup is a more efficient bundler than webpack.

The main gotcha is that Vite can still only support ES Modules in the production build, meaning you can't have any dependencies
which don't have ES Module exports.

Vite is also pre-configured to handle your build as a universal app. A universal app is built using a client (virtual browser)
and a server (node). Allowing it to pre-render the HTML pages, so robot crawlers can fetch your page content without executing
js and speeding up the initial load for users. That means SEO friendly static sites out of the box 🎉.

## Summary

While I haven't touched on a lot of the complexities of Vite and webpack, I've tried to show you the main difference, how
bundling and no-bundling look in action.

Hopefully you've seen why Vite is promising alternative. There is so much potential in the ecosystem at the moment, watch this space, given 12-months we could see an explosion of Vite related projects.

If you want to find out more about Vite, I'd watch Evan's talk on [Vite & VitePress](https://www.youtube.com/watch?v=xXrhg26VCSc&).

## Getting started with Vite

I'd recommend just spinning up bare-bones Vite to get a feel for it. It's really easy, takes less than a minute.

```shell [bash]
npm init vite-app
```

Once you are sold, it's worth checking out [the ecosystem](https://github.com/vitejs/awesome-vite) before you build.

### Recommendations

:::tip
You shouldn't be looking to replace Vue CLI or webpack with Vite for existing projects yet, but it may be valuable to check out for new smaller scoped projects.
:::

The Vite ecosystem isn't that mature yet, the two main projects I'd recommend checking out are [VitePress](https://vitepress.vuejs.org/) and [Vitesse](https://github.com/antfu/vitesse).

If you are in need of a documentation site then VitePress is awesome, you can follow the VuePress documentation to fill in any gaps. VitePress abstracts away
the Vite configuration, which will be limiting for non-documentation sites.

Otherwise, I'd choose Vitesse as it's going to give you more flexible on customising your app. Vitesse offers a pre-configured `vite.config.js`, so you can easily
strip anything out you don't need to add whatever you'd like to it.

If you like my blog (VitePress + TailwindCSS), then you're more than welcome to [clone it](https://github.com/harlan-zw/harlanzw.com).

## Thanks for reading

If you like the technical side of Vue and Laravel, I'll be posting regular articles on this site. The best
way to keep up to date is by following me [@harlan_zw](https://twitter.com/harlan_zw).
