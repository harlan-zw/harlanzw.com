<script lang="ts" setup>
const contentQuery = queryContent('pages')
</script>

<template>
  <div class="flex justify-between max-w-2xl px-4 py-4 mx-auto sm:px-8">
    <!-- Navigation -->
    <div class="text-gray-700 dark:text-gray-200">
      <ContentNavigation v-slot="{ navigation }" :query="contentQuery">
        <NuxtLink
          v-for="link of navigation[0].children"
          :key="link._path"
          :to="link._path.replace('pages', '')"
          active-class="font-bold"
          class="mr-4"
        >
          {{ link.navTitle || link.title }}
        </NuxtLink>
      </ContentNavigation>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 text-gray-500 transition">
      <a href="https://twitter.com/Atinux" title="Twitter" class="hover:text-gray-700 dark:hover:text-gray-300"><i-line-md-twitter class="w-8 h-8" /></a>
      <a href="https://github.com/Atinux/content-wind" title="GitHub" class="hover:text-gray-700 dark:hover:text-gray-300 group">
        <i-line-md-github class="w-8 h-8 group-hover:hidden inline-block" />
        <i-line-md-github-loop class="w-8 h-8 hidden group-hover:inline-block" />
      </a>
      <ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
    </div>
  </div>
</template>
