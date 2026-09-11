<script setup lang="ts">
import { projectRunnerCosts, recentRunnerRate } from '#shared/utils/runner-projection'

const section = useTemplateRef('section')
const { current } = useArticleStats(section)
const history = computed(() => current.value?.costHistory._tag === 'Available' ? current.value.costHistory : null)
const rate = computed(() => history.value ? recentRunnerRate(history.value.days, history.value.updatedAt) : null)
const watts = ref(50)
// Simple mean of the five 2026–27 VDO residential flat usage tariffs, GST included.
const tariff = ref(28.2)
const electricitySource = 'https://www.esc.vic.gov.au/sites/default/files/documents/Victorian%20Default%20Offer%202026-27%20Price%20Determination.pdf'
const exchange = ref(0.722)
const included = ref(2000)
const share = ref(100)
const projection = computed(() => rate.value
  ? projectRunnerCosts({
      minutesPerDay: rate.value.minutesPerDay,
      averageWatts: watts.value,
      electricityAudPerKwh: tariff.value / 100,
      usdPerAud: exchange.value,
      includedMinutesPerMonth: included.value,
      billableShare: share.value,
      hardwareAud: 2773,
    })
  : null)
const result = computed(() => projection.value?._tag === 'Available' ? projection.value : null)
const maximum = computed(() => Math.max(...(result.value?.years.flatMap(year => [year.hostedAud, year.homelabAud]) ?? [1])))
const y = (amount: number) => 186 - amount / maximum.value * 150
const plot = (key: 'hostedAud' | 'homelabAud') => result.value?.years.map(point => `${48 + point.year * 112},${y(point[key])}`).join(' ') ?? ''
const aud = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value)
const date = (at: number) => new Date(at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' })
</script>

<template>
  <section ref="section" class="not-prose my-8 border-y border-default py-5" aria-label="Five-year homelab cost projection">
    <p class="text-sm text-muted">
      Five-year scenario · AUD
    </p>
    <template v-if="result">
      <p class="my-2 text-3xl font-semibold text-highlighted tabular-nums">
        {{ aud(Math.abs(result.fiveYearNetAud)) }} <span class="text-base font-normal">{{ result.fiveYearNetAud >= 0 ? 'estimated savings' : 'more than hosted CI' }}</span>
      </p>
      <p class="text-sm text-muted">
        Electricity: {{ aud(result.annualElectricityAud) }}/year · {{ Math.round(result.annualKwh) }} kWh/year
      </p>
      <svg viewBox="0 0 656 226" class="my-4 w-full" role="img" :aria-label="`Five-year costs in AUD. Hosted CI ${aud(result.years[5]!.hostedAud)}. Homelab ${aud(result.years[5]!.homelabAud)}, including hardware and electricity.`">
        <g v-for="tick in [0, maximum / 2, maximum]" :key="tick">
          <line x1="48" x2="608" :y1="y(tick)" :y2="y(tick)" stroke="currentColor" stroke-opacity="0.12" />
          <text x="38" :y="y(tick) + 4" text-anchor="end" class="chart-label">{{ tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : Math.round(tick) }}</text>
        </g>
        <polyline :points="plot('hostedAud')" fill="none" stroke="var(--ui-text-muted)" stroke-width="2" stroke-dasharray="5 4" />
        <polyline :points="plot('homelabAud')" fill="none" stroke="var(--ui-primary)" stroke-width="2.5" />
        <text v-for="year in [0, 1, 2, 3, 4, 5]" :key="year" :x="48 + year * 112" y="214" text-anchor="middle" class="chart-label">{{ year === 0 ? 'Purchase' : `Year ${year}` }}</text>
      </svg>
      <div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        <span>┄ Hosted CI {{ aud(result.years[5]!.hostedAud) }}</span>
        <span class="text-primary">━ Hardware + electricity {{ aud(result.years[5]!.homelabAud) }}</span>
      </div>
      <p class="mt-3 text-sm text-muted">
        {{ result.breakEvenYears === null ? 'This scenario does not break even.' : result.breakEvenYears > 5 ? 'This scenario does not break even within five years.' : `Estimated break-even: ${(result.breakEvenYears * 12).toFixed(0)} months.` }}
      </p>
    </template>
    <p v-else class="my-4 text-sm text-muted">
      {{ projection?._tag === 'Invalid' ? 'Enter valid assumptions to calculate the projection.' : 'The projection needs seven complete days of runner history.' }}
    </p>
    <details class="mt-5 border-t border-default pt-2">
      <summary class="flex min-h-11 cursor-pointer items-center text-sm text-primary">
        Adjust the assumptions
      </summary>
      <div class="grid grid-cols-1 gap-4 py-3 sm:grid-cols-2">
        <label class="text-sm text-muted">Average power (watts)
          <input v-model.number="watts" type="number" min="0" max="1000" step="5" class="projection-input">
        </label>
        <label class="text-sm text-muted">Electricity (AUD cents/kWh)
          <input v-model.number="tariff" type="number" min="0" max="200" step="0.01" class="projection-input">
        </label>
        <label class="text-sm text-muted">US dollars per A$1
          <input v-model.number="exchange" type="number" min="0.01" max="5" step="0.001" class="projection-input">
        </label>
        <label class="text-sm text-muted">Included GitHub minutes/month
          <input v-model.number="included" type="number" min="0" step="100" class="projection-input">
        </label>
        <label class="text-sm text-muted">Work eligible for billing (%)
          <input v-model.number="share" type="number" min="0" max="100" step="5" class="projection-input">
        </label>
      </div>
      <p class="text-sm leading-relaxed text-muted">
        Default scenario: 50 W, 24/7; <a :href="electricitySource" class="text-primary underline">28.2¢/kWh Victorian flat-tariff mean, including GST</a>;
        <a href="https://www.rba.gov.au/statistics/frequency/exchange-rates.html" class="text-primary underline">US$0.722 per A$1 on 10 September 2026</a>;
        <a href="https://docs.github.com/en/billing/concepts/product-billing/github-actions" class="text-primary underline">2,000 included minutes</a> and all work eligible for billing. Replace these with your plan and measured power.
      </p>
    </details>
    <p v-if="rate" class="mt-4 text-sm leading-relaxed text-muted">
      Based on {{ Math.round(rate.minutesPerDay).toLocaleString() }} minutes/day, {{ date(rate.start) }}–{{ date(rate.end) }} UTC.
      Assumes the same job runtime on GitHub. Holds workload, prices and exchange rate constant for five years. Charges the full hardware purchase and whole-machine power to CI. Excludes repairs, upgrades, resale value and my time. Public work reduces the billable share.
    </p>
  </section>
</template>

<style scoped>
.chart-label { font-size: 12px; fill: var(--ui-text-muted); }
.projection-input { display: block; width: 100%; min-height: 44px; margin-top: 0.375rem; padding: 0.5rem 0.75rem; border: 1px solid var(--ui-border); border-radius: 0.375rem; background: var(--ui-bg); color: var(--ui-text-highlighted); }
</style>
