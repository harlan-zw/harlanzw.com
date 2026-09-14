import { defineExternalCheck } from '@harlan-zw/nuxt-checkin/external'
import { defineSentryCheck } from '@harlan-zw/nuxt-sentry/checks'

export default defineExternalCheck({
  id: 'sentry.unresolved',
  run(context) {
    return defineSentryCheck({
      id: 'sentry.unresolved',
      org: 'harlan-zw',
      project: 'harlanzw-com',
      region: 'us',
    }).run(context)
  },
})
