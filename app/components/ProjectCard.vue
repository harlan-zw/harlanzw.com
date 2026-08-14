<script setup lang="ts">
import type { Project } from '#shared/types'

const { project } = defineProps<{ project: Project }>()

const repo = `https://github.com/${project.repo}`
</script>

<template>
  <a :href="repo" target="_blank" rel="noopener" class="unstyled group grid min-h-36 grid-rows-[auto_1fr] gap-4 rounded-lg border border-default bg-elevated p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
    <div class="flex min-w-0 items-start gap-3">
      <Icon v-if="project.icon" :name="project.icon" class="size-9 shrink-0 text-muted transition-colors group-hover:text-primary" aria-hidden="true" />
      <div class="min-w-0 flex-1">
        <h3 class="font-semibold text-highlighted transition-colors group-hover:text-primary">
          {{ project.name }}
        </h3>
        <p class="truncate text-sm text-dimmed">
          {{ project.repo }}
        </p>
      </div>
      <span class="inline-flex shrink-0 items-center gap-1 text-sm text-muted"><UIcon name="i-carbon-star" class="size-4" aria-hidden="true" /> {{ project.stars }}</span>
    </div>
    <p class="m-0 text-sm leading-6 text-muted">
      {{ project.description || 'Description unavailable.' }}
    </p>
  </a>
</template>
