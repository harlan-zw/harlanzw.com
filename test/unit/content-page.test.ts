import { describe, expect, it, vi } from 'vitest'
import { contentPageKey, normalizeContentPath, resolveContentPage } from '../../app/utils/content-page'

describe('normalizeContentPath', () => {
  it.each([
    ['/blog/my-open-source-journey/', '/blog/my-open-source-journey'],
    ['/blog/', '/blog'],
    ['/projects/', '/projects'],
    ['/experimental/', '/experimental'],
    ['/blog', '/blog'],
    ['/', '/'],
    ['//', '/'],
  ])('maps %s to %s', (path, expected) => {
    expect(normalizeContentPath(path)).toBe(expected)
  })
})

describe('contentPageKey', () => {
  it('gives a trailing-slash route the key of its prerendered payload', () => {
    expect(contentPageKey('/blog/my-open-source-journey/')).toBe(contentPageKey('/blog/my-open-source-journey'))
  })

  it('keeps the root route distinct', () => {
    expect(contentPageKey('/')).toBe('page:/')
  })
})

describe('resolveContentPage', () => {
  it('queries the trailing-slash route against the stored content path', async () => {
    const page = { path: '/blog/my-open-source-journey' }
    const query = vi.fn().mockImplementation(async (path: string) => path === '/blog/my-open-source-journey' ? page : null)

    await expect(resolveContentPage('/blog/my-open-source-journey/', query)).resolves.toEqual({
      _tag: 'Ok',
      page,
      styles: [],
    })
    expect(query).toHaveBeenCalledWith('/blog/my-open-source-journey')
  })

  it('reports the normalized path when nothing matches', async () => {
    const query = vi.fn().mockResolvedValue(null)

    await expect(resolveContentPage('/missing/', query)).resolves.toEqual({
      _tag: 'NotFound',
      path: '/missing',
    })
  })

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
