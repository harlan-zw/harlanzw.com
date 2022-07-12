<script lang="ts" setup>
import { fetchPost } from '~/logic'

const { data: post } = await fetchPost(`posts/${useRoute().params.slug}`)
</script>

<template>
<div v-if="post" class="max-w-2xl prose prose-gray dark:prose-invert">
  <h1>{{ post.title }}</h1>
  <div class="flex items-center space-x-10">
    <div class="opacity-580">
      {{  post.readingMins }} minute read
    </div>
    <TagList :tags="post.tags" />
  </div>
  <!-- Fetch and display the Markdown document from current path -->
  <ContentRenderer :value="post" class="max-w-none">
    <!-- Slot if document is not found -->
    <template #not-found>
    <h1 class="text-2xl">
      Page not found
    </h1>
    </template>
  </ContentRenderer>
</div>
</template>
