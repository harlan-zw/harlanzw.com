<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h1 :id="id">
    <slot />
  </h1>
</template>

<style scoped lang="ts">
css({
  h1: {
    display: 'block',
    margin: '{prose.h1.margin}',
    fontSize: '{prose.h1.fontSize}',
    lineHeight: '{prose.h1.lineHeight}',
    fontWeight: '{prose.h1.fontWeight}',
    letterSpacing: '{prose.h1.letterSpacing}',
    ':deep(.icon)': {
      marginLeft: '12px',
      display: 'inline-block',
      opacity: '0',
      transition: 'opacity 100ms',
      width: '{prose.h1.iconSize}',
      height: '{prose.h1.iconSize}',
    },
    '& a:hover': {
      ':deep(.icon)': {
        opacity: '1'
      }
    },
  },
})
</style>
