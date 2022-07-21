<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
const props = defineProps<{
  alt: string
  src: string
  lazy?: boolean | 'false' | 'true'
}>()

const src = props.src
  .replace('.png', '')
  .replace('.jpeg', '')
const provider = props.src.startsWith('https://') ? '' : 'cloudinary'
</script>

<template>
  <figure class="w-900px">
    <nuxt-img
      v-bind="$attrs"
      :alt="alt"
      :src="src"
      :loading="Boolean(lazy) ? 'lazy' : 'eager'"
      :provider="provider"
    />
    <figcaption v-if="alt" class="text-center">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  @apply transform lg:(-translate-x-100px !my-10);
}
figure :deep(img) {
  @apply rounded-lg shadow-lg;
}
</style>
