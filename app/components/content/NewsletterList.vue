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
  <div class="space-y-7 text-left">
    <div v-for="post in newsletters" :key="post.path">
      <NuxtLink :to="post.path">
        {{ post.title }}
      </NuxtLink>
    </div>
  </div>
</template>
