import { fileURLToPath } from 'node:url'
import { createPage, setup, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('og image navigation', async () => {
  await setup({
    browser: true,
    dev: true,
    rootDir: fileURLToPath(new URL('../..', import.meta.url)),
    setupTimeout: 120_000,
  })

  it('matches the destination after navigating from projects to an article', async () => {
    const page = await createPage('/projects')
    await page.waitForFunction(() => window.useNuxtApp && !window.useNuxtApp().isHydrating)

    const initialImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(initialImage).toContain('title_Projects')

    await page.getByRole('link', { name: 'Blog', exact: true }).click()
    await page.waitForURL('**/blog')
    await page.locator('a[href="/blog/ai-in-open-source"]').click()
    await page.waitForURL('**/blog/ai-in-open-source')
    await page.waitForFunction(() => document.querySelector('meta[property="og:title"]')?.getAttribute('content') === 'How I use AI in open source')
    await page.waitForFunction(() => {
      const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
      return image && new URL(image).pathname === '/_og/r/blog/ai-in-open-source.png'
    })

    const destinationImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(new URL(destinationImage!).pathname).toBe('/_og/r/blog/ai-in-open-source.png')
  }, 60_000)

  it('does not report errors when the catch-all route mounts during hydration', async () => {
    const pageErrors: string[] = []
    const page = await createPage()
    page.on('pageerror', error => pageErrors.push(error.message))

    await page.goto(url('/projects'), { waitUntil: 'commit' })
    await page.waitForFunction(() => {
      const nuxtApp = window.useNuxtApp?.()
      if (!nuxtApp?.isHydrating || !nuxtApp.$router)
        return false

      const state = window as typeof window & {
        __appErrors?: string[]
        __catchAllMountedDuringHydration?: boolean
        __startedHydrationNavigation?: boolean
      }
      if (state.__startedHydrationNavigation)
        return true

      state.__appErrors = []
      state.__startedHydrationNavigation = true
      nuxtApp.hook('app:error', error => state.__appErrors?.push(String(error)))
      nuxtApp.$router.afterEach((to) => {
        if (nuxtApp.isHydrating && to.path === '/blog/ai-in-open-source')
          state.__catchAllMountedDuringHydration = true
      })
      void nuxtApp.$router.push('/blog/ai-in-open-source')
      return true
    })
    await page.waitForFunction(() => window.__catchAllMountedDuringHydration)
    await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'How I use AI in open source')
    await page.waitForFunction(() => window.useNuxtApp?.().isHydrating === false)

    expect(pageErrors).toEqual([])
    await expect(page.evaluate(() => window.__appErrors)).resolves.toEqual([])
  }, 20_000)
})
