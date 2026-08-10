import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
const RouteOptions: RouterConfig = {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 96 }
    if (from.path !== to.path)
      return { top: 0, behavior: 'smooth' }
    return { top: 0 }
  },
}

export default RouteOptions
