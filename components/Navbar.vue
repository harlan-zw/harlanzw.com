<template>
<div class="header">
  <div class="flex justify-between items-center max-w-8xl mx-auto py-4 mx-auto sm:px-8">
    <!-- Logo -->
    <nuxt-link to="/" class="flex items-center group unstyled">
      <img src="https://avatars.githubusercontent.com/u/5326365?v=4" class="rounded-lg h-10 w-10 mr-5 group-hover:(h-11 w-11) transition-all" />
      <div class="text-gray-700 dark:text-gray-200 relative transform top-2 group-hover:top-0">
        <span class="block text-green-700 font-bold text-3xl logo">hw</span>
        <span class="block text-green-700 font-bold text-3xl logo">hw</span>
      </div>
    </nuxt-link>
    <div class="flex items-center">
      <!-- Navigation -->
      <nav class="space-x-7 mr-15 opacity-75">
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/sponsors">Sponsors</NuxtLink>
      </nav>
      <NuxtLink href="/sydney-nuxt-freelance-developer" class="mr-15 h-7 dark:(text-blue-200 from-blue-700 to-sky-900  bg-gradient-to-b) border-2 font-semibold text-xs border-blue-600/70 text-blue-600/70 hover:(bg-sky-700 text-white) transition-all text-sm px-2 py-1 rounded-lg">
        Need Nuxt Help? Hire me
      </NuxtLink>
      <!-- Social icons & Color Mode -->
      <div class="space-x-5 text-gray-500 transition flex items-center">
        <a target="_blank" href="https://twitter.com/harlan_zw" title="Twitter" class="hover:text-gray-700 dark:hover:text-gray-300">
          <i-line-md-twitter class="w-8 h-8" />
        </a>
        <a target="_blank" href="https://github.com/harlan-zw" title="GitHub" class="hover:text-gray-700 dark:hover:text-gray-300 group">
          <i-line-md-github class="w-8 h-8 group-hover:hidden inline-block" />
          <i-line-md-github-loop class="w-8 h-8 hidden group-hover:inline-block" />
        </a>
        <a target="_blank" href="https://discord.com/invite/5jDAMswWwX" title="GitHub" class="hover:text-gray-700 dark:hover:text-gray-300 group">
          <i-line-md-discord class="w-8 h-8" />
        </a>
        <ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss">
.header {
  border-style: none;
  backdrop-filter: blur(2px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
}
.group:hover {
  .logo {
    background: linear-gradient(90deg, #11998e, #38ef7d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateX(0px) translateY(0px) skewX(0deg);
    letter-spacing: 5px;
  }
  .logo:nth-of-type(2) {
    transform: translateX(0px) translateY(0px) skewX(0deg);
  }
}
.logo {
  transform: skewX(-10deg);
  font-weight: 400;
  transition: 0.2s;
  background: linear-gradient(90deg, rgba(#11998e, 0.3), rgba(#38ef7d, 0.3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logo:nth-of-type(2) {
  background: linear-gradient(90deg, #38ef7d, #11998e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateX(-3px) translateY(-17px) skewX(-10deg);
}
</style>
