<script lang="ts" setup>
const config = useTheme()

const initials = config.value.site.name
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
      <div
        v-for="(val, key) in [{ class: ['from-primary-light/30 to-primary-darker/30 group-hover:translate-y-19px'] }, { class: ['from-primary-darker to-primary-light -translate-y-17px -translate-x-3px'] }]"
        :key="key"
        :class="val.class"
        class="font-normal transition-all transform -skew-x-10 text-3xl logo text-hidden-fill bg-clip-text bg-gradient-to-l"
      >
        {{ initials }}
      </div>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.group:hover {
  filter: drop-shadow(0 0 35px var(--colors-primary-dark));
  .logo:nth-of-type(2) {
    filter: drop-shadow(0 0 10px var(--colors-primary-light));
  }
}
</style>
