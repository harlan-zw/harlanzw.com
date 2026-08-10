<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <UApp>
    <main class="min-h-dvh grid place-items-center px-6 text-center">
      <div>
        <p class="mb-3 font-mono text-sm text-primary">
          {{ error.statusCode }}
        </p>
        <h1 class="mb-4 text-4xl font-bold">
          {{ error.statusMessage || 'Something went wrong' }}
        </h1>
        <p class="mb-8 text-muted">
          The page may have moved, or never existed.
        </p>
        <UButton to="/" icon="i-lucide-house">
          Back home
        </UButton>
      </div>
    </main>
  </UApp>
</template>
