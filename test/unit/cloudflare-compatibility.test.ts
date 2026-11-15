import { diagnoseWranglerConfig, readWranglerConfigFile } from '@harlan-zw/nuxt-cloudflare/wrangler'
import { describe, expect, it } from 'vitest'

// Freeze the policy clock at the reported CI warning, so this regression does
// not become a rolling deadline unrelated to the change under test.
const compatibilityPolicy = { now: new Date('2026-11-12T18:20:00.000Z') }

describe('cloudflare compatibility policy', () => {
  it.each(['wrangler.jsonc', 'wrangler.www.jsonc'])('%s passes the compatibility date policy', (path) => {
    const result = readWranglerConfigFile(path)
    if (result._tag !== 'loaded')
      throw new Error(`Could not read ${path}`)

    const diagnostics = diagnoseWranglerConfig(result.config, compatibilityPolicy)
    expect(diagnostics.filter(diagnostic => diagnostic.configPath === 'compatibility_date')).toEqual([])
  })

  it('passes the compatibility date policy for Nuxt and Nitro', async () => {
    Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
    const { default: nuxtConfig } = await import('../../nuxt.config.ts')

    for (const date of [nuxtConfig.compatibilityDate, nuxtConfig.nitro?.compatibilityDate]) {
      const compatibilityDate = typeof date === 'object' ? date.cloudflare ?? date.default : date
      const diagnostics = diagnoseWranglerConfig({ compatibility_date: compatibilityDate }, compatibilityPolicy)
      expect(diagnostics.filter(diagnostic => diagnostic.configPath === 'compatibility_date')).toEqual([])
    }
  })
})
