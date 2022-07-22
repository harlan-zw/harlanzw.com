<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Page } from '../types'
import { Prose } from '#components'

const props = defineProps({
  page: Object as PropType<Page>,
})

const contentComponent = computed(() => props.page.prose !== false ? Prose : 'div')
const schema = computed(() => props.page.schema || {})
</script>

<template>
  <SchemaOrgWebPage
    v-bind="schema"
  />
  <component :is="contentComponent">
    <ContentRenderer :value="page" />
  </component>
</template>
