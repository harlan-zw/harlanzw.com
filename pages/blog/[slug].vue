<script lang="ts" setup>
const { data: post } = await usePost(`posts/${useRoute().params.slug}`)

addHead(post)
</script>

<template>
<div>
  <SchemaOrgArticle :date-published="post.publishedAt" :data-modified="post.modifiedAt" />
  <Prose>
    <h1 class="!text-3xl !leading-11 !md:(text-5xl leading-16)">{{ post.title }}</h1>
    <div class="sm:(flex space-x-7 mb-10 text-lg) mb-5 items-center">
      <div class="opacity-80 mb-5 sm:mb-0">
        {{ post.readingMins }} minute read
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
  </Prose>
</div>
</template>
