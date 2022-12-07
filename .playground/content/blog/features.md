This is the description of the blog post. It can be as long as you want, and can even contain **Markdown**.

## Features

::list
- Create pages in Markdown in the `content/` directory
- Use [Nuxt layouts](https://nuxt.com/docs/guide/directory-structure/layouts) in your Markdown pages
- Enjoy meta tag generation from Markdown files
- Configurable prose components with [Nuxt Typography](https://typography.nuxt.space)
- Generated navigation based on your pages
- Switch between Light & Dark mode :moon:
- Access 100,000 icons from 100+ icon sets with the `<Icon>` component
- Highlight code blocks with [Shiki](https://shiki.matsu.io)
- Create Vue components and use them in Markdown
- Deploy on any Node or Static hosting: GH Pages, Vercel, Netlify, Heroku, etc.
- Live edit on [Nuxt Studio](https://nuxt.studio)
  ::

## Setup

Open a terminal and run the following command:

```bash
npx nuxi init -t themes/content-wind my-website
```

Follow the instructions in the terminal and you are ready to go :rocket:

## Usage

This template has some built-in features to make it as easy as possible to create a content-driven website.

### Pages

Create your Markdown pages in the `content/` directory:

```md
# My title

This first paragraph will be treated as the page meta description.
```

You can overwrite meta tags by using front-matter:

```md
---
title: 'Custom <title>'
description: 'Custom meta description'
image: 'Custom image injected as `og:image`'
---

# My title

This first paragraph will be treated as the page meta description.
```

This is done thanks to Nuxt Content's [`document-driven mode`](https://content.nuxtjs.org/guide/writing/document-driven) component of Nuxt Content.

### Navigation

The navigation is generated from your pages, you can take a look at the [`<Navbar>`](https://github.com/Atinux/content-wind/blob/main/theme/components/Navbar.vue) component to see how it works.

It uses the [`<ContentNavigation>`](https://content.nuxtjs.org/api/components/content-navigation) component from Nuxt Content to fetch the navigation object.

To customize the title displayed in the navigation, you can set the `navigation.title` property in the front-matter of your pages:

```md
---
navigation.title: 'Home'
---

# Welcome to my site

With a beautiful description
```

### Theme configuration

You can configure Content Wind global configuration in the `app.config.ts` file:

```ts [signature]
interface AppConfigInput {
  cover?: string, // default: '/cover.jpg'
  socials?: {
    twitter?: string
    github?: string
  }
}
```

Example of settings Twitter and GitHub icons in the navbar:

```ts [app.config.ts]
export default defineAppConfig({
  socials: {
    twitter: 'Atinux',
    github: 'Atinux/content-wind'
  }
})
```

### Icons

Use any icon from [icones.js.org](https://icones.js.org) with the `<Icon>` component:

```html
<Icon name="ph:music-notes-fill" />
```

You can also use it in your Markdown:

```md
:icon{name="ph:music-notes-fill"}
```

Will result in :icon{name="ph:music-notes-fill"}

Learn more on [nuxt-icon](https://github.com/Atinux/nuxt-icon) documentation.

### Code Highlight

It supports code highlighting with Shiki and as well as different [VS Code themes](https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes).

::code-block
\```ts
export default () => 'Hello Content Wind'
\```
::

Will result in:

```ts
export default () => 'Hello Content Wind'
```

Updating the theme is as simple as editing your `nuxt.config`:

```ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  content: {
    highlight: {
      theme: 'one-dark-pro',
    }
  }
})
```

Learn more in the [Content Code Highlight section](https://content.nuxtjs.org/api/configuration#highlight).

### Vue Components

Add Vue components into the `components/content/` directory and start using them in Markdown.

See the `<Alert>` component in [`components/content/Alert.vue`](https://github.com/Atinux/content-wind/blob/main/theme/components/content/Alert.vue).

By leveraging the [`<ContentSlot>`](https://content.nuxtjs.org/api/components/markdown) component from Nuxt Content, you can use both slots and props in Markdown thanks to the [MDC syntax](https://content.nuxtjs.org/guide/writing/mdc).

```md
::alert{icon="ph:circle-wavy-warning-duotone"}
#title
This is an alert
#default
This is the default content of my alert!
::
```

Will result in:

::alert{icon="ph:circle-wavy-warning-duotone"}
#title
This is an alert
#default
This is the default content of my alert!
::

If you want to go deeper, take a look at the [`<List>`](https://github.com/Atinux/content-wind/blob/main/theme/components/content/List.vue) component to see some `useUnwrap()` magic :magic_wand:

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAtinux%2Fcontent-wind) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Atinux/content-wind)


### Static Hosting

Pre-render the website to be deployed on any static hosting:

```bash
npm run generate
```

The `dist/` directory is ready to be deployed (symlink to `.output/public`), [learn more on Nuxt docs](https://nuxt.com/docs/getting-started/deployment#static-hosting).

### Node server

Build the application for production:

```bash
npm run build
```

Start the server in production:

```bash
node .output/server/index.mjs
```

Learn more on [Nuxt docs](https://nuxt.com/docs/getting-started/deployment) for more information.

---

You are at the end of the page, you can checkout the [about page](/about) or the [GitHub repository](https://github.com/Atinux/content-wind) and give a :icon{name="ph:star-duotone"}

Thanks for reading and happy writing, [Atinux](https://twitter.com/Atinux).
