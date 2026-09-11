import type { parseArticleStats } from './article-stats'

type Reading = Extract<ReturnType<typeof parseArticleStats>, { _tag: 'Available' }>
export interface PublicWorkItem {
  title: string
  url: string
  repository: string
  number: number
  role: string
  state: 'Working' | 'Publishing' | 'Completed'
  updatedAt: number
}

export async function publicArticleReading(reading: Reading, lookup: (repository: string, number: number) => Promise<{ title: string, url: string } | null>) {
  const references = reading.agents._tag === 'Available' ? reading.agents.work : []
  const work = await Promise.all(references.map(async (reference): Promise<PublicWorkItem | null> => {
    const item = await lookup(reference.repository, reference.number)
    return item ? { ...reference, ...item } : null
  }))
  return {
    _tag: 'Available' as const,
    host: reading.host,
    runners: reading.runners,
    cost: reading.cost,
    costHistory: reading.costHistory,
    agents: reading.agents._tag === 'Available'
      ? { _tag: 'Available' as const, running: reading.agents.running, openPullRequests: reading.agents.openPullRequests, updatedAt: reading.agents.updatedAt }
      : { _tag: 'Unavailable' as const },
    work: work.filter((item): item is PublicWorkItem => item !== null).slice(0, 3),
  }
}
