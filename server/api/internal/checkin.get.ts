import { runChecks } from '@harlan-zw/nuxt-checkin/server'
import { createError, defineEventHandler, getHeader, setHeader } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'
import checks from '#checkin/checks'
import { REQUIRED_CHECKS } from '../../../shared/checkin'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  setHeader(event, 'cache-control', 'no-store')
  if (!config.checkinToken || getHeader(event, 'authorization') !== `Bearer ${config.checkinToken}`)
    throw createError({ statusCode: 401, message: 'Check-in authorization failed.' })
  if (!config.checkinDeployment)
    throw createError({ statusCode: 503, message: 'Check-in deployment identity is missing.' })
  return runChecks(checks, {
    event,
    identity: { site: 'harlanzw.com', environment: config.checkinEnvironment, deployment: config.checkinDeployment },
    required: REQUIRED_CHECKS,
    timeoutMs: 10_000,
    totalTimeoutMs: 15_000,
  })
})
