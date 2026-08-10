import { describe, expect, it } from 'vitest'
import { colorModeSwitchLabel } from '../../app/utils/color-mode'

describe('color mode switch', () => {
  it('keeps its accessible name stable during hydration', () => {
    expect(colorModeSwitchLabel).toBe('Toggle color mode')
  })
})
