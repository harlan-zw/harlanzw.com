<script setup lang="ts">
import { colorModeSwitchLabel } from '~/utils/color-mode'

const colorMode = useColorMode()
const toggleMode = () => (colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button type="button" :aria-label="colorModeSwitchLabel" :title="colorModeSwitchLabel" class="group grid size-11 place-items-center rounded-md text-muted transition-colors hover:bg-elevated hover:text-highlighted" @click="toggleMode">
    <ColorScheme placeholder="">
      <UIcon :name="colorMode.value === 'dark' ? 'i-line-md-moon-to-sunny-outline-transition' : 'i-line-md-sunny-outline-to-moon-transition'" class="size-6" />
    </ColorScheme>
  </button>
</template>
