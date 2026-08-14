<script setup lang="ts">
import { colorModeSwitchLabel } from '~/utils/color-mode'

const colorMode = useColorMode()
const toggleMode = () => (colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button type="button" :aria-label="colorModeSwitchLabel" :title="colorModeSwitchLabel" class="group grid size-11 place-items-center rounded-md text-muted transition-[color,background-color,transform] duration-150 hover:bg-elevated hover:text-highlighted active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none" @click="toggleMode">
    <ColorScheme>
      <UIcon :name="colorMode.value === 'dark' ? 'i-line-md-moon-to-sunny-outline-transition' : 'i-line-md-sunny-outline-to-moon-transition'" class="size-6" aria-hidden="true" />
    </ColorScheme>
  </button>
</template>
