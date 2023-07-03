<script setup lang="ts">
import { computed } from 'vue'

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  path: String,
  title: {
    type: String,
    default: 'Og Image Template',
  },
  description: {
    type: String,
    default: 'Set a description to change me.',
  },
  background: {
    type: String,
    default: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
  },
  color: {
    type: String,
  },
  padding: {
    type: String,
    default: '0 50px',
  },
  titleFontSize: {
    type: String,
    default: '50px',
  },
  descriptionFontSize: {
    type: String,
    default: '35px',
  },
  icon: {
    type: [String, Boolean],
    default: 'logos:nuxt',
  },
  image: {
    type: String,
    required: false,
  },
  siteName: {
    type: String,
    required: false,
  },
  siteLogo: {
    type: String,
    required: false,
  },
  totalStars: {
    type: Number,
    required: false,
  },
})

const backgroundAttrs = computed(() => {
  // we want to make a
  // const isBackgroundTw = props.background?.startsWith('bg-')
  return {
    style: {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(5, 5, 5,1)',
    },
  }
})

const backgroundFlareAttrs = computed(() => {
  // we want to make a
  // const isBackgroundTw = props.background?.startsWith('bg-')
  return {
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
})

const backgroundFlareTwoAttrs = computed(() => {
  // we want to make a
  // const isBackgroundTw = props.background?.startsWith('bg-')
  return {
    style: {
      display: 'flex',
      position: 'absolute',
      left: '-5%',
      width: '150%',
      height: '150%',
      backgroundImage: 'radial-gradient(circle, rgba(0,123,220, 1) 0%,  rgba(5, 5, 5, 0.3) 50%, rgba(5, 5, 5,0) 70%)',
    },
  }
})

const titleAttrs = computed(() => {
  const classes = []
  const styles = {
    fontWeight: 'bold',
    marginBottom: '50px',
    lineHeight: '70px',
    fontSize: props.titleFontSize,
  }
  return { class: classes, style: styles }
})

const descriptionAttrs = computed(() => {
  const styles = {
    fontSize: '30px',
    lineHeight: '45px',
  }
  return { style: styles }
})

const siteConfig = useSiteConfig()
const siteName = computed(() => {
  return props.siteName || siteConfig.name
})
const siteLogo = computed(() => {
  return props.siteLogo || siteConfig.logo || 'https://nuxt.com/assets/design-kit/logo/full-logo-green-light.png'
})
</script>

<template>
<div v-bind="backgroundAttrs" />
<div v-bind="backgroundFlareAttrs" />
<div v-bind="backgroundFlareTwoAttrs" />
<div class="w-full flex flex-row z-10">
  <div class="w-1/2" style="padding: 50px;">
    <div class="flex flex-col h-full justify-between text-gray-100">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col">
          <div v-bind="titleAttrs">
            {{ title || 'Null Title' }}
          </div>
          <div v-bind="descriptionAttrs">
            {{ description }}
          </div>
        </div>
      </div>
      <div class="text-white w-full flex flex-row">
        <img v-if="siteLogo" :src="siteLogo" height="50" class="rounded mr-5">
        <div style="font-size: 30px;" class="font-bold mt-2">
          {{ siteName }}
        </div>
      </div>
    </div>
  </div>
  <div class="w-1/2 items-center justify-center text-white">
    <div :style="{ fontSize: '80px' }" class="flex flex-col justify-center items-center">
      <div class="mb-10">⭐</div>
      <div>{{ totalStars }} Stars</div>
    </div>
  </div>
</div>
</template>
