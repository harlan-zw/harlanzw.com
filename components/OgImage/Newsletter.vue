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
    default: '20px',
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
  readingMins: {
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
            <span
              :style="{
                fontWeight: 'bold',
                lineHeight: '50px',
                fontSize: '40px',
                marginBottom: '15px',
              }"
            >
              {{ title || 'Null Title' }}
            </span>
            <span class="text-2xl">
              {{ readingMins }} min read
            </span>
          </div>
        </div>
        <div class="flex flex-row">
          <ScoreCard label="GitHub stars" :before="6112" :after="6295" class="mr-2 bg-gray-900 text-white border-gray-600" />
          <ScoreCard label="Hours Worked" suffix=" hrs" :before="87" :after="195" class="mr-2 bg-gray-900 text-white border-gray-600" />
          <ScoreCard label="MRR" currency :before="867" :after="966" class="mr-2 bg-gray-900 text-white border-gray-600" />
        </div>
        <div class="text-white w-full flex flex-row">
          <img v-if="siteLogo" :src="siteLogo" height="50" class="rounded mr-5">
          <div style="font-size: 30px;" class="font-bold mt-2">
            {{ siteName }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 items-end justify-center">
      <img v-if="image" :src="`https://res.cloudinary.com/dl6o1xpyq/image/upload/f_auto,q_auto:best,dpr_auto/images/${image}`" height="630" width="630" style="object-fit: cover;" class="rounded-xl max-w-full">
    </div>
  </div>
</template>
