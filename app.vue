<script lang="ts" setup>
useHead({
  title: 'Harlan Wilton',
})
</script>
<template>
<Html lang="en" />
<Meta property="og:image" content="/cover.jpg" />
<Meta name="twitter:card" content="summary_large_image" />
<Link rel="icon" href="https://avatars.githubusercontent.com/u/5326365?v=4" sizes="any" type="image/jpeg" />
<div class="text-gray-700 dark:text-gray-200">
  <Navbar />
  <main class="max-w-3xl mx-auto px-8 py-7 pb-10 sm:pb-16 md:pb-20">
    <NuxtPage class="animate-enter" />
  </main>
  <footer class="px-5 sm:px-7 md:px-10 text-center text-gray-400 text-sm my-5">
    <div class="mb-3 space-x-5">
      <NuxtLink to="/credits" class="unstyled underline">Credits</NuxtLink>
      <NuxtLink to="/credits" class="unstyled underline">Clone this site</NuxtLink>
    </div>
    <p class="mb-3">
      © 2022-PRESENT Harlan Wilton. All rights reserved.
    </p>
  </footer>
</div>
</template>

<style lang="postcss">
body {
  min-height: 100vh;
  background-color: rgb(247,247,247);
  background-image: linear-gradient(0deg, #33e47f10, #ffffff);
  @apply dark:bg-gray-900;
}
html.dark body {
  background-image: none;
}
</style>
