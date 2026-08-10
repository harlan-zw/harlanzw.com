<script setup lang="ts">
import type { ProjectsResult } from '#shared/types'

const { data, error, status } = await useFetch<ProjectsResult>('/api/projects')
const categories = computed(() => data.value?.categories ?? [])
const totalStars = computed(() => data.value?.totalStars ?? 0)
</script>

<template>
  <div class="space-y-14 text-center">
    <UAlert v-if="error" color="error" title="Project metadata unavailable" description="The GitHub metadata service could not be reached." />
    <UAlert v-else-if="data?._tag === 'Degraded'" color="warning" title="Some GitHub metadata is unavailable" :description="`${data.failedRepos.length} projects are showing local fallback details.`" />
    <div v-if="status === 'pending'" class="grid gap-4 md:grid-cols-2" aria-label="Loading projects">
      <USkeleton v-for="index in 4" :key="index" class="h-36" />
    </div>
    <div v-else class="inline-flex items-center rounded bg-primary px-5 py-3 text-xl font-bold text-zinc-950 shadow-sm">
      <UIcon name="i-carbon-star-filled" class="mr-2 size-5 text-warning" />
      <span>{{ totalStars }} GitHub stars <span class="text-xs text-zinc-800">and counting</span></span>
    </div>
    <div v-for="category in categories" :key="category.name">
      <SubTitle>
        <Icon v-if="category.icon" :name="category.icon" class="mr-2 inline size-7" />
        {{ category.name }}
      </SubTitle>
      <div class="grid gap-4 text-left md:grid-cols-2">
        <ProjectCard v-for="project in category.projects" :key="project.repo" :project="project" />
      </div>
    </div>
  </div>
</template>
