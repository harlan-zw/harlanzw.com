<script setup lang="ts">
const { prev } = useContent()
</script>
<template>
  <div class="max-w-xl relative border transition rounded-xl overflow-hidden">
    <div class="p-4">
      <h3 class="font-semibold mb-3">
        Meet Up
      </h3>
      <div class="text-sm mt-1 text-gray-500 dark:text-gray-300 prose">
        <p class="mb-2">
          I'm backpacking Europe while working on open-source. I'm currently in <Location class="inline" />.
        </p>
        <p class="mb-2">
          See <NuxtLink to="/meet" class="link">where I'll be </NuxtLink> next, let's meet up if I'm around your city!
        </p>
        <p class="mb-2">
          Previously:  <NuxtLink :to="prev._path" class="link">{{ prev.title }}</Nuxtlink>.
        </p>
      </div>
    </div>
  </div>
</template>
