<script lang="ts" setup>
// define props
export interface UsePostsOptions {
  limit?: number
  offset?: number | string
  category?: string
  sort?: string
}

const props = withDefaults(defineProps<UsePostsOptions>(), {
  limit: 10,
  offset: 0,
  category: '',
})
const { data: posts } = await usePosts(props)
const yearKeys = Object.keys(posts.value).reverse()
</script>

<template>
  <div class="max-w-100ch mx-auto">
    <div class="space-y-7">
      <div v-for="year in yearKeys" :key="year">
        <SubTitle>
          {{ year }}
        </SubTitle>
        <div class="space-y-10">
          <PostCard v-for="(post, key) in posts[year]" :key="key" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>
