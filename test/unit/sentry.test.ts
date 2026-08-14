import { describe, expect, it } from 'vitest'
import { filterExpectedClientError } from '../../shared/sentry'

describe('filterExpectedClientError', () => {
  it('drops expected route not-found errors', () => {
    const event = { exception: { values: [{ value: 'Page not found' }] } }
    const error = Object.assign(new Error('Page not found'), {
      fatal: true,
      statusCode: 404,
      statusMessage: 'Page not found',
    })

    expect(filterExpectedClientError(event, { originalException: error })).toBeNull()
  })

  it('keeps unrelated 404 errors', () => {
    const event = { exception: { values: [{ value: 'API resource missing' }] } }
    const error = Object.assign(new Error('API resource missing'), {
      fatal: true,
      statusCode: 404,
      statusMessage: 'Resource not found',
    })

    expect(filterExpectedClientError(event, { originalException: error })).toBe(event)
  })

  it('keeps unexpected client errors', () => {
    const event = { exception: { values: [{ value: 'Database unavailable' }] } }

    expect(filterExpectedClientError(event, { originalException: new Error('Database unavailable') })).toBe(event)
  })
})
