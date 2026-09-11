import { z } from 'zod'

const count = z.number().int().nonnegative()
const percent = z.number().min(0).max(100)
const unavailable = z.object({ _tag: z.literal('Unavailable') })
const schema = z.object({
  host: z.object({
    cpuPercent: percent,
    memoryPercent: percent,
    memoryUsed: z.string().max(30),
    memoryTotal: z.string().max(30),
    uptime: z.string().max(30),
    updatedAt: count,
    history: z.array(z.object({ cpuPercent: percent, memoryPercent: percent, updatedAt: count })).max(90),
  }),
  agents: z.discriminatedUnion('_tag', [unavailable, z.object({
    _tag: z.literal('Available'),
    running: count,
    openPullRequests: count,
    updatedAt: count,
    work: z.array(z.object({
      repository: z.string().regex(/^[a-z0-9][a-z0-9-]*\/[\w-][\w.-]*$/i).max(200),
      number: count.positive(),
      role: z.enum(['conflict_resolution', 'review_fix', 'baseline_repair', 'adversarial_review', 'pull_request_triage', 'issue_triage', 'issue_work', 'batch_plan', 'routine_scan', 'routine_fix']),
      state: z.enum(['Working', 'Publishing', 'Completed']),
      updatedAt: count,
    })).max(8),
  })]),
  cost: z.discriminatedUnion('_tag', [unavailable, z.object({
    _tag: z.literal('Available'),
    billableMinutes: count,
    completed: count,
    trackedSince: count,
    updatedAt: count,
  })]),
  runners: z.discriminatedUnion('_tag', [unavailable, z.object({
    _tag: z.literal('Available'),
    running: count,
    capacity: count,
    queued: count.nullable(),
    memoryReservedBytes: count,
    updatedAt: count,
  })]),
})

export function isFreshReading(at: number, now: number): boolean {
  return now - at <= 90_000 && at <= now + 5000
}

export function parseArticleStats(value: unknown, now: number) {
  const parsed = schema.safeParse(value)
  if (!parsed.success || !isFreshReading(parsed.data.host.updatedAt, now))
    return { _tag: 'Unavailable' as const }
  const { host, agents, runners, cost } = parsed.data
  return {
    _tag: 'Available' as const,
    host,
    cost,
    agents: agents._tag === 'Available' && isFreshReading(agents.updatedAt, now) ? agents : { _tag: 'Unavailable' as const },
    runners: runners._tag === 'Available' && isFreshReading(runners.updatedAt, now) ? runners : { _tag: 'Unavailable' as const },
  }
}
