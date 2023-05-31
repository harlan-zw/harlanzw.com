<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  width?: number
}>(), {
  width: 1000,
})


const shiftLargeImgStyles = computed(() => {
  if (props.width <= 812) {
    return {
      width: `${props.width}px`,
    }
  }
  const transformX = `-${Math.round((props.width - 812) / 2)}px`
  return {
    'width': `${props.width}px`,
    '--tw-translate-x': transformX,
  }
})
</script>

<template>
  <div :style="shiftLargeImgStyles">
    <slot />
  </div>
</template>

<style scoped>
div {
  @apply transform lg:(max-w-1000px) mx-auto max-w-full;
}

@media(max-width: 1024px) {
  div {
    @apply !translate-x-0;
  }
}
</style>
