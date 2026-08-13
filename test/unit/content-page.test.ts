import { describe, expect, it, vi } from 'vitest'
import { resolveContentPage } from '../../app/utils/content-page'

describe('resolveContentPage', () => {
  it('keeps the direct Comark document unchanged', async () => {
    const page = {
      body: {
        frontmatter: {},
        meta: {},
        nodes: [
          ['p', {}, 'Hello'],
        ],
      },
    }
    const query = vi.fn().mockResolvedValue(page)

    await expect(resolveContentPage('/post', query)).resolves.toEqual({
      _tag: 'Ok',
      page,
      styles: [],
    })
  })

  it('returns a tagged not-found result before rendering starts', async () => {
    const query = vi.fn().mockResolvedValue(null)

    await expect(resolveContentPage('/missing', query)).resolves.toEqual({
      _tag: 'NotFound',
      path: '/missing',
    })
    expect(query).toHaveBeenCalledWith('/missing')
  })
})
