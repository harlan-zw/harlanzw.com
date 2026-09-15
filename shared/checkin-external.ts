import type { ExternalOptions } from '@harlan-zw/nuxt-checkin/external'

export const externalCheckin = {
  identity: { site: 'harlanzw.com', environment: 'production', deploymentEnv: 'CHECKIN_DEPLOYMENT', environmentEnv: 'CHECKIN_ENVIRONMENT' },
  required: ['site.report', 'site.front-door', 'sentry.unresolved'],
  credentials: { sentry: 'SENTRY_AUTH_TOKEN' },
  save: { dir: 'docs/ops/checkins', dirEnv: 'DAILY_CHECKIN_DIR', stateFile: 'state.json', timestampKey: 'lastRunAt', baseline: 'daily' },
  timeoutMs: 30000,
  totalTimeoutMs: 45000,
} satisfies ExternalOptions
