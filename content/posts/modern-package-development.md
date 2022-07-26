---
title: "Learning Modern Package Development: Monorepos and Backends - Part 1"
description: "Discover how you can build a modern package development through how I created the Unlighthouse project."
publishedAt: "2022-07-31"
image: "https://next.unlighthouse.dev/og.png"
tags:
  - vue
  - vite
  - typescript
---

::tip
This article is a work in progress. Feel free to read it, but some sections are incomplete.
::


## Introduction

[Unlighthouse](https://github.com/harlan-zw/unlighthouse) is an open-source package I built to scan your entire site using Google Lighthouse.

Building it was chaotic, with day-long bugs, constant refactoring and endless documentation reading. 

Through building it, I learnt modern development practices, making use of the vast ecosystem of packages and tools.

## Background: Why build Unlighthouse?

As a freelancer I  keep on top of my clients organic growth with Google Search Console.

Was a day like any other, looking at one of my clients' dashboard. Seemingly out of nowhere, I saw the trend of page position, clicks and page views in free fall. My clients' income was based on organic traffic, not good.

![Trending down Google Search Console](/numbers-go-down){height="416" width="1552" max-height="242"}

Isolating the reason for the falling page rank wasn't easy. The site had issues, but what was causing the free fall? There was no easy way to know.

To diagnose the issue, I used Google Lighthouse. I went through all pages of the site, noticing quite a number of issues. I spent a couple of days
fixing them all up and improving the general performance of the site.

What happened next? Things started turning around. I was able to invert the graph. Organic growth doubled in the next few months. Happy client.

![Trending up Google Search Console](/numbers-go-up){height="399" width="1554" max-height="242"}

Now that was out of the way, how could I make it easier to stay on top of the health of the sites I manage?

## Deciding on the stack

I needed to build a tool that would run Google Lighthouse on an entire site with just the home page URL.

I had a plan of attack for the build.

The backend would be build using Typescript and Node. 

The frontend client would be built using Vue and Vite.

But how would I be able to design this in a way that was easy to build and maintain?

I had seen the amazing work coming out of the [UnJS](https://github.com/unjs) ecosystem and knew that they could solve some of my problems.

With that, the package would be known as **Un** (inspired by Unjs) **Lighthouse**.

Keeping a keen eye on other modern packages coming out, I took some of the best practices and tools I saw implemented.

The stack was split into three core parts: 
- Monorepo: containing the dependencies to build, test and deploy the code
- Frontend: displaying searchable, filtering and sortable results
- Backend: generating the frontend, running the scans and providing an API for the frontend

## Monorepo

Implementing a monorepo is a keystone for a large project which will ship multiple packages. It allows you to
group up logic, dependencies and documentation into a single repository.

### PNPM

[PNPM](https://pnpm.io/) is the new kid on the block of node package managers and has gained a large following quickly, for good reason. It is the most performant package manager and has first class support for monorepos.

There are many benefits to using a monorepo for a package. My personal favourite is it allows me to easily isolate logic and dependencies for your package, letting you write simpler code. Allowing end users to pull any specific part of your package that they want to use.

![Unlighthouse monorepo](/pnpm-monorepo){height="507" width="942" max-height="400"}

### Vitest

[Vitest](https://vitest.dev/) is also the new kid on the block of testing. It's original aim was to be a testing framework specifically for Vite, but it has ended up being a possible replacement for Jest entirely.

Vitest makes writing your logic and tests a breeze and I'd recommend checking it out for any project.

### Unbuild

![](https://opengraph.githubassets.com/a12c58f21ffef9686653c51d0203ab07a995d7450d3d690a1c8bd51e975df35c/unjs/unbuild){alt="unbuild" height="350"}

This package is described as a "A unified javascript build system".

In reality, it's a minimal config way to build your package code to ESM and CJS.

One of the amazing features of unbuild is stubbing. This allows you can run source code from your dist folder, meaning it transpiles just-in-time.

This allows you to completely cut out the build step when you're iterating and testing integrations on your package.

It's as simple as `unbuild --stub`.

```ts [build.config.ts]
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { input: 'src/index' },
    { input: 'src/process', outDir: 'dist/process', builder: 'mkdist', declaration: false },
  ],
})
```

[GitHub Repo Link](https://github.com/unjs/unbuild)

## Server

### Lighthouse Binary

Unlighthouse wouldn't be possible if Google hadn't published Lighthouse as its own [NPM binary](https://github.com/GoogleChrome/lighthouse).

To make Unlighthouse fast, I combined the binary with the package [puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster), which allows for multi-threaded lighthouse scans.


### Unctx

![](https://opengraph.githubassets.com/16b7d5bc9f0ddbbbc59c5f8fd24c1f1f311d2ab6bb835be58fb0698631d4b624/unjs/unctx){alt="unctx" height="350"}

It's amazing that a simple pattern like composition has evaded Node packages for so long.

With the introduction of Vue 3, composition became cool. And with that, unctx is composition for your own package.

unctx allows you to define a scope where there's only a single instance of something that is globally accessible. This is incredibly useful for building packages, as you no longer need to be juggling core state. You can build your logic out as composables that interact with the core.

```ts
import { createContext } from 'unctx'

const engineContext = createContext<UnlighthouseContext>()

export const useUnlighthouse = engineContext.use as () => UnlighthouseContext

export const createUnlighthouse = async (userConfig: UserConfig, provider?: Provider) => {
  // ...
  engineContext.set(ctx, true)
}
```

- [unctx GitHub Repo](https://github.com/unjs/unctx)

### Hookable

![](https://opengraph.githubassets.com/6fd14beca1b9a811c7b46e4e61ec4ef8870a3f1407e21d47724b38cb6128e0b3/unjs/hookable){alt="hookable" height="350"}

For Nuxt.js users, you might be familiar with the concept of frameworks hooks. A way for you to modify or do something with the internal logic of Nuxt.

Building a package, I knew that this was a useful feature, not just for end-users, but for me as a way to organise logic.

Having a core which is hookable means you can avoid baking logic in that may be better suited elsewhere.

For example, I wanted to make sure that Unlighthouse didn't start for integrations until they visited the page.

I simply set a hook for it to start only when they visit the client.

```ts
hooks.hookOnce('visited-client', () => {
  ctx.start()
})
```

- [Hookable GitHub Repo](https://github.com/unjs/hookable)


### Unconfig

![](https://opengraph.githubassets.com/f8bdfdebc7f32dd928adc557ea624fe7e4e4003400e90b3c41b414d818432b21/antfu/unconfig){alt="Unconfig" height="350"}

Unconfig is a universal solution for loading configurations. This let me allow the package to load in a configuration from `unlighthouse.config.ts` or a custom path, with barely any code.

```ts
import { loadConfig } from 'unconfig'

const configDefinition = await loadConfig<UserConfig>({
  cwd: userConfig.root,
  sources: [
    {
      files: [
        'unlighthouse.config',
        // may provide the config file as an argument
        ...(userConfig.configFile ? [userConfig.configFile] : []),
      ],
      // default extensions
      extensions: ['ts', 'js'],
    },
  ],
})
if (configDefinition.sources?.[0]) {
  configFile = configDefinition.sources[0]
  userConfig = defu(configDefinition.config, userConfig)
}
```

- [Unconfig GitHub Repo](https://github.com/antfu/unconfig)


### ufo

![](https://repository-images.githubusercontent.com/318601574/674ca800-3a4a-11eb-901f-31ab7e452816){alt="UFO" height="350"}

Dealing with URLs in Node isn't nice. For Unlighthouse I needed to deal with many URLS, I needed to make sure they were standardised no matter how they were formed.

This meant using the ufo package heavily. The slash trimming came in handy and the origin detection.

```ts
export const trimSlashes = (s: string) => withoutLeadingSlash(withoutTrailingSlash(s))
```

```ts
const site = new $URL(url).origin
```

- [ufo GitHub Repo](https://github.com/unjs/ufo)


### Unrouted

![](https://repository-images.githubusercontent.com/432034546/262d14fd-f00c-46b9-8b72-423a07dca06f){alt="unrouted" height="350"}


I needed an API for the client to communicate with the Node server to fetch the status of the scan and submit re-scans.

The current JS offerings were a bit lackluster. I wanted something that just worked and had a nice way to use it.

I ended up building unrouted as a way to solve that.

```ts
group('/api', () => {
  group('/reports', () => {
    post('/rescan', () => {
      // ...
      return true
    })

    post('/:id/rescan', () => {
      const report = useReport()
      const { worker } = useUnlighthouse()

      if (report)
        worker.requeueReport(report)
    })
  })

  get('__launch', () => {
    const { file } = useQuery<{ file: string }>()
    if (!file) {
      setStatusCode(400)
      return false
    }
    const path = file.replace(resolvedConfig.root, '')
    const resolved = join(resolvedConfig.root, path)
    logger.info(`Launching file in editor: \`${path}\``)
    launch(resolved)
  })

  get('ws', req => ws.serve(req))

  get('reports', () => {
    const { worker } = useUnlighthouse()

    return worker.reports().filter(r => r.tasks.inspectHtmlTask === 'completed')
  })

  get('scan-meta', () => createScanMeta())
})
```

- [Unrouted GitHub Repo](https://github.com/harlan-zw/unrouted)

## Client

The code that what went into building the package.

### Vue 3 / Vite client

The beloved [Vite](https://github.com/vitejs/vite) was to be used to make the development of the client as easy and fast as possible.

Vue v3 used to make use of the vast collection of utilities available at [VueUse](https://vueuse.org/).


## Putting It Together - Part 2

Part 2 of this article will be coming soon where I go over some technical feats in putting together the above packages.

## Conclusion

Thanks for reading Part 1. I hope you at least found it interesting or some of the links useful.

