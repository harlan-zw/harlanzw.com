import { describe, expect, it } from 'vitest'
import { resolveContentImageDimensions } from '../../app/utils/content-image'

describe('resolveContentImageDimensions', () => {
  it('preserves declared image dimensions and maximum height', () => {
    expect(resolveContentImageDimensions({ width: '1552', height: '416', maxHeight: '242' })).toEqual({
      width: 1552,
      height: 416,
      style: { maxHeight: '242px' },
    })
  })
})
