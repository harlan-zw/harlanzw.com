<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Project } from '~/logic'

const props = defineProps({
  project: Object as PropType<Project>,
})
</script>

<template>
  <a :href="project.link" target="_blank" class="!flex space-x-3 p-4 group rounded hover:bg-white dark:hover:bg-gray-800 transition-all">
    <div v-if="project.icon" class="opacity-30 pt-1 group-hover:opacity-75 transition-all" v-html="project.icon" />
    <div>
      <h2 class="opacity-85 mb-2 text-lg">
        {{ project.name }}
      </h2>
      <p class="text-xs opacity-75 h-12">{{ project.description }}</p>
    </div>
  </a>
</template>
