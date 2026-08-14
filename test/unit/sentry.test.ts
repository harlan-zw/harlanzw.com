import { describe, expect, it } from 'vitest'
import { filterExpectedClientError } from '../../shared/sentry'

describe('filterExpectedClientError', () => {
  it('drops expected route not-found errors', () => {
    const event = { exception: { values: [{ value: 'Page not found' }] } }
    const error = Object.assign(new Error('Page not found'), { statusCode: 404 })

    expect(filterExpectedClientError(event, { originalException: error })).toBeNull()
  })

  it('keeps unexpected client errors', () => {
    const event = { exception: { values: [{ value: 'Database unavailable' }] } }

    expect(filterExpectedClientError(event, { originalException: new Error('Database unavailable') })).toBe(event)
  })
})
