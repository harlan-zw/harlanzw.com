<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  tags: Array as PropType<string[]>,
})
</script>

<template>
  <div class="inline-flex items-center space-x-4">
    <Tag v-for="tag in tags" :key="tag" :tag="tag" />
  </div>
</template>
