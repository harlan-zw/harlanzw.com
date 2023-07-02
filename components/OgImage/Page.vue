<script setup lang="ts">
import { computed } from 'vue'

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

const backgroundAttrs = {
  style: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(5, 5, 5,1)',
  },
}

const backgroundFlareAttrs = {
  style: {
    display: 'flex',
    position: 'absolute',
    right: '-50%',
    top: '0%',
    width: '200%',
    height: '200%',
    backgroundImage: 'radial-gradient(circle, rgba(0,220,130, 0.2) 0%,  rgba(5, 5, 5, 0.5) 50%, rgba(5, 5, 5,0) 70%)',
  },
}

const backgroundFlareTwoAttrs = {
  style: {
    display: 'flex',
    position: 'absolute',
    left: '-5%',
    width: '150%',
    height: '150%',
    backgroundImage: 'radial-gradient(circle, rgba(0,123,220, 1) 0%,  rgba(5, 5, 5, 0.3) 50%, rgba(5, 5, 5,0) 70%)',
  },
}

const siteConfig = useSiteConfig()
const siteLogo = computed(() => {
  return siteConfig.logo || 'https://nuxt.com/assets/design-kit/logo/full-logo-green-light.png'
})
</script>

<template>
<div v-bind="backgroundAttrs" />
<div v-bind="backgroundFlareAttrs" />
<div v-bind="backgroundFlareTwoAttrs" />
<div class="w-full flex items-center justify-center h-full flex-row">
  <img v-if="siteLogo" :src="siteLogo" height="200" class="rounded mr-5">
</div>
</template>
