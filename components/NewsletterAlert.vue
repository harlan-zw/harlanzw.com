<script setup lang="ts">
const { prev } = useContent()
</script>

<template>
  <div class="max-w-xl relative border transition rounded-xl overflow-hidden dark:border-gray-500">
    <div class="p-4">
      <h3 class="font-semibold mb-3">
        Newsletter
      </h3>
      <div class="text-sm mt-1 text-gray-500 dark:text-gray-300 prose">
        <p class="mb-2">
          I'm backpacking Europe while working on open-source. I'm currently in <Location class="inline" />, let's <NuxtLink to="/meet" class="link">
          meet up
        </NuxtLink>!
        </p>
        <p class="mb-2">
          Previously:  <NuxtLink :to="prev._path" class="link">
            {{ prev.title }}
          </Nuxtlink>.
        </p>
      </div>
    </div>
  </div>
</template>
