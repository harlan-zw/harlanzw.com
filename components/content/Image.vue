<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  alt: string
  src: string
  lazy?: boolean | 'false' | 'true'
  width?: number
  noMargin?: boolean
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

const $img = useImage()

const src = $img(props.src, {}, {
  provider,
})
</script>

<template>
  <figure :style="shiftLargeImgStyles" :class="[noMargin ? '!my-0' : ' lg:(!my-10)']">
    <nuxt-img
      v-bind="$attrs"
      :alt="alt"
      :width="width"
      :src="src"
      :loading="loadingType"
      :provider="provider"
    />
    <figcaption v-if="alt" class="text-center">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  @apply transform lg:(max-w-900px) mx-auto max-w-full;
}

@media(max-width: 1024px) {
  figure {
    @apply !translate-x-0;
  }
}

figure :deep(img:not([src$=".svg"])) {
  @apply w-auto rounded-lg shadow-lg max-h-70vh mx-auto;
}
</style>
