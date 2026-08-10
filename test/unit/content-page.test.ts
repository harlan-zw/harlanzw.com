import { describe, expect, it, vi } from 'vitest'
import { resolveContentPage } from '../../app/utils/content-page'

describe('resolveContentPage', () => {
  it('moves generated Shiki styles out of rendered content', async () => {
    const query = vi.fn().mockResolvedValue({
      body: {
        value: [
          ['p', {}, 'Hello'],
          ['style', {}, 'html pre.shiki .a { color: red; }'],
        ],
      },
    })

    await expect(resolveContentPage('/post', query)).resolves.toMatchObject({
      _tag: 'Ok',
      page: {
        body: {
          value: [['p', {}, 'Hello']],
        },
      },
      styles: ['html pre.shiki .a { color: red; }'],
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
