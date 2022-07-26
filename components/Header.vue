<script lang="ts" setup>
import { SiteNav } from '~/logic'
// const nav = SiteNav

const { data: nav } = await useHeaderNav()
</script>

<template>
<header>
  <div class="flex justify-between items-center max-w-8xl mx-auto mx-auto sm:px-8 px-4">
    <Logo />
    <div class="flex items-center">
      <!-- Navigation -->
      <nav aria-label="Main Menu" class="opacity-75">
        <ul class="flex lg:(space-x-7 mr-15) md:mr-7 items-center">
          <li v-for="(link, key) in nav" :key="key">
            <NuxtLink v-slot="{ isActive }" :to="link.path" class="!inline-flex items-center group" :title="`Visit ${link.title} Page`">
              <div :class="isActive ? ['bg-green-50', 'text-green-800', 'dark:(bg-green-800/10 text-green-50)'] : []" class="md:px-3 px-2 py-2 rounded">
                <svg
                  v-if="link.icon"
                  v-bind="link.icon"
                  class="hidden sm:inline-block text mr-2 mb-1 transition opacity-75 group-hover:opacity-100"
                  :class="isActive ? 'opacity-100' : 'opacity-75'"
                />
                {{ link.title }}
              </div>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- Social icons & Color Mode -->
      <SocialIcons class="hidden sm:flex" />
    </div>
  </div>
</header>
</template>

<style>
header {
  border-style: none;
  backdrop-filter: blur(2px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
}
</style>
