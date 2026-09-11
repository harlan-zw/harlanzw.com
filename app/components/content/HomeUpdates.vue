<script setup lang="ts">
const paths = [
  '/blog/improving-your-development-workflow-with-ai',
  '/blog/building-my-software-factory-on-github',
]
const { data: posts } = await useAsyncData('home:featured-articles', () => Promise.all(paths.map(path => queryCollection('pages').where('path', '=', path).first())))
</script>

<template>
  <section aria-labelledby="home-writing">
    <h2 id="home-writing" class="mb-2 text-sm text-muted">
      Latest writing
    </h2>
    <ul>
      <template v-for="post in posts" :key="post?.path">
        <li v-if="post">
          <NuxtLink :to="post.path" class="group flex min-h-11 items-center justify-between gap-4 py-2 text-highlighted hover:text-primary">
            <span>{{ post.title }}</span>
            <UIcon name="i-lucide-arrow-up-right" class="size-4 shrink-0 text-dimmed group-hover:text-primary" aria-hidden="true" />
          </NuxtLink>
        </li>
      </template>
    </ul>
  </section>
</template>
