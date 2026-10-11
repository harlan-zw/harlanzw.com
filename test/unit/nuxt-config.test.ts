import type { ReportPolicy } from '@harlan-zw/nuxt-sentry/server'
import { decideReport } from '@harlan-zw/nuxt-sentry/server'
import { describe, expect, it } from 'vitest'

function clientPolicy(dropClientStatus: number[] | false | undefined): ReportPolicy {
  return {
    scope: 'client',
    dataCollection: 'none',
    dropStatus: (dropClientStatus ?? []).map(status => ({ from: status, to: status })),
    dropTransient: true,
    ignoreErrors: [],
    dropStacklessErrors: [],
    dropBreadcrumbMessages: [],
    denyUrls: [],
    secretKeys: [],
  }
}

describe('nuxt config site urls', () => {
  it('keeps the bare form of section URLs canonical', async () => {
    Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
    const { default: nuxtConfig } = await import('../../nuxt.config')

    const trailingSlash = (nuxtConfig as { site?: { trailingSlash?: boolean } }).site?.trailingSlash
    expect(trailingSlash).toBe(false)
  })
})

describe('nuxt config sentry policy', () => {
  it('drops the browser report of an expected 404 page error', async () => {
    Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
    const { default: nuxtConfig } = await import('../../nuxt.config')

    const dropClientStatus = (nuxtConfig as { nuxtSentry?: { policy?: { dropClientStatus?: number[] | false } } }).nuxtSentry?.policy?.dropClientStatus
    const error = Object.assign(new Error('Page not found'), { statusCode: 404, fatal: true })

    expect(decideReport({ message: 'Error: Page not found' }, error, clientPolicy(dropClientStatus))).toEqual({ _tag: 'drop', rule: 'status' })
  })
})
