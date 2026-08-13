<script lang="ts" setup>
import type { SitePage } from '#shared/types'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { getReadingMinutes } from '~/utils/content'

const { post } = defineProps<{ post: SitePage }>()
const readingMins = computed(() => getReadingMinutes(post.body))

const card = ref()

const marqueeEl = ref()

const marqueePosition = ref(0)
const marqueeDelay = ref(0)
const marqueeDuration = ref(0)

onMounted(() => {
  const cardHovered = useElementHover(card)

  const marqueTransition = useTransition(marqueePosition, {
    duration: marqueeDuration,
    delay: marqueeDelay,
    transition: TransitionPresets.easeInOutCubic,
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
})
</script>

<template>
  <div class="max-w-full relative group">
    <NuxtLink ref="card" :to="post.path" class="block max-w-full transition-all">
      <div class="flex items-center">
        <div class="max-w-full">
          <h3 class="mb-3 text-xl font-normal text-default transition-all sm:group-hover:-mx-3 group-hover:tracking-wide group-hover:text-primary">
            <span>{{ post.title }}</span>
          </h3>
          <div class="text-sm wrap overflow-hidden whitespace-nowrap mb-3 flex items-center">
            <span class="text-muted">{{ readingMins }} min</span>
            <span class="px-2 opacity-50 hidden sm:inline-block">·</span>
            <div ref="marqueeEl" class="hidden sm:inline-flex overflow-hidden items-center">
              <div class="text-muted">
                {{ post.description }}
              </div>
            </div>
          </div>
          <div class="text-sm text-muted sm:hidden">
            {{ post.description }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
