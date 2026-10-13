import { describe, expect, it } from 'vitest'
import { isExpectedNitroBuildWarning } from '../../build/warnings'

describe('isExpectedNitroBuildWarning', () => {
  it.each([
    { code: 'CIRCULAR_DEPENDENCY', message: 'Circular dependency' },
    { code: 'EVAL', message: 'Use of eval' },
    { code: 'SOURCEMAP_ERROR', message: 'Unsupported source map comment' },
    {
      code: 'INVALID_ANNOTATION',
      id: '/project/node_modules/.cache/nuxt/.nuxt/dist/server/_nuxt/dist-abc.js',
      message: 'A comment contains an annotation that Rollup cannot interpret',
    },
    {
      code: 'UNUSED_EXTERNAL_IMPORT',
      ids: ['/project/node_modules/@nuxt/nitro-server/dist/h3.mjs'],
      message: '"H3Event" is imported from external module "h3" but never used',
      names: ['H3Event'],
    },
    {
      code: 'UNUSED_EXTERNAL_IMPORT',
      ids: ['/project/node_modules/.pnpm/@nuxt+nitro-server@4.6.1/node_modules/@nuxt/nitro-server/dist/runtime/server.mjs'],
      message: '"parseCookies" is imported from external module "h3" but never used',
      names: ['parseCookies'],
    },
  ])('ignores expected Nitro warning $code', (warning) => {
    expect(isExpectedNitroBuildWarning(warning)).toBe(true)
  })

  it('preserves an unused import the Nitro server runtime does not own', () => {
    expect(isExpectedNitroBuildWarning({
      code: 'UNUSED_EXTERNAL_IMPORT',
      ids: ['/project/node_modules/@nuxt/nitro-server/dist/runtime/server.mjs'],
      message: '"readBody" is imported from external module "h3" but never used',
      names: ['readBody'],
    })).toBe(false)
  })

  it('preserves unrelated invalid annotation warnings', () => {
    expect(isExpectedNitroBuildWarning({
      code: 'INVALID_ANNOTATION',
      id: '/project/app/server.ts',
      message: 'An annotation that Rollup cannot interpret',
    })).toBe(false)
  })
})
