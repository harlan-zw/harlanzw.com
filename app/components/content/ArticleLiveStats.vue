<script setup lang="ts">
defineProps<{ contained?: boolean }>()
const section = useTemplateRef('section')
const { current, agents, runners, observedAt, status, error, update } = useArticleStats(section)
const emptyReading = computed(() => !current.value && (status.value === 'pending' || status.value === 'idle') ? 'Loading…' : 'Unavailable')
</script>

<template>
  <Expand :width="736" :contained="contained">
    <section ref="section" aria-label="Hogwild live statistics" class="hogwild-stats @container not-prose my-10 border-y border-default py-3">
      <header class="flex items-center justify-between gap-3">
        <div class="flex items-center">
          <h2 class="font-medium text-highlighted">
            <a href="https://hogwild.harlanzw.com/" class="inline-flex min-h-11 items-center gap-2 hover:text-primary">
              <span aria-hidden="true">🐷</span> Hogwild
            </a>
          </h2>
          <UPopover :ui="{ content: contained ? 'dark bg-neutral-900' : undefined }">
            <UButton icon="i-lucide-info" color="neutral" variant="ghost" class="size-11" aria-label="About Hogwild" />
            <template #content>
              <div class="max-w-72 space-y-2 p-4 text-sm text-muted">
                <p>My home server runs GitHub Actions jobs and Harlan GitHub Agent.</p>
                <p>Readings refresh every 30 seconds. Running agents exclude completed reviews.</p>
                <p v-if="current">
                  Updated {{ observedAt }}.
                </p>
                <p v-if="current">
                  Uptime: {{ current.host.uptime }}.
                </p>
                <p v-if="contained && current">
                  Memory: {{ current.host.memoryUsed }} / {{ current.host.memoryTotal }}.
                </p>
                <p v-if="contained && agents">
                  {{ agents.openPullRequests }} open PRs.
                </p>
                <p v-if="contained && runners && runners.queued !== null">
                  {{ runners.queued }} queued jobs.
                </p>
                <p v-if="runners">
                  {{ runners.capacity }} runner slots. {{ (runners.memoryReservedBytes / 1024 ** 3).toFixed(1) }} GiB reserved.
                </p>
              </div>
            </template>
          </UPopover>
        </div>
        <p class="flex items-center gap-2 text-sm text-muted" role="status">
          <template v-if="current">
            <span class="inline-block size-1.5 rounded-full" :class="error ? 'bg-muted' : 'bg-primary'" aria-hidden="true" />
            {{ error ? 'Last reading' : 'Live' }}
          </template>
          <template v-else-if="status === 'pending' || status === 'idle'">
            Connecting…
          </template>
          <template v-else>
            Unavailable
          </template>
        </p>
      </header>
      <dl class="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 text-sm @min-[36rem]:grid-cols-4">
        <div>
          <dt class="text-muted">
            CPU
          </dt>
          <dd class="mt-1 font-medium tabular-nums text-highlighted" :class="current ? 'text-xl' : 'text-sm'">
            {{ current ? `${Math.round(current.host.cpuPercent)}%` : emptyReading }}
          </dd>
        </div>
        <div>
          <dt class="text-muted">
            Memory
          </dt>
          <dd class="mt-1 font-medium tabular-nums text-highlighted" :class="current ? 'text-xl' : 'text-sm'">
            {{ current ? `${Math.round(current.host.memoryPercent)}%` : emptyReading }}
            <span v-if="current && !contained" class="mt-1 block text-sm font-normal text-muted">{{ current.host.memoryUsed }} / {{ current.host.memoryTotal }}</span>
          </dd>
        </div>
        <div>
          <dt class="text-muted">
            GitHub runners
          </dt>
          <dd class="mt-1 font-medium tabular-nums text-highlighted" :class="runners ? 'text-xl' : 'text-sm'">
            <template v-if="runners">
              {{ runners.running }} <span class="text-sm font-normal text-muted">running</span>
            </template>
            <template v-else>
              {{ emptyReading }}
            </template>
            <span v-if="runners && runners.queued !== null && !contained" class="mt-1 block text-sm font-normal text-muted">{{ runners.queued }} queued</span>
          </dd>
        </div>
        <div>
          <dt class="text-muted">
            Agents
          </dt>
          <dd class="mt-1 font-medium tabular-nums text-highlighted" :class="agents ? 'text-xl' : 'text-sm'">
            <template v-if="agents">
              {{ agents.running }} <span class="text-sm font-normal text-muted">running</span>
            </template>
            <template v-else>
              {{ emptyReading }}
            </template>
            <span v-if="agents && !contained" class="mt-1 block text-sm font-normal text-muted">{{ agents.openPullRequests }} open PRs</span>
          </dd>
        </div>
      </dl>
      <button v-if="!current && status !== 'pending' && status !== 'idle'" type="button" class="min-h-11 cursor-pointer text-sm text-primary underline underline-offset-4" @click="update">
        Try again
      </button>
    </section>
  </Expand>
</template>
