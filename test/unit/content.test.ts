import { describe, expect, it } from 'vitest'
import { getReadingMinutes, groupPostsByYear } from '../../app/utils/content'

describe('getReadingMinutes', () => {
  it('counts only prose text and rounds up at 220 words', () => {
    const words = Array.from({ length: 221 }, (_, index) => `word${index}`).join(' ')
    const body = {
      frontmatter: {},
      meta: {},
      nodes: [
        ['p', {}, words],
        ['img', { alt: 'metadata should not count' }],
      ],
    }

    expect(getReadingMinutes(body)).toBe(2)
  })
})

describe('groupPostsByYear', () => {
  it('drops posts without a publication date and returns newest years first', () => {
    const posts = [
      { path: '/blog/old', publishedAt: '2024-01-01' },
      { path: '/blog/new', publishedAt: '2026-01-01' },
      { path: '/blog/draft' },
    ]

    const groups = groupPostsByYear(posts)
    expect(groups.map(group => group.year)).toEqual(['2026', '2024'])
    expect(groups[0]?.posts[0]?.path).toBe('/blog/new')
  })
})
