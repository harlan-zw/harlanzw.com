<script lang="ts" setup>
import type { SitePage } from '#shared/types'

defineProps<{ post: SitePage }>()
</script>

<template>
  <div v-if="post.h1 !== false" class="mb-8 flex items-center">
    <h1 class="text-4xl font-bold leading-tight text-default">
      {{ post.title }}
    </h1>
    <Icon v-if="post.icon" :name="post.icon" class="ml-3 size-10 text-muted transition-all" />
  </div>
</template>

<style scoped>
h1 {
  line-height: 1.25 !important;
  max-width: 25ch;
}
</style>
