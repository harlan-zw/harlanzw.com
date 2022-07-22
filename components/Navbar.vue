<script lang="ts" setup>
import { SiteNav } from '~/logic'

const nav = SiteNav
</script>

<template>
  <div class="header">
    <div class="flex justify-between items-center max-w-8xl mx-auto mx-auto sm:px-8 px-4">
      <Logo />
      <div class="flex items-center">
        <!-- Navigation -->
        <nav class="flex md:(space-x-7 mr-15) space-x-4 sm:mr-7 items-center opacity-75">
          <NuxtLink v-for="(link, key) in nav" v-slot="{ isActive }" :key="key" :to="link.url" class="!inline-flex items-center group" :title="link.name">
            <div :class="isActive ? ['bg-green-200', 'text-green-800'] : []" class="px-3 py-2 rounded">
              <i-line-md-text-box-multiple
                v-if="link.name === 'Blog'"
                class="hidden sm:inline-block text mr-2 transition opacity-75 group-hover:opacity-100"
                :class="isActive ? 'opacity-100' : 'opacity-75'"
              />
              <i-line-md-lightbulb
                v-else-if="link.name === 'Projects'"
                class="hidden sm:inline-block text mr-2 transition opacity-75 group-hover:opacity-100"
                :class="isActive ? 'opacity-100' : 'opacity-75'"
              />
              <i-line-md-heart
                v-else-if="link.name === 'Sponsors'"
                class="hidden sm:inline-block text mr-2 transition opacity-75 group-hover:opacity-100"
                :class="isActive ? 'opacity-100' : 'opacity-75'"
              />
              {{ link.name }}
            </div>
          </NuxtLink>
        </nav>
        <!-- Social icons & Color Mode -->
        <SocialIcons class="hidden sm:flex" />
      </div>
    </div>
  </div>
</template>

<style>
.header {
  border-style: none;
  backdrop-filter: blur(2px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
}
</style>
