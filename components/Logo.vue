<template>
  <nuxt-link to="/" class="flex items-center group unstyled sm:py-4 py-1">
    <NuxtImg src="/harlan-wilton.jpeg" width="44" height="44" alt="Harlan Wilton" class="rounded-lg h-10 w-10 mr-3 group-hover:(h-11 w-11) transition-all" />
    <div class="text-gray-700 dark:text-gray-200 relative transform top-2 group-hover:top-0">
      <span class="block text-green-700 font-bold text-3xl logo">hw</span>
      <span class="block text-green-700 font-bold text-3xl logo">hw</span>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.group:hover {
  .logo {
    background: linear-gradient(90deg, #11998e, #38ef7d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateX(0px) translateY(0px) skewX(-10deg);
    letter-spacing: 5px;
  }
  .logo:nth-of-type(2) {
    transform: translateX(0px) translateY(0px) skewX(-10deg);
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
