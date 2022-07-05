<template>
  <div class="flex justify-between w-5xl px-4 py-4 mx-auto sm:px-8">
    <!-- Navigation -->
    <nuxt-link to="/" class="text-gray-700 dark:text-gray-200 relative">
      <svg class="opacity-20 w-100px h-100px" viewBox="0 0 200 200" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgb(5, 150, 105)" d="M50.4,-15.8C59.3,10.9,56.2,42.1,36,58.9C15.9,75.8,-21.4,78.3,-41.8,62.4C-62.2,46.4,-65.8,11.9,-56,-16C-46.2,-43.9,-23.1,-65.4,-1.2,-65C20.8,-64.6,41.5,-42.4,50.4,-15.8Z" transform="translate(100 100)" />
      </svg>
      <span class="absolute bottom-5 left-7 block text-green-700 font-bold text-3xl">harlanzw</span>
    </nuxt-link>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 text-gray-500 transition flex items-center">
      <a href="https://twitter.com/Atinux" title="Twitter" class="hover:text-gray-700 dark:hover:text-gray-300"><i-line-md-twitter class="w-8 h-8" /></a>
      <a href="https://github.com/Atinux/content-wind" title="GitHub" class="hover:text-gray-700 dark:hover:text-gray-300 group">
        <i-line-md-github class="w-8 h-8 group-hover:hidden inline-block" />
        <i-line-md-github-loop class="w-8 h-8 hidden group-hover:inline-block" />
      </a>
      <ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
    </div>
  </div>
</template>
