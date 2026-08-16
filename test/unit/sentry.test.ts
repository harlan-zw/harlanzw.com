import { describe, expect, it } from 'vitest'
import { isLocalPreviewHost } from '../../shared/sentry'

describe('isLocalPreviewHost', () => {
  it.each([
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '::1',
    '192.168.1.20',
    '10.0.0.4',
    '172.16.3.9',
    'harlan-mbp.local',
  ])('treats %s as a local preview host', (hostname) => {
    expect(isLocalPreviewHost(hostname)).toBe(true)
  })

  it.each([
    'harlanzw.com',
    'www.harlanzw.com',
    'harlanzw-com.workers.dev',
    '172.15.0.1',
  ])('keeps reporting from %s', (hostname) => {
    expect(isLocalPreviewHost(hostname)).toBe(false)
  })
})
