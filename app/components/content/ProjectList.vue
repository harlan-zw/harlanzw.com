<script setup lang="ts">
import type { ProjectsResult } from '#shared/types'

const { data, error, status } = await useFetch<ProjectsResult>('/api/projects')
const categories = computed(() => data.value?.categories ?? [])
const totalStars = computed(() => data.value?.totalStars ?? 0)
</script>

<template>
  <div class="space-y-16 text-center">
    <UAlert v-if="error" color="error" title="Project metadata unavailable" description="The GitHub metadata service could not be reached." />
    <UAlert v-else-if="data?._tag === 'Degraded'" color="warning" title="Some GitHub metadata is unavailable" :description="`${data.failedRepos.length} projects are showing local fallback details.`" />
    <div v-if="status === 'pending'" class="grid gap-4 md:grid-cols-2" aria-label="Loading projects">
      <USkeleton v-for="index in 4" :key="index" class="h-36 rounded-lg" />
    </div>
    <template v-else-if="categories.length">
      <div class="inline-flex min-h-11 items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-base font-semibold text-primary shadow-sm">
        <UIcon name="i-carbon-star-filled" class="mr-2 size-5 text-warning" aria-hidden="true" />
        <span>{{ totalStars }} GitHub stars <span class="font-normal text-muted">and counting</span></span>
      </div>
      <section v-for="category in categories" :key="category.name">
        <SubTitle>
          <Icon v-if="category.icon" :name="category.icon" class="mr-2 inline size-6" aria-hidden="true" />
          {{ category.name }}
        </SubTitle>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-4 text-left">
          <ProjectCard v-for="project in category.projects" :key="project.repo" :project="project" />
        </div>
      </section>
    </template>
  </div>
</template>
