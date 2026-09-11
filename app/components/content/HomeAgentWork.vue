<script setup lang="ts">
const section = useTemplateRef('section')
const { current, agents, status, error, update } = useArticleStats(section)
const labels: Record<string, string> = {
  adversarial_review: 'Review',
  issue_triage: 'Triage',
  pull_request_triage: 'Triage',
  issue_work: 'Implementation',
  review_fix: 'Repair',
  baseline_repair: 'Repair',
  conflict_resolution: 'Conflict resolution',
  batch_plan: 'Planning',
  routine_scan: 'Routine',
  routine_fix: 'Repair',
}
const history = computed(() => current.value?.host.history ?? [])
function sparkline(metric: 'cpuPercent' | 'memoryPercent') {
  const points = history.value
  if (points.length < 2)
    return ''
  const first = points[0]!.updatedAt
  const duration = points.at(-1)!.updatedAt - first
  if (duration <= 0)
    return ''
  return points.map(point => `${((point.updatedAt - first) / duration * 100).toFixed(1)},${(25 - point[metric] / 100 * 24).toFixed(1)}`).join(' ')
}
</script>

<template>
  <section ref="section" aria-labelledby="agent-work" class="border-t border-dashed border-default pt-3">
    <header class="flex min-h-11 items-center justify-between gap-3">
      <h2 id="agent-work" class="text-sm font-normal text-muted">
        Latest work
      </h2>
      <span class="text-sm text-muted" role="status">{{ agents ? `${agents.running} running` : status === 'pending' || status === 'idle' ? 'Connecting…' : 'Unavailable' }}</span>
    </header>
    <ul v-if="current?.work.length" class="mt-2">
      <li v-for="item in current.work" :key="item.url">
        <a :href="item.url" class="group block min-h-11 py-2">
          <span class="block truncate text-sm text-highlighted">{{ item.title }}</span>
          <span class="mt-1 flex gap-2 text-sm text-muted">
            <span class="min-w-0 truncate">{{ item.repository.split('/')[1] }} #{{ item.number }}</span>
            <span class="ml-auto shrink-0">{{ item.state === 'Completed' ? 'Reviewed' : item.state === 'Publishing' ? 'Publishing' : labels[item.role] ?? 'Working' }}</span>
          </span>
        </a>
      </li>
    </ul>
    <p v-else class="flex min-h-22 items-center text-sm text-muted">
      {{ current ? 'No public work to show right now.' : 'Waiting for the agent’s latest work.' }}
    </p>
    <button v-if="error" class="min-h-11 text-sm text-primary" type="button" @click="update">
      Try again
    </button>
    <div class="mt-4 grid grid-cols-2 gap-6 border-t border-dashed border-default pt-3" role="group" aria-label="Hogwild resource history">
      <div v-for="metric in (['cpuPercent', 'memoryPercent'] as const)" :key="metric" class="flex items-center gap-3 text-sm text-muted">
        <span class="shrink-0">{{ metric === 'cpuPercent' ? 'CPU' : 'Memory' }} {{ current ? `${Math.round(current.host[metric])}%` : '…' }}</span>
        <svg v-if="sparkline(metric)" viewBox="0 0 100 28" class="h-7 min-w-0 flex-1 text-primary" role="img" :aria-label="`${metric === 'cpuPercent' ? 'CPU' : 'Memory'} usage, recent readings`" preserveAspectRatio="none">
          <polyline :points="sparkline(metric)" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  </section>
</template>
