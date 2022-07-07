<script lang="ts" setup>
import { fetchPost } from '~/logic'
import ArticleTags from "~/components/content/ArticleTags.vue";

console.log('path', `/articles/${useRoute().params.slug}`)
const post = await fetchPost(`articles/${useRoute().params.slug}` as string)
</script>

<template>
  <div class="max-w-2xl prose prose-gray dark:prose-invert ">
    <h1>{{ post.title }}</h1>
    <ArticleTags :tags="post.tags" />
    <!-- Fetch and display the Markdown document from current path -->
    <ContentDoc class="max-w-none">
      <!-- Slot if document is not found -->
      <template #not-found>
        <h1 class="text-2xl">
          Page not found
        </h1>
      </template>
    </ContentDoc>
  </div>
</template>

<style lang="postcss">
/* Customize headers to remove default underline */
.prose h2 a,
.prose h3 a {
  @apply no-underline;
  &:hover {
    @apply border-b border-neutral-600 dark:border-neutral-300;
  }
}
</style>
