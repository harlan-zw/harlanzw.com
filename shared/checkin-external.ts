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
Set CHECKIN_DEPLOYMENT from the active Worker deployment evidence, not the local branch HEAD.
Never print tokens. Never send email or change provider state during collection.
Read severity and coverage separately. Missing credentials, failed reads, stale reports, and missing checks require follow-up.
Report collection cost and every unavailable check. Preserve failures when coverage is incomplete.
Follow the installed sentry-checkin Skill for unresolved Sentry issues. Inspect all returned issue IDs.
Keep expected-error policy. Verify repairs through pull requests. Do not resolve issues merely because a check completed.
Add site checks in server/checks/*.ts using the public check-in API.
Maintain required IDs independently in shared/checkin.ts and shared/checkin-external.ts.
Keep provider administration credentials in the external runner.
The module discovers external checks in checks/external during preparation.`,
    },
  ],
  timeoutMs: 30000,
  totalTimeoutMs: 45000,
} satisfies ExternalOptions
