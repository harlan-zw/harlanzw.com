import { checkReport, defineCheck, fail, pass, runChecks, unavailable } from '@harlan-zw/nuxt-checkin/server'
import { defineSentryCheck } from '@harlan-zw/nuxt-sentry/checks'
import { REQUIRED_CHECKS } from '../shared/checkin.ts'

const identity = { site: 'harlanzw.com', environment: process.env.CHECKIN_ENVIRONMENT || 'production', deployment: process.env.CHECKIN_DEPLOYMENT || 'unknown' }
const report = await runChecks([
  defineCheck({
    id: 'site.report',
    async run({ signal }) {
      if (!process.env.CHECKIN_TOKEN || !process.env.CHECKIN_DEPLOYMENT)
        return unavailable('Set CHECKIN_TOKEN and CHECKIN_DEPLOYMENT.')
      const response = await fetch('https://harlanzw.com/api/internal/checkin', {
        headers: { authorization: `Bearer ${process.env.CHECKIN_TOKEN}` },
        signal,
        redirect: 'error',
      })
      if (!response.ok)
        return unavailable(`The check-in endpoint returned HTTP ${response.status}.`)
      return checkReport(await response.json(), { identity, required: REQUIRED_CHECKS, maxAgeMs: 60_000, now: new Date() })
    },
  }),
  defineCheck({
    id: 'site.front-door',
    async run({ signal }) {
      const response = await fetch('https://harlanzw.com/', { signal, redirect: 'error' })
      await response.body?.cancel()
      return response.status === 200 ? pass({ status: response.status }) : fail('The homepage did not return HTTP 200.', { status: response.status })
    },
  }),
  defineSentryCheck({ id: 'sentry.unresolved', org: 'harlan-zw', project: 'harlanzw-com', region: 'us' }),
], {
  identity,
  credentials: { sentry: process.env.SENTRY_AUTH_TOKEN || '' },
  required: ['site.report', 'site.front-door', 'sentry.unresolved'],
  timeoutMs: 30_000,
  totalTimeoutMs: 45_000,
})
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.coverage === 'complete' && report.severity === 'pass' ? 0 : 1
