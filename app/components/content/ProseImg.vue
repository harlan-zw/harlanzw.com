<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{
  label?: string
  alt?: string
  src: string
  lazy?: boolean | 'false' | 'true'
  width?: number | string
  noMargin?: boolean
  figureClass?: string
}>(), {
  lazy: true,
})

const shiftLargeImgStyles = computed(() => {
  const width = Number(props.width)
  if (!width)
    return {}
  if (width <= 812) {
    return {
      width: `${width}px`,
    }
  }
  const transformX = `-${Math.round((width - 812) / 2)}px`
  return {
    width: `${width}px`,
    transform: `translateX(${transformX})`,
  }
})

const loadingType = computed(() => {
  return (props.lazy === true || props.lazy === 'true') ? 'lazy' : 'eager'
})

const isRemote = computed(() => props.src.startsWith('https://'))
const resolvedWidth = computed(() => Number(props.width) || undefined)
</script>

<template>
  <span :style="shiftLargeImgStyles" :class="[noMargin ? '!my-0' : 'lg:!my-10', figureClass]" class="image-frame transform" role="figure">
    <img
      v-if="isRemote"
      v-bind="$attrs"
      :alt="alt || label"
      :width="resolvedWidth"
      :src="src"
      :loading="loadingType"
      decoding="async"
      class="max-h-[700px] rounded"
    >
    <NuxtImg
      v-else
      v-bind="$attrs"
      height="1400"
      format="auto"
      :alt="alt || label"
      :width="resolvedWidth"
      :src="src"
      :loading="loadingType"
      provider="cloudinary"
      class="max-h-[700px] rounded"
    />
    <span v-if="label" class="image-caption text-center">
      {{ label || alt }}
    </span>
  </span>
</template>

<style scoped>
.image-frame {
  max-width: min(100%, 900px);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media(max-width: 1024px) {
  .image-frame { transform: none !important; }
}

.image-frame :deep(img:not([src$=".svg"])) {
  width: auto;
  margin-inline: auto;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  max-height: min(65vh, 700px);
}

.image-caption {
  display: block;
  margin-top: 0.75rem;
}
</style>
