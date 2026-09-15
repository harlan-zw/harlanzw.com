import type { ExternalOptions } from '@harlan-zw/nuxt-checkin/external'

export const externalCheckin = {
  identity: { site: 'harlanzw.com', environment: 'production', deploymentEnv: 'CHECKIN_DEPLOYMENT', environmentEnv: 'CHECKIN_ENVIRONMENT' },
  required: ['site.report', 'site.front-door', 'sentry.unresolved'],
  credentials: { sentry: 'SENTRY_AUTH_TOKEN' },
  save: { dir: 'docs/ops/checkins', dirEnv: 'DAILY_CHECKIN_DIR', stateFile: 'state.json', timestampKey: 'lastRunAt', baseline: 'daily' },
  prompts: [
    {
      id: 'site.operations',
      prompt: `Load SENTRY_AUTH_TOKEN from the repository environment before collection.
Set CHECKIN_DEPLOYMENT from the active Worker deployment evidence, not the local branch HEAD.`,
    },
  ],
  timeoutMs: 30000,
  totalTimeoutMs: 45000,
} satisfies ExternalOptions
