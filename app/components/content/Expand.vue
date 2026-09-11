<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const { width = 1100 } = defineProps<{
  width?: number
}>()

const expandStyle = computed(() => ({ width: `min(${width}px, calc(100vw - 2rem))` }))
</script>

<template>
  <div :style="expandStyle" class="content-expand">
    <slot />
  </div>
</template>

<style scoped>
:global(.prose:has(.content-expand)) {
  margin-inline: auto;
}

.content-expand {
  max-width: none;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
