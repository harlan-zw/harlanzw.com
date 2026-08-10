import { describe, expect, it } from 'vitest'
import { site, socialLinks } from '../../shared/site'

describe('site metadata', () => {
  it('uses canonical social profiles everywhere', () => {
    expect(socialLinks.find(link => link.name === 'X')?.href).toBe('https://x.com/harlan_zw')
    expect(socialLinks.find(link => link.name === 'Discord')?.href).toBe('https://discord.com/invite/5jDAMswWwX')
    expect(site.sameAs).toEqual(socialLinks.filter(link => link.identity).map(link => link.href))
  })
})
