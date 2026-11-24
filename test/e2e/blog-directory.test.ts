import { fileURLToPath } from 'node:url'
import { $fetch, setup, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('blog directory', async () => {
  await setup({
    dev: true,
    // Disable unused parent-build HMR. The CLI child pins HMR to its HTTP port.
    nuxtConfig: {
      // These tests exercise Nuxt pages and API routes. Wrangler checks the Worker separately.
      nitro: { preset: 'node-server', builder: 'rollup' },
      vite: { server: { hmr: false, ws: false } },
    },
    rootDir: fileURLToPath(new URL('../..', import.meta.url)),
    setupTimeout: 120_000,
  })

  it('links every published post in the feed', async () => {
    const feed = await $fetch<{ items: Array<{ url: string }> }>('/feed.json', { responseType: 'json' })
    const html = await $fetch<string>('/blog')
    const paths = feed.items.map(item => new URL(item.url).pathname)

    expect(paths.length).toBeGreaterThan(0)
    expect(paths.filter(path => !html.includes(`href="${path}"`))).toEqual([])
  }, 120_000)

  // Shares this dev server: each extra one rewrites `node_modules/.cache/comark-content` while the others read it.
  describe('paths with a leading double slash', () => {
    // A `new URL(path, base)` reads the segment after `//` as a host, so an invalid one threw and a valid one rendered `/`.
    it.each([
      '//llms.txt%22%20tabindex=%22-1%22%20style=%22position:absolute;width:1px',
      '//missing-page',
    ])('answers %s as a missing page', async (path) => {
      const response = await fetch(`${new URL(url('/')).origin}${path}`, { redirect: 'manual' })

      expect(response.status).toBe(404)
    }, 60_000)
  })
})
