<script lang="ts" setup>
const { limit = 10 } = defineProps<{ limit?: number }>()
const { data } = await useAsyncData('posts:articles', () => queryCollection('pages')
  .where('path', 'LIKE', '/blog/%')
  .where('newsletter', '=', false)
  .order('publishedAt', 'DESC')
  .limit(limit)
  .all())
const postGroups = computed(() => groupPostsByYear(data.value ?? []))
</script>

<template>
  <div class="max-w-full space-y-10 lg:grid lg:grid-cols-2 lg:gap-20 lg:space-y-0">
    <div>
      <SubTitle>Tech Articles</SubTitle>
      <div class="space-y-5">
        <div v-for="group in postGroups" :key="group.year" class="relative max-w-full">
          <div class="absolute -left-24 hidden text-3xl font-light text-muted 2xl:block">
            {{ group.year }}
          </div>
          <div class="space-y-5" style="max-width: 50ch;">
            <PostCard v-for="post in group.posts.filter(post => post.status !== 'unlisted')" :key="post.path" :post="post" class="flex" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <SubTitle>Personal Blog</SubTitle>
      <ContentNewsletterList style="max-width: 50ch;" />
    </div>
  </div>
</template>
