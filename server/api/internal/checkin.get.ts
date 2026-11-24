import { runChecks } from '@harlan-zw/nuxt-checkin/server'
import { defineHandler, HTTPError } from 'h3'
import { useRuntimeConfig } from 'nitro/runtime-config'
import checks from '#checkin/checks'
import { REQUIRED_CHECKS } from '#shared/checkin'

export default defineHandler(async (event) => {
  const config = useRuntimeConfig()
  const headers = { 'cache-control': 'no-store' }
  event.res.headers.set('cache-control', headers['cache-control'])
  if (!config.checkinToken || event.req.headers.get('authorization') !== `Bearer ${config.checkinToken}`)
    throw new HTTPError({ status: 401, message: 'Check-in authorization failed.', headers })
  if (!config.checkinDeployment)
    throw new HTTPError({ status: 503, message: 'Check-in deployment identity is missing.', headers })
  return runChecks(checks, {
    event,
    identity: { site: 'harlanzw.com', environment: config.checkinEnvironment, deployment: config.checkinDeployment },
    required: REQUIRED_CHECKS,
    timeoutMs: 10_000,
    totalTimeoutMs: 15_000,
  })
})
