<script lang="ts" setup>
import type { SitePage } from '#shared/types'
import { getReadingMinutes } from '~/utils/content'

const { post } = defineProps<{ post: SitePage }>()
const readingMins = computed(() => getReadingMinutes(post.body))
</script>

<template>
  <div class="group min-w-0">
    <NuxtLink :to="post.path" class="unstyled block min-h-11 border-b border-default py-5 transition-[border-color,transform] duration-150 hover:translate-x-1 hover:border-primary/40 motion-reduce:transform-none motion-reduce:transition-none">
      <div class="grid gap-2">
        <h3 class="text-xl leading-snug font-semibold text-highlighted transition-colors duration-150 group-hover:text-primary">
          {{ post.title }}
        </h3>
        <p class="text-sm text-muted">
          {{ readingMins }} min read
        </p>
        <p class="text-base leading-7 text-muted">
          {{ post.description }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
