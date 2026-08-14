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
  <div class="grid max-w-full gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-20">
    <section>
      <SubTitle>Tech Articles</SubTitle>
      <div>
        <div v-for="group in postGroups" :key="group.year" class="relative max-w-full">
          <div class="absolute -left-24 hidden text-3xl font-light text-muted 2xl:block">
            {{ group.year }}
          </div>
          <div>
            <PostCard v-for="post in group.posts.filter(post => post.status !== 'unlisted')" :key="post.path" :post="post" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <SubTitle>Personal Blog</SubTitle>
      <ContentNewsletterList />
    </section>
  </div>
</template>
