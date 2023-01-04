<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Post } from '~/types'

const props = defineProps({
  post: Object as PropType<Post>,
})
</script>

<template>
  <div v-if="post.h1 !== false" class="flex items-center mb-8">
    <h1 class="text-4xl font-bold leading-25">
      {{ post.title }}
    </h1>
    <icon v-if="post.icon" :name="post.icon" class="w-14 mb-1 h-auto opacity-50 ml-2 transition-all svg-container" />
  </div>
</template>

<style scoped>
h1 {
  line-height: 1.25 !important;
  max-width: 25ch;
}
</style>
