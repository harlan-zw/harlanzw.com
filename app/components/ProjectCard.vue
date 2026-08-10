<script setup lang="ts">
import type { Project } from '#shared/types'

const { project } = defineProps<{ project: Project }>()

const repo = `https://github.com/${project.repo}`
</script>

<template>
  <a :href="repo" target="_blank" rel="noopener" class="group relative rounded border border-default bg-elevated/45 px-4 py-3 transition hover:border-primary/40 hover:bg-elevated">
    <div class="!flex">
      <div class="flex-shrink mt-2 mr-2">
        <Icon v-if="project.icon" :name="project.icon" class="mr-2 size-9 text-muted transition group-hover:text-primary" />
      </div>
      <div class="flex-grow">
        <div class="mb-2">
          <h3 class="-mb-1 font-semibold">{{ project.name }}</h3>
          <span class="text-xs text-muted">{{ project.repo }}</span>
        </div>
      </div>
    </div>
    <p class="m-0 mb-3 text-sm text-muted">{{ project.description || 'Description unavailable.' }}</p>
    <div class="absolute right-4 top-4 inline-flex items-center text-xs text-muted"><UIcon name="i-carbon-star" class="mr-1 size-4" /> {{ project.stars }}</div>
  </a>
</template>
