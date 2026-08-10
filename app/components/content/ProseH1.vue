<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h1 :id="id">
    <slot />
  </h1>
</template>

<style scoped>
h1 { display: block; }
h1 :deep(.icon) {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 0.75rem;
  opacity: 0;
  transition: opacity 100ms ease;
}
h1 a:hover :deep(.icon) { opacity: 1; }
</style>
