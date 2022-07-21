<script setup lang="ts">
import { Prose } from '#components'

const slug = useRoute().path
const path = slug !== '/' ? `pages${slug}` : 'pages/home'
const { data: page } = await usePage(path)

const contentComponent = computed(() => page?.value?.prose !== false ? Prose : 'div')

const schema = page.value.schema || {}
const meta = addHead(page)
</script>

<template>
  <div>
    <SchemaOrgWebPage
      v-bind="schema"
      :title="meta.title"
      :description="meta.description"
      :image="meta.image"
      :date-published="page.publishedAt"
      :data-modified="page.modifiedAt"
    />
    <component :is="contentComponent">
      <ContentRenderer :value="page" />
    </component>
  </div>
</template>
