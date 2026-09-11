import { describe, expect, it } from 'vitest'
import { parseArticleStats } from '../../shared/utils/article-stats'

const now = Date.parse('2026-09-11T00:00:00Z')
const reading = {
  host: { cpuPercent: 20, memoryPercent: 40, memoryUsed: '12 GB', memoryTotal: '30 GB', uptime: '5h', updatedAt: now },
  runners: { _tag: 'Unavailable' },
  agents: { _tag: 'Available', running: 0, openPullRequests: 4, updatedAt: now },
}

describe('public article readings', () => {
  it('keeps a measured zero while removing private fields', () => {
    expect(parseArticleStats({ ...reading, password: 'private', agents: { ...reading.agents, prompt: 'private' } }, now)).toEqual({ _tag: 'Available', ...reading })
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
