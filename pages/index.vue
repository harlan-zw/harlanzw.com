<script lang="ts" setup>
</script>

<template>
<div class="max-w-3xl px-4 sm:px-8 sm:rounded">
  <ContentList v-slot="{ list }" path="/feed" :query="{ without: ['head', 'body', 'excerpt'] }">
    <ArticleCard v-for="article in list" :key="article._id" :article="article" class="mb-10" />
  </ContentList>
</div>
</template>
