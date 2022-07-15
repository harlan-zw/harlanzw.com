<script setup lang="ts">
const page = useRoute().params.slug
const path = page ? `pages/${page}` : 'pages/home'
</script>

<template>
<div>
  <ContentDoc :path="path" class="animate-enter prose prose-lg prose-gray dark:prose-white max-w-none" />
</div>
</template>
