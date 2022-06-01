<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'w-8 h-8',
  },
  spacing: {
    type: String,
    default: 'p-0',
  },
})

const colorMode = useColorMode()
const onClick = () => (colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button aria-label="Color Mode" class="inline-block" @click="onClick">
    <ColorScheme placeholder="" class="w-8 h-8">
      <i-heroicons-outline-moon v-if="colorMode.value === 'dark'" class="w-8 h-8" />
      <i-heroicons-outline-sun v-else class="w-8 h-8" />
    </ColorScheme>
  </button>
</template>
