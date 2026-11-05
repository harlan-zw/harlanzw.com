import { describe, expect, it } from 'vitest'
import { canonicalSlashLocation } from '../../server/utils/trailing-slash'

describe('canonical slash location', () => {
  it('drops the trailing slash and keeps the query', () => {
    expect(canonicalSlashLocation(new URL('https://harlanzw.com/sponsors/?ref=x'))).toBe('/sponsors?ref=x')
  })

  it('collapses repeated trailing slashes', () => {
    expect(canonicalSlashLocation(new URL('https://harlanzw.com/blog//'))).toBe('/blog')
  })

  it('leaves the root and bare paths alone', () => {
    expect(canonicalSlashLocation(new URL('https://harlanzw.com/'))).toBeNull()
    expect(canonicalSlashLocation(new URL('https://harlanzw.com/sponsors'))).toBeNull()
  })
})
