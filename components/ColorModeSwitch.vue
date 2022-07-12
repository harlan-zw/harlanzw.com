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
    <ColorScheme placeholder="test" class="w-8 h-8">
      <div v-if="colorMode.value === 'dark'">
        <i-line-md-moon class="w-8 h-8 inline-block" />
      </div>
      <div v-else class="group">
        <i-line-md-sunny-outline class="w-8 h-8 group-hover:hidden inline-block" />
        <i-line-md-sunny-outline-loop class="w-8 h-8 hidden group-hover:inline-block" />
      </div>
    </ColorScheme>
  </button>
</template>
