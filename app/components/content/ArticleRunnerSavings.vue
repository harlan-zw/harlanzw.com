<script setup lang="ts">
const section = useTemplateRef('section')
const { current, status, update } = useArticleStats(section)
const cost = computed(() => current.value?.cost._tag === 'Available' ? current.value.cost : null)
const usdPerMinute = 0.006
const amount = computed(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((cost.value?.billableMinutes ?? 0) * usdPerMinute))
const date = (value: number) => new Date(value).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
</script>

<template>
  <section ref="section" class="not-prose my-8 border-y border-default py-5" aria-label="Hogwild runner cost comparison">
    <p class="text-sm text-muted">
      Estimated GitHub-hosted cost avoided
    </p>
    <template v-if="cost">
      <p class="my-2 text-4xl font-semibold tabular-nums text-highlighted">
        {{ amount }} <span class="text-sm font-normal text-muted">USD</span>
      </p>
      <p class="text-sm text-muted">
        {{ cost.completed.toLocaleString() }} jobs · {{ cost.billableMinutes.toLocaleString() }} billable minutes
      </p>
      <p class="mt-2 text-sm text-muted">
        Tracked since {{ date(cost.trackedSince) }}. Reading from {{ date(cost.updatedAt) }}.
      </p>
    </template>
    <p v-else class="my-3 text-sm text-muted">
      {{ status === 'pending' || status === 'idle' ? 'Reading Hogwild job totals…' : 'Job totals are unavailable.' }}
    </p>
    <ArticleCostChart v-if="current?.costHistory._tag === 'Available'" :days="current.costHistory.days" />
    <p v-else-if="cost" class="mt-4 text-sm text-muted">
      Daily history is unavailable.
    </p>
    <p class="mt-4 text-sm leading-relaxed text-muted">
      Recorded runtime, rounded up per job, at <a href="https://docs.github.com/en/billing/reference/actions-runner-pricing" class="text-primary underline">$0.006 per minute</a>.
      Excludes included GitHub minutes, hardware, electricity and any difference in runner speed. Net savings also depend on those costs.
    </p>
    <button v-if="!cost && status === 'error'" type="button" class="mt-2 min-h-11 text-sm text-primary" @click="update">
      Try again
    </button>
  </section>
</template>
