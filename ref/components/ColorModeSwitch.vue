<script setup lang="ts">
const colorMode = useColorMode()
const toggleMode = () => (colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button aria-label="Color Mode" :title="`Enable ${colorMode.value === 'dark' ? 'Light' : 'Dark'} Mode`" class="p-2 link inline-block hover:text-gray-700 dark:hover:text-gray-300 group" @click.prevent="toggleMode">
    <div class="icon">
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
    </div>
  </button>
</template>
