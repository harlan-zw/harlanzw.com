<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <Container :fluid="page.fluid" :constrained-class="page.constrainedClass" :padded="typeof page.padded !== 'undefined' ? page.padded : true" class="page-layout">
    <SchemaOrgWebPage
      v-bind="schema"
    />
    <main>
      <slot />
    </main>
  </Container>
</template>

<style lang="ts" scoped>
css({
'.page-layout': {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '{scribe.page.height}',
  position: 'relative'
}
})
</style>
