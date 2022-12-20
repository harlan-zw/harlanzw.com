<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Project } from '~/types'

const props = defineProps({
  project: Object as PropType<Project>,
})

const repo = `https://github.com/${props.project?.repo}`
</script>

<template>
  <a :href="repo" target="_blank" class="relative px-4 py-3 group rounded border-gray-200/10 border-2 hover:bg-white dark:(border-gray-800/10) dark:hover:bg-gray-800 transition-all">
    <div class="!flex">
      <div class="flex-shrink mt-2 mr-2">
        <icon v-if="project.icon" :name="project.icon" class="w-14 h-auto opacity-70 mr-2 group-hover:opacity-75 transition-all svg-container" />
      </div>
      <div class="flex-grow">
        <div class="mb-2">
          <h3 class="-mb-1 font-bold">{{ project.name }}</h3>
          <span class="opacity-50 text-xs">{{ props.project?.repo }}</span>
        </div>
      </div>
    </div>
    <p class="text-sm opacity-90 mb-3 m-0">{{ project.description || 'placeholder' }}</p>
    <div class="text-xs inline-flex items-center absolute top-4 right-4"><i-carbon-star class="inline mr-1 mb-2px" /> {{ project.stars || 0 }}</div>
  </a>
</template>

<style>
.svg-container svg {
  width: 35px;
  height: 35px;
}
</style>
