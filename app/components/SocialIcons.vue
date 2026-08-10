<script setup lang="ts">
import { socialLinks } from '#shared/site'
</script>

<template>
  <div class="flex items-center gap-1">
    <NuxtLink v-for="link in socialLinks" :key="link.name" target="_blank" rel="noopener" :href="link.href" :aria-label="link.label" class="grid size-11 place-items-center rounded-md text-muted hover:bg-elevated hover:text-highlighted">
      <UIcon :name="link.icon" :class="link.name === 'X' ? 'size-5' : 'size-6'" />
    </NuxtLink>
  </div>
</template>
