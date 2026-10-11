import type { ErrorReport, MessagePattern, ReportPolicy } from '@harlan-zw/nuxt-sentry/server'
import { decideReport } from '@harlan-zw/nuxt-sentry/server'
import { describe, expect, it } from 'vitest'

function serializePattern(entry: RegExp | string): MessagePattern {
  if (typeof entry === 'string')
    return { _tag: 'literal', value: entry }
  return { _tag: 'pattern', source: entry.source, flags: entry.flags.replace(/[gy]/g, '') }
}

async function clientIgnoreErrors(): Promise<ReportPolicy['ignoreErrors']> {
  Object.assign(globalThis, { defineNuxtConfig: (config: unknown) => config })
  const { default: nuxtConfig } = await import('../../nuxt.config')
  const ignoreErrors = (nuxtConfig as { nuxtSentry?: { policy?: { ignoreErrors?: Array<RegExp | string> } } }).nuxtSentry?.policy?.ignoreErrors
  return (ignoreErrors ?? []).map(serializePattern)
}

// Only the configured message rules, none of the built-in browser noise, so
// the decision reflects what this file declares.
function policyWith(ignoreErrors: ReportPolicy['ignoreErrors']): ReportPolicy {
  return {
    scope: 'client',
    dataCollection: 'none',
    dropStatus: [],
    dropTransient: false,
    ignoreErrors,
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

    expect(decideReport(report, error, policyWith(await clientIgnoreErrors())))
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

    expect(decideReport(report, error, policyWith(await clientIgnoreErrors())))
      .toEqual({ _tag: 'send' })
  })
})
