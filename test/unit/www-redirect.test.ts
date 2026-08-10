import { describe, expect, it } from 'vitest'
import { redirectToApex } from '../../workers/www-redirect'

describe('www redirect worker', () => {
  it('preserves the path and query while redirecting to the apex', () => {
    const response = redirectToApex(new Request('https://www.harlanzw.com/blog/post?ref=test'))

    expect(response.status).toBe(308)
    expect(response.headers.get('location')).toBe('https://harlanzw.com/blog/post?ref=test')
  })
})
