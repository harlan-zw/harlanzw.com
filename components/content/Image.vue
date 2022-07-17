<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
defineProps<{
  alt: string
}>()
</script>

<template>
  <figure class="w-900px">
    <nuxt-img v-bind="$attrs" :alt="alt" />
    <figcaption v-if="alt" class="text-center">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  @apply transform -translate-x-100px !my-10;
}
figure :deep(img) {
  @apply rounded-lg shadow-lg;
}
</style>
