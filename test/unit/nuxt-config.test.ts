import type { ErrorReport, MessagePattern, ReportPolicy } from '@harlan-zw/nuxt-sentry/server'
import { decideReport } from '@harlan-zw/nuxt-sentry/server'
import { describe, expect, it } from 'vitest'

function serializePattern(entry: RegExp | string): MessagePattern {
  if (typeof entry === 'string')
    return { _tag: 'literal', value: entry }
  return { _tag: 'pattern', source: entry.source, flags: entry.flags.replace(/[gy]/g, '') }
}

// Only the rules this file declares, none of the module's built-in browser
// noise, so the decision reflects what the config says.
async function clientPolicy(): Promise<ReportPolicy> {
  Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
  const { default: nuxtConfig } = await import('../../nuxt.config')
  const policy = (nuxtConfig as { nuxtSentry?: { policy?: { dropClientStatus?: number[] | false, ignoreErrors?: Array<RegExp | string> } } }).nuxtSentry?.policy
  return {
    scope: 'client',
    dataCollection: 'none',
    dropStatus: (policy?.dropClientStatus ?? []).map(status => ({ from: status, to: status })),
    dropTransient: false,
    ignoreErrors: (policy?.ignoreErrors ?? []).map(serializePattern),
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

  it('does not prerender the externally served factory diagram', async () => {
    Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
    const { default: nuxtConfig } = await import('../../nuxt.config')

    const routeRules = (nuxtConfig as { routeRules?: Record<string, { prerender?: boolean }> }).routeRules
    expect(routeRules?.['/blog/ai-workflow/factory/**']?.prerender).toBe(false)
  })
})

describe('nuxt config sentry policy', () => {
  it('drops the browser report of an expected 404 page error', async () => {
    const error = Object.assign(new Error('Page not found'), { statusCode: 404, fatal: true })

    expect(decideReport({ message: 'Error: Page not found' }, error, await clientPolicy())).toEqual({ _tag: 'drop', rule: 'status' })
  })

  it('drops the closed BroadcastChannel InvalidStateError Firefox reports', async () => {
    const message = 'An attempt was made to use an object that is not, or is no longer, usable'
    const report: ErrorReport = {
      exception: {
        values: [{
          type: 'InvalidStateError',
          value: message,
          stacktrace: { frames: [{ filename: '/_nuxt/entry.legacy.js' }] },
        }],
      },
    }
    const error = new DOMException(message, 'InvalidStateError')

    expect(decideReport(report, error, await clientPolicy()))
      .toEqual({ _tag: 'drop', rule: 'ignore-message' })
  })

  it('still reports Firefox InvalidStateErrors with other messages', async () => {
    const message = 'A request was placed against a transaction which is currently inactive'
    const report: ErrorReport = {
      exception: {
        values: [{ type: 'InvalidStateError', value: message }],
      },
    }
    const error = new DOMException(message, 'InvalidStateError')

    expect(decideReport(report, error, await clientPolicy()))
      .toEqual({ _tag: 'send' })
  })
})
