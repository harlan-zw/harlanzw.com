import { describe, expect, it } from 'vitest'
import { headerNavigation } from '../../app/utils/header-navigation'

describe('headerNavigation', () => {
  it('targets the canonical trailing-slash form of each section', () => {
    for (const link of headerNavigation) {
      expect(link.to.endsWith('/')).toBe(true)
    }
  })
})
