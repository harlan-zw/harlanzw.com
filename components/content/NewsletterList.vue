<script lang="ts" setup>
// define props
export interface UsePostsOptions {
  limit?: number | string
  offset?: number | string
  category?: string
  sort?: string
}

const props = withDefaults(defineProps<UsePostsOptions>(), {
  limit: 10,
  offset: 0,
  category: '',
})
const { data: posts } = await useNewsletterPosts(props)
const newsletters = Object.values(posts.value).flat()
</script>

<template>
  <div class="space-y-7 text-left">
    <div v-for="(post, key) in newsletters" :key="key">
      <NuxtLink :to="post._path">
        {{ post.title }}
      </Nuxtlink>
    </div>
  </div>
</template>
