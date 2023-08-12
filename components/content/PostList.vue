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
<div class="lg:(grid grid-cols-2 gap-20) space-y-10 max-w-full">
  <div>
    <SubTitle>Tech Articles</SubTitle>
    <div class="space-y-5">
      <div v-for="year in yearKeys" :key="year" class="relative max-w-full">
        <div class="opacity-50 text-3xl font-thin absolute -left-25 hidden 2xl:block">
          {{ year }}
        </div>
        <div class="space-y-5" style="max-width: 50ch;"  >
          <PostCard v-for="(post, key) in posts[year].filter(p => p.status !== 'unlisted')" :key="key" :post="post" class="max-w-full flex" />
        </div>
      </div>
    </div>
  </div>
  <div>
    <SubTitle>Personal Blog</SubTitle>
    <NewsletterList style="max-width: 50ch;" />
  </div>
</div>
</template>
