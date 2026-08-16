import * as Sentry from '@sentry/nuxt'
import { createSentryDataCollection, isLocalPreviewHost, SENTRY_DSN } from './shared/sentry'

if (!import.meta.dev && !isLocalPreviewHost(window.location.hostname)) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: 'production',
    tracesSampleRate: 0.05,
    dataCollection: createSentryDataCollection(),
    ignoreErrors: [
      /Failed to fetch dynamically imported module/i,
      /Importing a module script failed/i,
      /error loading dynamically imported module/i,
    ],
  })
}
