import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('blog directory', async () => {
  await setup({
    dev: true,
    // Disable unused parent-build HMR. The CLI child pins HMR to its HTTP port.
    nuxtConfig: { vite: { server: { hmr: false, ws: false } } },
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
})
