<script setup lang="ts">
const { align } = defineProps<{
  align?: 'center' | 'left' | 'right'
}>()
</script>

<template>
  <th
    scope="col"
    :class="{
      'text-center': align === 'center',
      'text-left': align === 'left',
      'text-right': align === 'right',
    }"
  >
    <slot />
  </th>
</template>
