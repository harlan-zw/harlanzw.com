export const SENTRY_DSN = 'https://8b3cdae1f3b66b32c99644bdc5da7529@o4510507748163584.ingest.us.sentry.io/4511887363211264'

interface ErrorHint {
  originalException?: unknown
}

function isExpectedRouteNotFoundError(value: unknown): value is Error & {
  fatal: true
  statusCode: 404
  statusMessage: 'Page not found'
} {
  return value instanceof Error
    && value.message === 'Page not found'
    && 'fatal' in value
    && value.fatal === true
    && 'statusCode' in value
    && value.statusCode === 404
    && 'statusMessage' in value
    && value.statusMessage === 'Page not found'
}

export function filterExpectedClientError<Event>(event: Event, hint: ErrorHint): Event | null {
  return isExpectedRouteNotFoundError(hint.originalException) ? null : event
}

const LOCAL_PREVIEW_HOSTNAME = /^(?:localhost|\[?::1\]?|0\.0\.0\.0|127\.\d{1,3}\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|[^.]+\.local)$/i

/**
 * `nuxi preview` and `wrangler dev` both run with `NODE_ENV=production`, so a
 * local build reports into the live project and files issues no visitor ever hit.
 * An unrecognised host still reports, so a real deployment cannot be silenced here.
 */
export function isLocalPreviewHost(hostname: string): boolean {
  return LOCAL_PREVIEW_HOSTNAME.test(hostname)
}

export function sentryRelease(): string | undefined {
  return process.env.SENTRY_RELEASE || process.env.GITHUB_SHA || undefined
}

export function createSentryDataCollection() {
  return {
    userInfo: false,
    cookies: false,
    httpHeaders: { request: false, response: false },
    httpBodies: [],
    urlQueryParams: false,
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    stackFrameVariables: false,
  }
}
