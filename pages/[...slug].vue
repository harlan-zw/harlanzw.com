<script setup lang="ts">
import { Prose } from '#components'

const slug = useRoute().path
const path = slug !== '/' ? `pages${slug}` : 'pages/home'
const { data: page } = await usePage(path)

const contentComponent = computed(() => page?.value?.prose !== false ? Prose : 'div')

addHead(page)
</script>

<template>
  <div>
    <SchemaOrgWebPage
      v-bind="page.schema || {}"
      :title="page.title"
      :date-published="page.publishedAt"
      :data-modified="page.modifiedAt"
    />
    <component :is="contentComponent">
      <ContentRenderer :value="page" class="animate-enter max-w-none" />
    </component>
  </div>
</template>
