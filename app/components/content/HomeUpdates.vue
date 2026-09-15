<script setup lang="ts">
const paths = [
  '/blog/fighting-github-ci-bills-with-my-own-homelab',
  '/blog/improving-your-development-workflow-with-ai',
  '/blog/building-my-software-factory-on-github',
]
const { data: posts } = await useAsyncData('home:featured-articles', () => Promise.all(paths.map(path => queryCollection('pages').where('path', '=', path).select('path', 'title').first())))
</script>

<template>
  <section aria-labelledby="home-writing" class="border-t border-default pt-3">
    <h2 id="home-writing" class="flex min-h-11 items-center text-sm text-muted">
      Latest writing
    </h2>
    <ul class="mt-2">
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
