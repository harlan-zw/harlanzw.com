<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h1 :id="id">
    <slot />
  </h1>
</template>

<style scoped lang="ts">
</style>
