import { runChecks } from '@harlan-zw/nuxt-checkin/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import check from '../../server/checks/content'

const query = vi.hoisted(() => ({ all: vi.fn(), where: vi.fn() }))
vi.mock('@harlan-zw/comark-content/server', () => ({ queryCollection: () => query }))

beforeEach(() => {
  query.where.mockReturnValue(query)
})

describe('published content check', () => {
  it('reports missing feed metadata through the shared runner', async () => {
    query.all.mockResolvedValue([{ path: '/blog/article', title: 'Article', publishedAt: null }])
    const report = await runChecks([check], { event: {} as never })
    expect(report.severity).toBe('fail')
    expect(report.results[0]?.result).toMatchObject({ evidence: { invalid: 1 } })
  })

  it('reports a readable published archive and collection cost', async () => {
    query.all.mockResolvedValue([{ path: '/blog/article', title: 'Article', publishedAt: '2026-09-01' }])
    const report = await runChecks([check], { event: {} as never })
    expect(report.severity).toBe('pass')
    expect(report.coverage).toBe('complete')
    expect(report.collections[0]).toMatchObject({ requests: 1, outcome: 'complete' })
  })

  it('keeps database failure distinct from an empty archive', async () => {
    query.all.mockRejectedValue(new Error('Database offline'))
    const report = await runChecks([check], { event: {} as never })
    expect(report.coverage).toBe('incomplete')
    expect(report.results[0]?.result._tag).toBe('Unavailable')
  })
})
