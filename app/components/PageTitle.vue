<script lang="ts" setup>
import type { SitePage } from '#shared/types'

defineProps<{ post: SitePage }>()
</script>

<template>
  <div v-if="post.h1 !== false" class="mb-10 flex items-start gap-3">
    <h1 class="max-w-[24ch] text-balance text-4xl leading-[1.08] font-bold tracking-[-0.025em] text-highlighted sm:text-5xl">
      {{ post.title }}
    </h1>
    <Icon v-if="post.icon" :name="post.icon" class="mt-1 size-9 shrink-0 text-muted transition-colors sm:size-10" aria-hidden="true" />
  </div>
</template>
