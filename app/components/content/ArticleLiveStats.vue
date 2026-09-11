<script setup lang="ts">
import { isFreshReading } from '#shared/utils/article-stats'

const route = useRoute()
const section = useTemplateRef('section')
const visible = useElementVisibility(section)
const documentVisibility = useDocumentVisibility()
const now = useNow({ interval: 10_000 })
const { data, status, error, refresh } = useFetch('/api/article-stats', {
  server: false,
  immediate: false,
  retry: 0,
})
const current = computed(() => data.value && isFreshReading(data.value.host.updatedAt, now.value.getTime()) ? data.value : null)
const agents = computed(() => current.value?.agents._tag === 'Available' && isFreshReading(current.value.agents.updatedAt, now.value.getTime()) ? current.value.agents : null)
const runners = computed(() => current.value?.runners._tag === 'Available' && isFreshReading(current.value.runners.updatedAt, now.value.getTime()) ? current.value.runners : null)
const observedAt = computed(() => current.value ? new Date(current.value.host.updatedAt).toLocaleTimeString() : '')
const active = computed(() => visible.value && documentVisibility.value === 'visible')
function update() {
  if (status.value !== 'pending')
    return refresh()
}
const { pause, resume } = useIntervalFn(update, 30_000, { immediate: false })
watch(active, (value) => {
  if (value) {
    update()
    resume()
  }
  else {
    pause()
  }
})
</script>

<template>
  <Expand :width="route.path === '/' ? 736 : 1000">
    <section ref="section" aria-label="Hogwild live statistics" class="hogwild-stats not-prose my-10 border-y border-default py-4">
      <header class="flex items-center justify-between gap-3">
        <div class="flex items-center">
          <h2 class="font-medium text-highlighted">
            <a href="https://hogwild.harlanzw.com/" class="inline-flex min-h-11 items-center gap-2 hover:text-primary">
              <span aria-hidden="true">🐷</span> Hogwild
            </a>
          </h2>
          <UPopover>
            <UButton icon="i-lucide-info" color="neutral" variant="ghost" class="size-11" aria-label="About Hogwild" />
            <template #content>
              <div class="max-w-72 space-y-2 p-4 text-sm text-muted">
                <p>My home server runs GitHub Actions jobs and Harlan GitHub Agent.</p>
                <p>Readings refresh every 30 seconds. Running agents exclude completed reviews.</p>
                <p v-if="current">
                  Uptime: {{ current.host.uptime }}.
                </p>
                <p v-if="runners">
                  {{ runners.capacity }} runner slots. {{ (runners.memoryReservedBytes / 1024 ** 3).toFixed(1) }} GiB reserved.
                </p>
              </div>
            </template>
          </UPopover>
        </div>
        <p class="text-sm text-dimmed" role="status">
          <template v-if="current">
            {{ error ? 'Last reading' : 'Updated' }} {{ observedAt }}
          </template>
          <template v-else-if="status === 'pending' || status === 'idle'">
            Connecting…
          </template>
          <template v-else>
            Unavailable
          </template>
        </p>
      </header>
      <template v-if="current">
        <div class="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted tabular-nums">
          <span>CPU {{ Math.round(current.host.cpuPercent) }}%</span>
          <span>Memory {{ current.host.memoryUsed }} / {{ current.host.memoryTotal }}</span>
        </div>
        <dl class="grid gap-3 text-sm sm:grid-cols-2 sm:gap-8">
          <div class="flex items-baseline justify-between gap-3">
            <dt class="text-muted">
              GitHub runners
            </dt>
            <dd v-if="runners" class="text-right tabular-nums text-highlighted">
              {{ runners.running }} running<span v-if="runners.queued !== null" class="text-dimmed"> · {{ runners.queued }} queued</span>
            </dd>
            <dd v-else class="text-dimmed">
              Unavailable
            </dd>
          </div>
          <div class="flex items-baseline justify-between gap-3">
            <dt class="text-muted">
              Agents
            </dt>
            <dd v-if="agents" class="text-right tabular-nums text-highlighted">
              {{ agents.running }} running<span class="text-dimmed"> · {{ agents.openPullRequests }} PRs</span>
            </dd>
            <dd v-else class="text-dimmed">
              Unavailable
            </dd>
          </div>
        </dl>
      </template>
      <button v-else-if="status !== 'pending' && status !== 'idle'" type="button" class="min-h-11 cursor-pointer text-sm text-primary underline underline-offset-4" @click="update">
        Try again
      </button>
    </section>
  </Expand>
</template>
