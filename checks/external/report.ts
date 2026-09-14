import { defineReportCheck } from '@harlan-zw/nuxt-checkin/external'
import { REQUIRED_CHECKS } from '../../shared/checkin'

export default defineReportCheck({
  id: 'site.report',
  url: 'https://harlanzw.com/api/internal/checkin',
  tokenEnv: 'CHECKIN_TOKEN',
  deploymentEnv: 'CHECKIN_DEPLOYMENT',
  site: 'harlanzw.com',
  environment: 'production',
  environmentEnv: 'CHECKIN_ENVIRONMENT',
  required: REQUIRED_CHECKS,
  maxAgeMs: 60_000,
})
