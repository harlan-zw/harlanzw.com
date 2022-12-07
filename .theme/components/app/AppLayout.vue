<script setup lang="ts">
const scribe = useScribe()
const { navigation, page } = useContent()
const { navKeyFromPath } = useContentHelpers()

const titleTemplate = computed(() => {
  const appTitleTemplate = scribe.value.head?.titleTemplate || `%s · ${scribe.value.title}`
  if (page.value) {
    return page.value.head?.titleTemplate || navKeyFromPath(page.value._path, 'titleTemplate', navigation.value || []) || appTitleTemplate
  }
  return appTitleTemplate
})

defineProps({
  padded: {
    type: Boolean,
    default: true
  }
})

useHead({
  titleTemplate: titleTemplate.value,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

watch(titleTemplate, () => {
  useHead({ titleTemplate: titleTemplate.value })
})

useContentHead(scribe.value as any)
</script>

<template>
  <div>
    <AppLoadingBar />
    <AppHeader v-if="scribe.header" />
    <slot />
    <AppFooter v-if="scribe.footer" />
  </div>
</template>
