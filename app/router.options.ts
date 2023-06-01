import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
const RouteOptions: RouterConfig = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    // If history back
    if (savedPosition) {
      // Handle Suspense resolution
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:finish', () => {
          setTimeout(() => resolve(savedPosition), 50)
        })
      })
    }
    // Scroll to heading on click
    if (to.hash) {
      setTimeout(() => {
        let heading = document.querySelector(`[id="${to.hash.replace('#', '')}"]`) as any
        if (!heading)
          heading = document.querySelector(`[href$="${to.hash}"]`) as any
        if (!heading)
          return
        return window.scrollTo({
          top: heading.offsetTop,
          behavior: 'smooth',
        })
      })
      return
    }

    // route change
    if (from.path !== to.path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    return { top: 0 }
  },
}

export default RouteOptions
