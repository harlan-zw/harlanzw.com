<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  width?: number
}>(), {
  width: 1100,
})

const { width } = useWindowSize()

const shiftLargeImgStyles = computed(() => {
  const transformX = `-${Math.round((props.width - 812) / 2)}px`
  // if screen width exceeds 1500px we can translate, otherwise we go full width
  if (width.value < 1500)
    return {}
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
