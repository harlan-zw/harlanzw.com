import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('blog list payload', async () => {
  await setup({
    browser: true,
    dev: true,
    rootDir: fileURLToPath(new URL('../..', import.meta.url)),
    setupTimeout: 120_000,
  })

  it('hydrates article cards without their full article bodies', async () => {
    const page = await createPage('/blog')
    await page.waitForFunction(() => window.useNuxtApp && !window.useNuxtApp().isHydrating)
    const articles = await page.evaluate(() => window.useNuxtApp().payload.data['posts:articles'])

    expect(articles.length).toBeGreaterThan(0)
    expect(articles.some(article => article.body !== undefined)).toBe(false)
    for (const article of articles.filter(article => article.status !== 'unlisted')) {
      expect(await page.locator('a:has(h3)').filter({ hasText: article.title }).count()).toBe(1)
      expect(article.readingMinutes).toBeGreaterThanOrEqual(1)
    }
  }, 60_000)
})
