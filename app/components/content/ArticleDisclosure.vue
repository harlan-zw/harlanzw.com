<script setup lang="ts">
defineProps<{ summary: string }>()
</script>

<template>
  <details>
    <summary class="min-h-11 cursor-pointer py-3">
      {{ summary }}
    </summary>
    <slot />
  </details>
</template>
