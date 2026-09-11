import { describe, expect, it } from 'vitest'
import { parseArticleStats } from '../../shared/utils/article-stats'

const now = Date.parse('2026-09-11T00:00:00Z')
const reading = {
  host: { cpuPercent: 20, memoryPercent: 40, memoryUsed: '12 GB', memoryTotal: '30 GB', uptime: '5h', updatedAt: now, history: [] },
  runners: { _tag: 'Unavailable' },
  cost: { _tag: 'Unavailable' },
  costHistory: { _tag: 'Unavailable' },
  agents: { _tag: 'Available', running: 0, openPullRequests: 4, updatedAt: now, work: [] },
}

describe('public article readings', () => {
  it('keeps a measured zero while removing private fields', () => {
    expect(parseArticleStats({ ...reading, password: 'private', agents: { ...reading.agents, prompt: 'private' } }, now)).toEqual({ _tag: 'Available', ...reading })
  })
  it('preserves dated cost totals when live runner readings expire', () => {
    const cost = { _tag: 'Available', billableMinutes: 45271, completed: 7656, trackedSince: now - 1000000, updatedAt: now - 120000 }
    expect(parseArticleStats({ ...reading, cost }, now)).toMatchObject({ cost })
  })
  it('rejects negative cost totals', () => {
    const cost = { _tag: 'Available', billableMinutes: -1, completed: 1, trackedSince: now, updatedAt: now }
    expect(parseArticleStats({ ...reading, cost }, now)).toEqual({ _tag: 'Unavailable' })
  })
  it('rejects stale host readings', () => {
    expect(parseArticleStats(reading, now + 120_000)).toEqual({ _tag: 'Unavailable' })
  })
  it('marks stale agents unavailable while preserving fresh host metrics', () => {
    const input = { ...reading, agents: { ...reading.agents, updatedAt: now - 120_000 } }
    expect(parseArticleStats(input, now)).toEqual({ _tag: 'Available', ...reading, agents: { _tag: 'Unavailable' } })
  })
  it('rejects invalid measurements instead of displaying them', () => {
    expect(parseArticleStats({ ...reading, host: { ...reading.host, cpuPercent: 150 } }, now)).toEqual({ _tag: 'Unavailable' })
  })
})
