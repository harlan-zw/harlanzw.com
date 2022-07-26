<script lang="ts" setup>
import type { PropType } from 'vue'
import { TransitionPresets } from '@vueuse/core'
import type { Post } from '~/types'
import { dayNth } from '~/logic'
import { useElementHover, useTransition } from '#imports'

const props = defineProps({
  post: Object as PropType<Post>,
})

const formatPublishedDate = (options: any) => new Intl.DateTimeFormat('en', options).format(new Date(props.post.publishedAt))

const month = formatPublishedDate({ month: 'short' })
const day = dayNth(formatPublishedDate({ day: 'numeric' }))

const card = ref()
const cardHovered = useElementHover(card)

const marqueeEl = ref()

const marqueePosition = ref(0)
const marqueeDelay = ref(0)
const marqueeDuration = ref(0)

const marqueTransition = useTransition(marqueePosition, {
  duration: marqueeDuration,
  delay: marqueeDelay,
  transition: TransitionPresets.easeInOut,
})

const startMarquee = () => {
  const $marquee: HTMLElement = marqueeEl.value
  const $child = $marquee.children[0] as HTMLElement
  const offset = $child.offsetWidth - marqueeEl.value.offsetWidth
  if (offset === 0 || marqueeDuration.value === 1000)
    return
  // set the duration based on the width we need to traverse
  const initialDuration = offset * 20
  // wait a bit before starting to give the user a chance to realise what's happening
  const initialDelay = 350
  // reset variables
  marqueeDuration.value = initialDuration
  marqueeDelay.value = initialDelay
  marqueePosition.value = offset

  watch(marqueTransition, (v) => {
    $child.style.transform = `translateX(-${v}px)`
    if (v === offset) {
      // wait before going back, go back quickly
      marqueeDelay.value = 2500
      marqueeDuration.value = 1000
      marqueePosition.value = 0
    }
    else if (cardHovered.value && v === 0) {
      marqueeDuration.value = initialDuration
      marqueePosition.value = offset
      marqueeDelay.value = initialDelay
    }
    else {
      marqueeDuration.value = initialDuration
      marqueeDelay.value = initialDelay
    }
  })
}

watch(cardHovered, (v) => {
  if (v)
    startMarquee()
})
</script>

<template>
  <nuxt-link ref="card" :to="post.path" class="block max-w-full transition-all group">
    <div class="flex items-center">
      <div class="opacity-70 group-hover:(opacity-90) transition-all absolute top-3 -left-20">
        <div class="text-lg">
          {{ month }}
        </div>
        <div class="text-sm">
          {{ day }}
        </div>
      </div>
      <div class="max-w-full">
        <h3 class="opacity-90 text-2xl mb-3 group-hover:(sm:-mx-3 tracking-wide text-green-700 font-bold) transition-all">
          <span>{{ post.title }}</span>
        </h3>
        <div class="text-sm wrap overflow-hidden whitespace-nowrap mb-3 flex items-center">
          <span v-if="post.readingMins" class="opacity-70">{{ post.readingMins }} min</span>
          <span class="px-2 opacity-50 hidden sm:inline-block">·</span>
          <div ref="marqueeEl" class="hidden sm:inline-flex overflow-hidden items-center">
            <div class="opacity-60">
              {{ post.description }}
            </div>
          </div>
        </div>
        <div class="opacity-60 text-sm sm:hidden">
          {{ post.description }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.group:hover {
  h3 {
    background: linear-gradient(45deg, rgba(#11998e, 1), rgba(#38ef7d, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
