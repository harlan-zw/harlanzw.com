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
  <button aria-label="Color Mode"  :title="`Enable ${colorMode.value === 'dark' ? 'Light' : 'Dark'} Mode`" class="link inline-block group icon hover:text-gray-700 dark:hover:text-gray-300 group" @click.prevent="onClick">
    <ColorScheme placeholder="">
      <template v-if="colorMode.value === 'dark'">
        <i-line-md-moon class="icon icon--off" />
        <i-line-md-moon-twotone class="icon icon--on" />
      </template>
      <template v-else>
        <i-line-md-sunny-outline class="icon icon--off" />
        <i-line-md-sunny-outline-loop class="icon icon--on" />
      </template>
    </ColorScheme>
  </button>
</template>
