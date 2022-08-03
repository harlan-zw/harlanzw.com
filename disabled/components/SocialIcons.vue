<template>
  <div>
    <NuxtLink target="_blank" href="https://twitter.com/harlan_zw" title="Visit my Twitter" class="group">
      <i-line-md-twitter class="icon icon--off" alt="Twitter Logo" />
      <i-line-md-twitter-twotone class="icon icon--on" alt="Twitter Logo" />
    </NuxtLink>
    <NuxtLink target="_blank" href="https://github.com/harlan-zw" title="Visit my GitHub" class="group">
      <i-line-md-github class="icon icon--off" alt="Github Logo" />
      <i-line-md-github-loop class="icon icon--on" alt="Github Logo" />
    </NuxtLink>
    <NuxtLink target="_blank" href="https://discord.com/invite/5jDAMswWwX" title="Visit my Discord" class="group">
      <i-line-md-discord class="icon icon--off" alt="Discord Logo" />
      <i-line-md-discord-twotone class="icon icon--on" alt="Discord Logo" />
    </NuxtLink>
  </div>
</template>

<style scoped>
a {
  @apply hover:text-gray-700 dark:hover:text-gray-300 p-2;
}
</style>
