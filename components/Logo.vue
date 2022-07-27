<script lang="ts" setup>
const config = useTheme()

const initials = 'Harlan Wilton'
  .split(' ')
  .map(word => word[0].toLowerCase())
  .join('')
</script>

<template>
  <nuxt-link to="/" class="flex items-center group unstyled py-4" title="Go Home">
    <NuxtImg
      :src="config.site.logo"
      width="80"
      height="80"
      format="jpeg"
      :alt="config.site.name"
      provider="cloudinary"
      style="width: 40px; height: 40px;"
      class="rounded-lg h-10 w-10 mr-3 group-hover:(h-11 w-11) transition-all"
    />
    <div aria-label="Harlan Wilton Initials" class="hidden sm:block text-gray-700 dark:text-gray-200 relative transform top-2 group-hover:top-0">
      <span class="block text-primary-darkest font-bold text-3xl logo">{{ initials }}</span>
      <span class="block text-primary-darkest font-bold text-3xl logo">{{ initials }}</span>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.group:hover {
  filter: drop-shadow(0 0 35px var(--colors-primary-dark));
  .logo {
    background: linear-gradient(90deg, var(--colors-primary-dark), var(--colors-primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateX(0px) translateY(18px) skewX(-10deg);
  }
  .logo:nth-of-type(2) {
    filter: drop-shadow(0 0 10px var(--colors-primary-light));
    transform: translateX(0) translateY(-18px) skewX(-10deg);
  }
}
.logo {
  transform: skewX(-10deg);
  font-weight: 400;
  transition: 0.2s;
  background: linear-gradient(90deg, rgba(var(--colors-primary-dark), 0.3), rgba(var(--colors-primary-light), 0.3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logo:nth-of-type(2) {
  background: linear-gradient(90deg, var(--colors-primary-light), var(--colors-primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateX(-3px) translateY(-17px) skewX(-10deg);
}
</style>
