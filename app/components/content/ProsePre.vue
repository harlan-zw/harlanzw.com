<script setup lang="ts">
defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}>()
</script>

<template>
  <pre :class="$props.class" tabindex="0"><slot /></pre>
</template>

<style>
pre code .line {
  display: block;
}
</style>
