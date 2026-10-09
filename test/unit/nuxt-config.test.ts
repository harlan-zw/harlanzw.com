import { describe, expect, it } from 'vitest'

describe('nuxt config site urls', () => {
  it('keeps the bare form of section URLs canonical', async () => {
    Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
    const { default: nuxtConfig } = await import('../../nuxt.config')

    const trailingSlash = (nuxtConfig as { site?: { trailingSlash?: boolean } }).site?.trailingSlash
    expect(trailingSlash).toBe(false)
  })
})
