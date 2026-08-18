<script setup lang="ts">
const { data, error, status } = await useGitHubSponsors()
const topSponsors = computed(() => data.value?.tiers.top ?? [])
const goldSponsors = computed(() => data.value?.tiers.gold ?? [])
const backers = computed(() => data.value?.ungrouped ?? [])

// The route answers with a typed unavailable state instead of an error status,
// so the reason decides the message.
const failure = computed(() => {
  const payload = data.value
  if (payload?._tag === 'unavailable')
    return payload.reason === 'not-configured' ? 'GitHub Sponsors is not configured.' : 'GitHub Sponsors did not answer.'
  return error.value ? 'The GitHub Sponsors API could not be reached.' : null
})
</script>

<template>
  <div class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
    <div class="max-w-lg">
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Community funded
      </p>
      <h2 class="mb-4 text-3xl font-bold leading-tight text-highlighted sm:text-4xl">
        Kept going by the community.
      </h2>
      <p class="mb-7 text-lg leading-8 text-muted">
        My open-source work stays free because developers and companies that rely on it help cover the time it takes.
      </p>
      <UButton to="https://github.com/sponsors/harlan-zw" target="_blank" rel="noopener" size="lg" icon="i-lucide-heart">
        Become a sponsor
      </UButton>
    </div>

    <div class="min-w-0 space-y-10">
      <UAlert v-if="failure" color="error" title="Sponsors unavailable" :description="failure" />
      <div v-else-if="status === 'pending'" class="grid grid-cols-5 gap-3" aria-label="Loading sponsors">
        <USkeleton v-for="index in 10" :key="index" class="size-12 rounded-full" />
      </div>

      <section v-if="topSponsors.length" aria-labelledby="top-sponsors">
        <h2 id="top-sponsors" class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          Top sponsors
        </h2>
        <div class="grid gap-5 sm:grid-cols-2">
          <a v-for="sponsor in topSponsors" :key="sponsor.login" :href="sponsor.websiteUrl || sponsor.profileUrl" target="_blank" rel="sponsored noopener" class="unstyled group flex min-h-20 items-center gap-4 rounded-lg border border-default bg-elevated p-4 shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
            <img :src="sponsor.avatarUrl" :alt="sponsor.name" width="56" height="56" loading="lazy" decoding="async" class="size-14 shrink-0 rounded-full ring-1 ring-default">
            <span class="min-w-0">
              <span class="block text-lg font-semibold leading-tight text-highlighted transition-colors group-hover:text-primary">{{ sponsor.name }}</span>
              <span class="block truncate text-sm text-dimmed">@{{ sponsor.login }}</span>
            </span>
          </a>
        </div>
      </section>

      <section v-if="goldSponsors.length" aria-labelledby="gold-sponsors">
        <h2 id="gold-sponsors" class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          Gold sponsors
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <a v-for="sponsor in goldSponsors" :key="sponsor.login" :href="sponsor.websiteUrl || sponsor.profileUrl" target="_blank" rel="sponsored noopener" class="unstyled group flex min-h-18 items-center gap-3 rounded-lg border border-default bg-elevated p-3 shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
            <img :src="sponsor.avatarUrl" :alt="sponsor.name" width="48" height="48" loading="lazy" decoding="async" class="size-12 shrink-0 rounded-full ring-1 ring-default">
            <span class="min-w-0">
              <span class="block truncate font-semibold text-highlighted transition-colors group-hover:text-primary">{{ sponsor.name }}</span>
              <span class="block truncate text-sm text-dimmed">@{{ sponsor.login }}</span>
            </span>
          </a>
        </div>
      </section>

      <section v-if="backers.length" aria-labelledby="backers">
        <h2 id="backers" class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          Backers
        </h2>
        <div class="grid grid-cols-5 gap-3 sm:grid-cols-7 lg:grid-cols-6 xl:grid-cols-8">
          <a v-for="sponsor in backers" :key="sponsor.login" :href="sponsor.websiteUrl || sponsor.profileUrl" :aria-label="sponsor.name" :title="sponsor.name" target="_blank" rel="sponsored noopener" class="unstyled rounded-full outline-offset-4">
            <img :src="sponsor.avatarUrl" :alt="sponsor.name" width="48" height="48" loading="lazy" decoding="async" class="size-12 rounded-full ring-1 ring-default transition-shadow duration-150 hover:ring-2 hover:ring-primary">
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
