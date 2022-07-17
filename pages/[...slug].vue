<script setup lang="ts">
import { Prose } from '#components'

const slug = useRoute().path
const path = slug !== '/' ? `pages${slug}` : 'pages/home'
const page = (await usePage(path)).data

const contentComponent = computed(() => {
  // content can opt-out of prose
  if (page.value?.prose !== false)
    return Prose
  return 'div'
})

addHead(page)
</script>

<template>
<component :is="contentComponent">
  <ContentRenderer :value="page" class="animate-enter max-w-none" />
</component>
</template>
