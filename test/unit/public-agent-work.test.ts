import { expect, it } from 'vitest'
import { parseArticleStats } from '../../shared/utils/article-stats'
import { publicArticleReading } from '../../shared/utils/public-agent-work'

it('excludes private work and uses titles read from public GitHub', async () => {
  const now = Date.now()
  const parsed = parseArticleStats({
    host: { cpuPercent: 0, memoryPercent: 0, memoryUsed: '0', memoryTotal: '1', uptime: '1h', updatedAt: now, history: [] },
    runners: { _tag: 'Unavailable' },
    cost: { _tag: 'Unavailable' },
    agents: { _tag: 'Available', running: 2, openPullRequests: 3, updatedAt: now, work: [
      { repository: 'owner/private', number: 1, role: 'issue_work', state: 'Working', updatedAt: now },
      { repository: 'owner/public', number: 2, role: 'adversarial_review', state: 'Completed', updatedAt: now },
    ] },
  }, now)
  if (parsed._tag !== 'Available')
    throw new Error('Invalid fixture')
  const result = await publicArticleReading(parsed, async repository => repository.endsWith('/public') ? { title: 'Public title', url: 'https://github.com/owner/public/pull/2' } : null)
  expect(result.work).toEqual([{ repository: 'owner/public', number: 2, role: 'adversarial_review', state: 'Completed', updatedAt: now, title: 'Public title', url: 'https://github.com/owner/public/pull/2' }])
  expect(result.agents).toEqual({ _tag: 'Available', running: 2, openPullRequests: 3, updatedAt: now })
})
