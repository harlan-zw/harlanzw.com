<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string
  alt?: string
  src: string
  lazy?: boolean | 'false' | 'true'
  width?: number
  noMargin?: boolean
  figureClass?: string
}>(), {
  lazy: true,
})

const shiftLargeImgStyles = computed(() => {
  if (!props.width)
    return {}
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

const loadingType = computed(() => {
  return (props.lazy === true || props.lazy === 'true') ? 'lazy' : 'eager'
})

const provider = props.src.startsWith('https://') ? '' : 'cloudinary'
</script>

<template>
  <figure :style="shiftLargeImgStyles" :class="[noMargin ? '!my-0' : ' lg:!my-10', figureClass]" class="transform">
    <nuxt-img
      v-bind="$attrs"
      height="1400"
      format="auto"
      :alt="alt || label"
      :width="width"
      :src="src"
      :loading="loadingType"
      :provider="provider"
      class="max-h-[700px] rounded"
    />
    <figcaption v-if="label || alt" class="text-center">
      {{ label || alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  @apply transform lg:(max-w-900px) mx-auto max-w-full;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media(max-width: 1024px) {
  figure {
    @apply !translate-x-0;
  }
}

figure :deep(img:not([src$=".svg"])) {
  @apply w-auto rounded-lg shadow-lg max-h-70vh mx-auto;

  max-height: min(65vh, 700px);
}
</style>
