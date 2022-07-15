<script lang="ts" setup>
const { data: post } = await usePost(`posts/${useRoute().params.slug}`)

useHead({
  title: `${post.value.title} - Harlan Wilton`,
})
</script>

<template>
<div>
  <SchemaOrgArticle :date-published="post.publishedAt" :data-modified="post.modifiedAt" />
  <div v-if="post" class="max-w-2xl prose prose-gray dark:prose-invert">
    <h1>{{ post.title }}</h1>
    <div class="flex items-center space-x-7 text-lg mb-10">
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
</div>
</template>
