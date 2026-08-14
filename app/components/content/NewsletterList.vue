<script lang="ts" setup>
const { limit = 10 } = defineProps<{ limit?: number | string }>()
const { data: newsletters } = await useAsyncData(`posts:newsletters:${limit}`, () => queryCollection('pages')
  .where('path', 'LIKE', '/blog/%')
  .where('newsletter', '=', true)
  .order('publishedAt', 'DESC')
  .limit(Number(limit))
  .all())
</script>

<template>
  <div class="text-left">
    <div v-for="post in newsletters" :key="post.path" class="border-b border-default last:border-b-0">
      <NuxtLink :to="post.path" class="unstyled block min-h-11 py-4 leading-7 text-default transition-[color,transform] duration-150 hover:translate-x-1 hover:text-primary motion-reduce:transform-none motion-reduce:transition-none">
        {{ post.title }}
      </NuxtLink>
    </div>
  </div>
</template>
