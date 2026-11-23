import { fileURLToPath } from 'node:url'
import { setup, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('paths with a leading double slash', async () => {
  await setup({
    dev: true,
    // Disable unused parent-build HMR. The CLI child pins HMR to its HTTP port.
    nuxtConfig: { vite: { server: { hmr: false, ws: false } } },
    rootDir: fileURLToPath(new URL('../..', import.meta.url)),
    setupTimeout: 120_000,
  })

  // A `new URL(path, base)` reads the segment after `//` as a host, so an invalid one threw and a valid one rendered `/`.
  it.each([
    '//llms.txt%22%20tabindex=%22-1%22%20style=%22position:absolute;width:1px',
    '//missing-page',
  ])('answers %s as a missing page', async (path) => {
    const response = await fetch(`${new URL(url('/')).origin}${path}`, { redirect: 'manual' })

    expect(response.status).toBe(404)
  }, 60_000)
})
