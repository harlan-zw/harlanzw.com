---
title: "Building a Vue Auto Component Importer - A Better Dev Experience"
description: "Components magically being imported into your app is the latest developer experience trend in Vue. Why does it exist and how does it work?"
publishedAt: '2020-12-22'
excerpt: "Having component folders auto-magically imported into your app is the latest craze. How does it work and is it good?"
image: "https://harlanzw.com/social/vue-automatic-component-imports.png"
tags: 
 - webpack
 - vue
---

When first learning Vue, you are taught you need to import and add components to `components` in the script block.

```vue
<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  components: {
    HelloWorld
  }
}
</script>

<template>
  <HelloWorld />
</template>
```

However, there's been a recent trend to "upgrade" the Vue developer experience (DX), having components magically import themselves
at compile-time.

```vue
<template>
  <HelloWorld />
</template>
```

In the wild, you can find auto component imports in most popular Vue frameworks, as part of the core or a plugin.

- [Nuxt Components](https://github.com/nuxt/components)
- [Vuetify](https://github.com/vuetifyjs/vuetify-loader)
- [Chakra](https://github.com/segunadebayo/chakra-ui)
- [Vue CLI](https://github.com/harlan-zw/vue-cli-plugin-import-components) (built by me)
- [Vite](https://github.com/antfu/vite-plugin-components)

This article will look at: why automatic component imports exist, how you can easily build our own auto component importer using
a Webpack loader and what the performance cost of using them has on your app.

Finally, we'll look at some other compile-time DX upgrades that are possible.


## Why Automatic Component Imports?

The _why_ that comes first to my mind, is the developer experience is great. No more confusion or typos on import paths,
refactoring becomes easier and there's less code overall.

The unintuitive but equally great advantage is found in the problem that this feature first solved.

The UI framework [Vuetify](https://vuetifyjs.com/) is a huge library of over 80 components, coming in at [99.4KB](https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.17/vuetify.js)
for their scripts. As far as I know, they were the first to introduce automatic component imports.

### Problem: UI Framework Bloat

One of the complaints you'll hear about using a UI framework over something simple like [TailwindCSS](https://tailwindcss.com/),
is the bloat it will add to your app.

This is a valid concern. It's unlikely your application is going to need half the components that a UI framework has to offer. Forcing
browsers to download code that will never run, dead code, is not ideal.

Additionally, this component bloat can make import paths harder to work with and further scope for issues to pop up.

So, how do Vuetify and other UI frameworks overcome their inherent bloat?

### Solution: webpack Optimisations

As is the way, webpack is here to magically solve our problems with [tree shaking](https://webpack.js.org/guides/tree-shaking/) and [code splitting](https://webpack.js.org/guides/code-splitting/) optimisations.

If tree shaking is new to you, you can think of it as an optimisation to remove code that isn't explicitly used. Banishing
'dead' code to the shadow realm.

The tree shaking optimisation requires ES2015 module syntax, (i.e. `import` and `export`) and a production build. The code can't be compiled
to CommonJS modules (i.e. `require`) for it to work.

So how does all this relate to automatic component imports?

With Vuetify handling the imports of your components (_[à la carte](https://vuetifyjs.com/en/features/treeshaking/)_ as they call it), they
can ensure webpack optimisations are running out of the box for your app with their component library.

> The A la carte system enables you to pick and choose which components to import, drastically lowering your build size.

> This will also make code-splitting more effective, as webpack will only load the components required for that chunk to be displayed.


## Fundamental: How Does webpack Load Vue Files?

Before we jump into building our own automatic component importer, we'll need to have a basic understanding of how webpack loads Vue files.

When you request a resource (such as a file) in webpack, it pushes the request through a pipeline of webpack loaders to resolve the output. A webpack loader is a piece of code which will transform a resource from one thing into another, it has an `input` and `output`.

For example, the [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/) will read a file and give you the string contents.
The `input` is a path to a file in your filesystem, the `output` is the string contents of the file.

```js
import txt from 'raw-loader!./hello.txt'
// txt=HelloWorld
```

The `vue-loader` is the loader for `.vue` files. The loader compiles and bundles your component Single File Component (SFC) into code
that the browser can understand and run.


### Vue Loader in Action

Let's take a look at an example of input and output from the vue-loader.

#### Input: App.vue

This is the default entry file for Vue CLI with Vue 3.

```vue
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

#### Output: App.vue

Internally, the loader parses this code using the compiler, getting an SFC descriptor object that is used to create the
final string output of the loader.


```js
import { render } from './App.vue?vue&type=template&id=7ba5bd90'
import script from './App.vue?vue&type=script&lang=js'

import './App.vue?vue&type=style&index=0&id=7ba5bd90&lang=css'
export * from './App.vue?vue&type=script&lang=js'
script.render = render
script.__file = 'src/App.vue'

export default script
```

Note: I've removed the Hot Module Reloading (HMR) code for simplicity here.

The output of the loader isn't that important to understand, just know that the vue-loader has an in and out function. The output
is usually parsed to another loader such as [babel-loader](https://github.com/babel/babel-loader) before being chunked.

## Building an Automatic Component Importer

If you have some spare time, I'd encourage you to join along. You can use [Vue CLI](https://cli.vuejs.org/) with the Vue 3 preset.

```shell
vue create auto-component-importer -p __default_vue_3__
```

To begin, let's remove the manual import from the entry SFC, like so:

### New App.vue

```vue [App.vue]
<script>
export default {
  name: 'App',
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

When we load our `App.vue`, the `HelloWorld` doesn't work, as expected. Our goal is to get it to work without touching the Vue code.

### Step 1. Modify the webpack Configuration

We need to make sure the loader we'll be making is going to run after the vue-loader.

```js [./vue.config.js]
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rules
      .get('vue')
      .use('components')
      .loader(require.resolve('./imports-loader'))
      .before('vue-loader')
      .end()
  }
}
```

If you'd like to see the raw webpack config example, open the below.

<details>
  <summary>webpack.config.js example</summary>

```js [webpack.config.js]
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
```

Knowing that webpack loaders are loaded from bottom to top, we would modify the configuration as so:

```js [webpack.config.js]
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: require.resolve('./imports-loader'),
          },
          {
            loader: 'vue-loader',
          }
        ]
      },
    ]
  }
}
```
::tip
Normally a webpack would handle this configuration changing for you.
::
</details>


Now we create the loader called `imports-loader.js` in your apps root directory. We're going to make sure we only run it for the virtual SFC module.

```js [imports-loader.js]
module.exports = function loader(source) {
  // only run for the virtual SFC
  if (this.resourceQuery)
    return source

  console.log(source)
  return source
}
```

The `source` variable is the output of the vue-loader, the [Output: App.vue](#output-app-vue).

Here we can now change anything about how our components work by modifying the vue-loader output.

### Step 2. Dumb Compile-Time Import

As a proof of concept, let's try to import the `HelloWorld.vue` component so our [New App.vue](#new-app-vue) works.

At this stage, we can just append the import code on to the `source`.

```js [imports-loader.js]
module.exports = function loader(source) {
  // only run for the virtual SFC
  if (this.resourceQuery)
    return source

  return `${source}
import HelloWorld from "@/components/HelloWorld.vue"
script.components = Object.assign({ HelloWorld }, script.components)
`
}
```

Your `App.vue` now knows what the HelloWorld component is and works. Try it yourself.

Note: This is a _dumb_ solution, as it will be modifying `HelloWorld.vue` to also import itself.

### Step 3. Making it smart

A smarter solution would give us the ability to add components to our component folder and use them straight away without
any imports.

#### a. Scan components

The first step in making it smarter is we need to create a map of the components files we want to automatically import.

We recursively iterate over the components folder and do some mapping.

```js [a. Scan components]
const base = './src/components/'
const fileComponents = (await globby('*.vue', { cwd: base })).map((c) => {
  const name = path.parse(c).name
  const shortPath = path.resolve(base).replace(path.resolve('./src'), '@')
  return {
    name,
    import: `import ${name} from "${shortPath}/${c}"`
  }
})
// [ { name: 'HelloWorld', import: 'import HelloWorld from "@/components/HelloWorld.vue"' } ]
```

#### b. Find the template tags

To understand what components are being used, we need to have our new loader to compile the SFC `<template>` blocks.

```js [b. Find the template tags]
const compiler = require('@vue/compiler-sfc')
const parsed = compiler.parse(fs.readFileSync(`${this.context}/${path.basename(this.resourcePath)}`, 'utf8')).descriptor
const template = compiler.compileTemplate({
  id: 'tmp',
  source: parsed.template.content,
  filename: this.resourcePath,
})
const componentTags = template.ast.components
// [ 'HelloWorld' ]
```

Note: For simplicity, we're using Vue 3's compiler. The above won't work for Vue 2.

#### c. Matchmaking

With our freshly compiled template, we need to match the components we found in our template with the mapped component files
from [a. Scan Components](#a-scan-components).

```js [c. Match making]
const matches = []
componentTags.forEach(tag => matches.push(first(filter(fileComponents, c => c.name === tag))))
// [ { name: 'HelloWorld', import: 'import HelloWorld from "@/components/HelloWorld.vue"' } ]
```

If you wanted to match non-PascalCase names, you would modify this matcher function.

#### d. Insert the new dynamic imports

The final piece of the puzzle is appending the list of matched components and inserting the import line and assigning
the components.

```js [d. Insert the new dynamic imports]
if (!matches.length)
  return source

const newContent = `
${matches.map(c => c.import).join('\n')}
script.components = Object.assign({ ${matches.map(c => c.name).join(', ')} }, script.components);
`
const hotReload = source.indexOf('/* hot reload */')
if (hotReload > -1)
  source = `${source.slice(0, hotReload) + newContent}\n\n${source.slice(hotReload)}`
else
  source += `\n\n${newContent}`

return source
```

We need to insert the new content before the HMR code if available, otherwise we need to restart our app to find
new components.

### Putting it all together

Below is the full `imports-loader.js` for reference. This loader should _just work_. Create
a new component and then use it straight away, make sure you use PascalCase.

```js [imports-loader.js]
const fs = require('fs')
const path = require('path')
const globby = require('globby')
const first = require('lodash/first')
const filter = require('lodash/filter')

module.exports = async function loader(source) {
  // only run for the non-query requests
  if (this.resourceQuery)
    return source

  // a. Scan components
  const base = './src/components/'
  const fileComponents = (await globby('*.vue', { cwd: base })).map((c) => {
    const name = path.parse(c).name
    const shortPath = path.resolve(base).replace(path.resolve('./src'), '@')
    return {
      name,
      import: `import ${name} from "${shortPath}/${c}"`
    }
  })

  // b. Find the template tags
  const compiler = require('@vue/compiler-sfc')
  const parsed = compiler.parse(fs.readFileSync(`${this.context}/${path.basename(this.resourcePath)}`, 'utf8')).descriptor
  const template = compiler.compileTemplate({
    id: 'na',
    source: parsed.template.content,
    filename: this.resourcePath,
  })
  const componentTags = template.ast.components

  // c. Match making
  const matches = []
  componentTags.forEach(tag => matches.push(first(filter(fileComponents, c => c.name === tag))))

  // d. Insert the new dynamic imports
  if (!matches.length)
    return source

  const newContent = `
${matches.map(c => c.import).join('\n')}
script.components = Object.assign({ ${matches.map(c => c.name).join(', ')} }, script.components);
`
  const hotReload = source.indexOf('/* hot reload */')
  if (hotReload > -1)
    source = `${source.slice(0, hotReload) + newContent}\n\n${source.slice(hotReload)}`
  else
    source += `\n\n${newContent}`

  return source
}
```

:::tip
There are several issues and edge cases with the above code, this is merely a proof of concept and shouldn't be used in
production.

If you're after a more complete solution you should clone the repos listed before.
:::

## Problems With Automatic Component Imports

Hopefully, you now have a better understanding of how auto component importing works. While working through that rough proof of
concept, you may have foreseen some issues.

### Performance Cost

For automatic component imports to provide their magic, they need to parse the SFC and compile the template at compile time. If you recall,
we are running our loader after the `vue-loader`, that means this compilation has already been completed and is happening again.

This means that by using this feature, we are potentially **doubling our component build time**. Which affects the hot module
replacement speed, the web-dev-server boot-time and the production build time.

Saying that certain optimisations can and are made. Loader output can be cached with one line, so unless we change a file
we don't need to recompile it.

```js [imports-loaders.js]
// ...
module.exports = async function loader(source) {
  this.cache()
  // ...
}
```

For Vue 3 there may be a new way to optimise this feature. I've based the proof of concept on how the existing Vue 2 plugins work.


### Static code only

If you have a dynamic import then it's not going to work. I don't think this is a massive issue as you can
work around it with manual imports or using the `v-if` on inline components. Consider the below
code:

```vue
<script>
export default {
  computed: {
    myComponent() {
      return Math.random() * 100 > 50 ? ComponentA : ComponentB
    }
  }
}
</script>

<template>
  <component :is="myComponent" />
</template>
```

For now, the automatic import of `ComponentA` and `ComponentB` is not possible.

### Stricter component naming

Due to the nature of mapping a file name to a component name, it sets a few requirements around how you name your components.
If you're following the Vue [style-guide](https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential) for component naming, you shouldn't have an issue.

If you're going to adopt automatic component imports I'd recommend the following rules:
- Namespace all components (i.e `HButtonOutline`, `H` is the namespace)
- Avoid non-unique component file names
- Use nested folders to separate scopes

## Other Compile-Time "Upgrades"

### Import Directive Support

When compiling the template, we can also see when specific directives are used.
If the directive is not globally registered, then we can do an automatic compile-time import of it.

```vue
<script>
export default {
  data() {
    return {
      bar: 'foo'
    }
  }
}
</script>

<template>
  <div>
    <input v-my-directive="bar">
  </div>
</template>
```

We could imagine that we could write some code which would inject the directive such as `import MyDirective from "@/directives/MyDirective"`.

### Progressive Images

We hook into the compiling again and replace the source of our images with compile-time low-resolution versions.

**Input**
```vue
<template>
  <v-img src="@/images/my-image" />
</template>
```

**Output**
```vue
<template>
  <v-img placeholder="@/images/my-image-placeholder" src="@/images/my-image" />
</template>
```

### Async imports

The `@nuxt/components` package does offer this functionality as opt-in through a `Lazy` prefix on the component.

It makes use webpack's [Lazy Loading](https://webpack.js.org/guides/lazy-loading/) which bundles imports as their own dependency.
This is useful for if you have heavy components that aren't above the fold.


## Conclusion

Vue is already one of the most developer-friendly frontend frameworks around, with continued improvements in the dev experience
Vue will continue to flourish.

While these compile-time upgrades are not needed, they do make life easier. The possibilities
with injecting code at compile time opens up many opportunities for reducing the 'chores' that seem to follow us around
project to project.

## Thanks for reading

webpack and Vue internals are a challenging topic and if you made it all the way through, pat yourself on the back.

If you like the technical side of Vue and Laravel, I'll be posting regular articles on this site. The best
way to keep up to date is by following me [@harlan_zw](https://twitter.com/harlan_zw) or signing up for the newsletter below.

