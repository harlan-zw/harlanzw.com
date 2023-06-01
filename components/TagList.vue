<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  tags: Array as PropType<string[]>,
  small: Boolean,
})
</script>

<template>
  <div class="inline-flex items-center" :class="small ? 'space-x-2' : 'space-x-4'">
    <Tag v-for="tag in tags" :key="tag" :tag="tag" :small="small" />
  </div>
</template>
