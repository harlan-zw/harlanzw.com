import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils/e2e'
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
  })
})
