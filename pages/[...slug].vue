<script lang="ts" setup>
import { articleCardQuery } from '~/logic'

const articles = await articleCardQuery.find()
</script>

<template>
  <div class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 sm:rounded">
    <ContentList v-slot="{ list }" path="/articles" :query="{ only: ['title', 'description'] }">
      <div v-for="article in list" :key="article._path">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <pre>
          {{ article }}
        </pre>
      </div>
    </ContentList>
    <!-- Fetch and display the Markdown document from current path -->
    <ContentDoc  path="/pages" class="prose prose-gray dark:prose-invert max-w-none">
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
