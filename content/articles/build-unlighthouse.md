---
title: "Building Unlighthouse: Open-Source Package For Site-wide Google Lighthouse scans"
description: "Going into detail of what goes into making a modern open-source package."
head:
- - meta
  - name: description
    content: "Going into detail of what goes into making a modern open-source package."
- - meta
  - property: "og:type"
    content: "website"
- - meta
  - property: "og:url"
    content: "https://harlanzw.com/blog/building-unlighthouse/"
- - meta
  - property: "og:title"
    content: "Building Unlighthouse: Open-Source Package For Site-wide Google Lighthouse scans"
- - meta
  - property: "og:description"
    content: "Going into detail of what goes into making a modern open-source package."
- - meta
  - property: "og:image"
    content: "https://next.unlighthouse.dev/og.png"
- - meta
  - property: "twitter:card"
    content: "summary_large_image"
- - meta
  - property: "twitter:url"
    content: "https://harlanzw.com/blog/building-unlighthouse/"
- - meta
  - property: "twitter:title"
    content: "Building Unlighthouse: Open-Source Package For Site-wide Google Lighthouse scans"
- - meta
  - property: "twitter:description"
    content: "Going into detail of what goes into making a modern open-source package."
- - meta
  - property: "twitter:image"
    content: "https://next.unlighthouse.dev/og.png"
---

<SchemaOrgArticle date-published="2022-02-28" />

## Introduction

[Unlighthouse](https://github.com/harlan-zw/unlighthouse) is an open-source package to scan your entire site using Google Lighthouse. Featuring a modern UI, minimal config and smart sampling.

## The Journey To An Idea

As a freelancer I  keep on top of my clients organic growth with Google Search Console.

Was a day like any other, looking at one of my clients' dashboard. Seemingly out of nowhere, I saw the trend of page position, clicks and page views in free fall. My clients' income was based on organic traffic, not good.

![Trending down Google Search Console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n4ajn7qv5iir7kmido0p.png)

Isolating the reason for the falling page rank wasn't easy. The site had issues, but what was causing the free fall. There was no way to know.

To diagnose the issue, I used Google Lighthouse. I went through all pages of the site, fixing all reported issues.

What happened next? Things started turning around. I was able to invert the graph. Organic growth doubled in the next few months. Happy client.

![Trending up Google Search Console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wh6s6kjiy5y8ilv8pzeq.png)

Now that was out of the way, how could I make it easier to stay on top of the health of the sites I manage?

## Starting The Build

So I know I wanted to build something that would run Google Lighthouse on an entire site with just the home page URL.

When it came time to put something together, I had a rough idea of the stack. Typescript, Vue, Vite, etc.

There were also a myriad of nifty packages that were coming out of the [UnJS](https://github.com/unjs) ecosystem that I wanted to play with.

With that, the package would be known as **Un** (inspired by Unjs) **Lighthouse**.

## Unlighthouse Architecture

The code that what went into building the package.

### Vue 3 / Vite client

The beloved [Vite](https://github.com/vitejs/vite) was to be used to make the development of the client as easy and fast as possible.

Vue v3 used to make use of the vast collection of utilities available at [VueUse](https://vueuse.org/).

### Lighthouse Binary

Unlighthouse wouldn't be possible if Google hadn't published Lighthouse as its own [NPM binary](https://github.com/GoogleChrome/lighthouse).

To make Unlighthouse fast, I combined the binary with the package [puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster), which allows for multi-threaded lighthouse scans.

### PNPM Monorepo

[PNPM](https://pnpm.io/) is the new kid on the block of node package managers and has gained a large following quickly, for good reason. It is the most performant package manager and has first class support for monorepos.

There are many benefits to using a monorepo for a package. My personal favourite is it allows me to easily isolate logic and dependencies for your package, letting you write simpler code. Allowing end users to pull any specific part of your package that they want to use.

![Unlighthouse monorepo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3hfzz5ik3fa9qtzmmmz9.png)

### Vitest Testing

[Vitest](https://vitest.dev/) is also the new kid on the block of testing. It's original aim was to be a testing framework specifically for Vite, but it has ended up being a possible replacement for Jest entirely.

Vitest makes writing your logic and tests a breeze and I'd recommend checking it out for any project.

### [unbuild](https://github.com/unjs/unbuild)

This package is described as a "A unified javascript build system".

In reality, it's a minimal config way to build your package code to ESM and CJS.

One of the amazing features of unbuild is stubbing. This allows you can run source code from your dist folder, meaning it transpiles just-in-time.

This allows you to completely cut out the build step when you're iterating and testing integrations on your package.

It's as simple as `unbuild --stub`.

```ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { input: 'src/index' },
    { input: 'src/process', outDir: 'dist/process', builder: 'mkdist', declaration: false },
  ],
})
```

### [unctx](https://github.com/unjs/unctx)

It's amazing that a simple pattern like composition has evaded Node packages for so long.

With the introduction of Vue 3, composition became cool. And with that, unctx is composition for your own package.

unctx allows you define a scope where there's only a single instance of something that is globally accessible. This is incredibly useful for building packages, as you no longer need to be juggling core state. You can build your logic out as composables that interact with the core.

```ts
import { createContext } from 'unctx'

const engineContext = createContext<UnlighthouseContext>()

export const useUnlighthouse = engineContext.use as () => UnlighthouseContext

export const createUnlighthouse = async(userConfig: UserConfig, provider?: Provider) => {
  // ...
  engineContext.set(ctx, true)
}
```

### [unrouted](https://github.com/harlan-zw/unrouted)

I needed an API for the client to communicate with the Node server to fetch the status of the scan and submit re-scans.

The current JS offerings were a bit lackluster. I wanted something that just worked and had a nice way to use it.

I ended up building unrouted as a way to solve that.

```ts
 group('/api', () => {
      group('/reports', () => {
        post('/rescan', () => {
          const { worker } = useUnlighthouse()

          const reports = [...worker.routeReports.values()]
          logger.info(`Doing site rescan, clearing ${reports.length} reports.`)
          worker.routeReports.clear()
          reports.forEach((route) => {
            const dir = route.artifactPath
            if (fs.existsSync(dir))
              fs.rmSync(dir, { recursive: true })
          })
          worker.queueRoutes(reports.map(report => report.route))
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

### [hookable](https://github.com/unjs/hookable)

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

### [unconfig](https://github.com/antfu/unconfig)

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

### [ufo](https://github.com/unjs/ufo)

> URL utils for humans

Dealing with URLs in Node isn't very nice. For Unlighthouse I needed to deal with many URLS, I needed to make sure they were standardised no matter how they were formed.

This meant using the ufo package heavily. The slash trimming came in very handy and the origin detection.

```ts
export const trimSlashes = (s: string) => withoutLeadingSlash(withoutTrailingSlash(s))
```

```ts
  const site = new $URL(url).origin
```

## Putting It Together - Part 2

Part 2 of this article will be coming soon where I go over some technical feats in putting together the above packages.

## Conclusion

Thanks for reading Part 1. I hope you at least found it interesting or some of the links useful.

