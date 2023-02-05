---
title: Nuxt 3 "Hydration Mismatch" Errors 
description: "Learn about the causes and solutions for the Hydration Children Mismatch error in Nuxt 3, including the use of client-only components, the <client-only> component, and the @nuxtjs/html-validator module."
publishedAt: "2023-02-05"
aside: false
tags:
  - nuxt
---

## The "Hydration Mismatch" Error

A hydration mismatch error is a disagreement between the server and the client on what the Vue rendered HTML should look like. When it
occurs when you see one of the following errors in your browser console:

```bash
[Vue Warn]: Hydration node mismatch...
[Vue Warn]: Hydration children mismatch...
```

### How Server-Side Rendering Works

When a user requests your Nuxt 3 site, Nuxt has one important job: Responding with the full rendered HTML of the page and all client-side scripts needed to bring it to life.

It does this by getting Vue to run its server-side rendering (SSR) code. This code is responsible for taking your Vue components and turning them into HTML.

When Vue renders the HTML, it is rendering DOM nodes in a way that may not match how a browser itself would render them. For example, it's quite possible to generate invalid HTML
with Vue whereas the browser would complain.

### How Client-Side Hydration Works

When the user's browser receives the HTML, it loads the client-side scripts. These scripts are responsible for bringing initializing your Vue app,
rendering all of your components with the goal of producing the same HTML that the server rendered.

In doing so, it has the full state needed to create new interactivity.

### Consequences of a Hydration Mismatch

When a hydration mismatch occurs, the client-side Vue app can have quite unpredictable results. Leading to interactivity not working,
or even worse, the page not working at all.

Most commonly, this error will lead to a poor user experience and SEO issues.

## Solving the Hydration Mismatch Error

There are a number of ways to solve this error.

The first step is to identify the cause of the mismatch. This can be quite tricky in Nuxt 3 as the error messages can sometimes
be quite cryptic.

### Ensure Pages Have a Single Root Element

As a quick check, if your error is pointing to a page component, it's possible that the error is from multiple root elements.

While not technically required in Vue 3, it's required in Nuxt 3 to have a root element in your page components. 

**Bad - Has 2 root elements**

```vue
<template>
  <div>
    <h1>My Page</h1>
  </div>
  <div>Hello </div>
</template>
```

**Good - 1 root element**

```vue
<template>
  <div>
    <h1>My Page</h1>
    <div>Hello </div>
  </div>
</template>
```


### Check the HTML

Because the trigger for the error is the HTML not matching, this can be a good starting point to debugging.

There are many ways to produce invalid HTML in Vue. It's not always intuitive to know these what is invalid though.

The easiest way to check the HTML is to use the [@nuxtjs/html-validator](https://html-validator.nuxtjs.org/) module. This module will validate the HTML and
throw an error if it is invalid.

### Use <client-only> Component

If you notice that the error is coming from a component that is only needed on the client-side, you can wrap it with `<client-only>` component, alternatively.
you can prefix your component name with `.client.vue`. For example `MyWidget.client.vue`.

This is quite common components which use code coming from a third-party library. For example, a component which uses a Google Maps library.

In these instances, the third-party library does not have support to server-side render.

```vue
<template>
  <client-only>
    <MyWidget />
  </client-only>
</template>
```

## Conclusion

Hydration mismatch errors can be quite frustrating and tricky to debug. Having a better understanding of the root cause of the error
and how to solve it can help you avoid these issues in the future.
