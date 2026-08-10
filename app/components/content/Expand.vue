<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{
  width?: number
}>(), {
  width: 1100,
})

const expandStyle = computed(() => ({ width: `${props.width}px` }))
</script>

<template>
  <div :style="expandStyle">
    <slot />
  </div>
</template>

<style scoped>
div { max-width: min(100%, 1000px); margin-inline: auto; }

@media(min-width: 1500px) {
  div {
    max-width: none;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
