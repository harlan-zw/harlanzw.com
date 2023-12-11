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
          I'm back in Sydney for a couple of months working on open-source. Let's <NuxtLink to="/meet" class="link">
            meet up
          </NuxtLink>!
        </p>
        <p class="mb-2">
          Previous personal update:  <NuxtLink :to="prev._path" class="link">
            {{ prev.title }}
          </Nuxtlink>.
        </p>
      </div>
    </div>
  </div>
</template>
