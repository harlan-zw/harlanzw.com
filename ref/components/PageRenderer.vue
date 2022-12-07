<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Page } from '../types'

const props = defineProps({
  page: Object as PropType<Page>,
})

const contentComponent = computed(() => props.page.prose !== false ? resolveComponent('Prose') : 'div')
const schema = computed(() => props.page.schema || {})
</script>

<template>
  <div>
    <SchemaOrgWebPage
      v-bind="schema"
    />
    <component :is="contentComponent">
      <ContentRenderer :value="page" />
    </component>
  </div>
</template>
