<script setup lang="ts">
import { runnerCostChart } from '#shared/utils/runner-cost-chart'

const { days } = defineProps<{ days: Array<{ date: string, billableMinutes: number, completed: number }> }>()
const allPoints = computed(() => runnerCostChart(days))
const points = computed(() => allPoints.value.filter(point => point.at >= (allPoints.value.at(-1)?.at ?? 0) - 30 * 86_400_000))
const selected = ref<number | null>(null)
const active = computed(() => points.value[Math.min(selected.value ?? points.value.length - 1, points.value.length - 1)]!)
const ceiling = computed(() => Math.max(1, Math.ceil((points.value.at(-1)?.totalUsd ?? 0) / 50) * 50))
const x = (at: number) => 48 + (at - points.value[0]!.at) / Math.max(86_400_000, points.value.at(-1)!.at - points.value[0]!.at) * 576
const y = (amount: number) => 190 - amount / ceiling.value * 166
const line = computed(() => points.value.map((point, index) => `${index ? 'H' : 'M'}${x(point.at)}${index ? 'V' : ','}${y(point.totalUsd)}`).join(' '))
const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
const date = (value: string) => new Date(value).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', timeZone: 'UTC' })
function inspect(event: PointerEvent) {
  const rect = event.currentTarget instanceof SVGSVGElement ? event.currentTarget.getBoundingClientRect() : null
  if (!rect)
    return
  const position = (event.clientX - rect.left) / rect.width * 656
  selected.value = points.value.reduce((best, point, index) => Math.abs(x(point.at) - position) < Math.abs(x(points.value[best]!.at) - position) ? index : best, 0)
}
</script>

<template>
  <figure v-if="points.length" class="my-6">
    <figcaption class="flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted">
      <span>Cumulative hosted-cost estimate</span>
      <span class="font-mono text-highlighted">{{ date(active.date) }} · {{ money(active.totalUsd) }}</span>
    </figcaption>
    <svg viewBox="0 0 656 218" class="mt-3 w-full text-primary" role="img" aria-label="Cumulative estimated GitHub-hosted cost in US dollars. Use the date slider for exact values." @pointermove="inspect" @pointerleave="selected = null">
      <g v-for="tick in [0, ceiling / 2, ceiling]" :key="tick">
        <line x1="48" x2="624" :y1="y(tick)" :y2="y(tick)" stroke="currentColor" stroke-opacity="0.12" />
        <text x="38" :y="y(tick) + 4" text-anchor="end" fill="currentColor" class="chart-label">${{ tick }}</text>
      </g>
      <path :d="`${line} V190 H48 Z`" fill="currentColor" fill-opacity="0.06" />
      <path :d="line" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <line :x1="x(active.at)" :x2="x(active.at)" :y1="y(active.totalUsd)" y2="190" stroke="currentColor" stroke-dasharray="3 4" stroke-opacity="0.5" />
      <circle :cx="x(active.at)" :cy="y(active.totalUsd)" r="4" fill="currentColor" />
      <text x="48" y="213" fill="currentColor" class="chart-label">{{ date(points[0]!.date) }}</text>
      <text x="624" y="213" text-anchor="end" fill="currentColor" class="chart-label">{{ date(points.at(-1)!.date) }}</text>
    </svg>
    <input :value="selected ?? points.length - 1" type="range" min="0" :max="points.length - 1" step="1" class="mt-2 h-6 w-full accent-primary" aria-label="Inspect a recorded day" :aria-valuetext="`${date(active.date)}, ${money(active.totalUsd)} cumulative, ${active.completed} jobs`" @input="selected = Number(($event.target as HTMLInputElement).value)">
    <p class="mt-1 text-sm text-muted">
      {{ active.completed.toLocaleString() }} jobs on {{ date(active.date) }} · {{ money(active.dailyUsd) }} that day
    </p>
    <p class="mt-2 text-xs text-muted">
      Recent daily detail. The cumulative amount includes earlier recorded history.
    </p>
  </figure>
</template>

<style scoped>
.chart-label { font-size: 12px; fill: var(--ui-text-muted); }
</style>
