<template>
  <div class="md:(space-x-5) space-x-3 text-gray-500 flex items-center">
    <a target="_blank" href="https://twitter.com/harlan_zw" title="Follow me on Twitter" class="group">
      <i-line-md-twitter class="icon icon--off" />
      <i-line-md-twitter-twotone class="icon icon--on" />
    </a>
    <a target="_blank" href="https://github.com/harlan-zw" title="Follow me on GitHub" class="group">
      <i-line-md-github class="icon icon--off" />
      <i-line-md-github-loop class="icon icon--on" />
    </a>
    <a target="_blank" href="https://discord.com/invite/5jDAMswWwX" title="Join the Discord Server" class="group">
      <i-line-md-discord class="icon icon--off" />
      <i-line-md-discord-twotone class="icon icon--on" />
    </a>
    <ColorModeSwitch />
  </div>
</template>

<style lang="scss" scoped>
a {
  @apply hover:text-gray-700 dark:hover:text-gray-300;
}
</style>
