<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Project } from '~/types'

const props = defineProps({
  project: Object as PropType<Project>,
})
</script>

<template>
  <a :href="project.link" target="_blank" class="!flex items-center space-x-3 p-4 group rounded border-gray-200/50 border-2 hover:bg-white dark:(border-gray-800/30) dark:hover:bg-gray-800 transition-all">
    <div v-if="project.icon" class="opacity-30 mr-2 group-hover:opacity-75 transition-all svg-container" v-html="project.icon" />
    <div>
      <h2 class="mb-2 text-lg">{{ project.name }}</h2>
      <p class="text-xs opacity-75">{{ project.description }}</p>
    </div>
  </a>
</template>

<style>
.svg-container svg {
  width: 35px;
  height: 35px;
}
</style>
