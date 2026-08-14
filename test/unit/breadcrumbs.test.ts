import { describe, expect, it } from 'vitest'
import { getBreadcrumbs } from '../../app/utils/breadcrumbs'

describe('getBreadcrumbs', () => {
  it('makes only the earlier breadcrumbs links', () => {
    const breadcrumbs = getBreadcrumbs('/blog/ai-in-open-source')

    expect(breadcrumbs).toEqual([
      {
        _tag: 'Link',
        id: '/blog',
        label: 'blog',
        to: '/blog',
      },
      {
        _tag: 'Current',
        id: '/blog/ai-in-open-source',
        label: 'ai in open source',
      },
    ])
  })
})
