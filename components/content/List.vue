<script setup lang="ts">
defineProps({
  checked: Boolean,
})

// Utils from Nuxt Content
const { flatUnwrap } = useUnwrap()
</script>

<template>
  <ul class="!p-0 !list-none">
    <li v-for="(item, index) of flatUnwrap($slots.default(), ['ul'])" :key="index" class="!pl-0 flex space-x-2">
      <i-heroicons-outline-badge-check v-if="checked" class="flex-shrink-0 w-6 h-6 !mt-1 text-primary-light" />
      <span><Markdown :use="() => item" unwrap="li" /></span>
    </li>
  </ul>
</template>

<style scoped>
li:before {
  display: none !important;
}
</style>
