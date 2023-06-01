<script lang="ts" setup>
import { TransitionPresets } from '@vueuse/core'
import type { Post } from '~/types'
import { dayNth } from '~/logic'
import { resolveComponent, useElementHover, useTransition } from '#imports'

const props = defineProps<{ post: Post }>()

const formatPublishedDate = (options: any) => new Intl.DateTimeFormat('en', options).format(new Date(props.post.publishedAt))

const month = formatPublishedDate({ month: 'short' })
const day = dayNth(formatPublishedDate({ day: 'numeric' }))

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
})

const isHidden = computed(() => {
  return props.post.status === 'unlisted'
})

const isSponsorsOnly = computed(() => {
  return props.post.status === 'sponsors-only'
})

const component = computed(() => {
  if (isSponsorsOnly.value)
    return 'div'
  return resolveComponent('NuxtLink')
})

const componentAttrs = computed(() => {
  return {
    ...isSponsorsOnly.value && {
      class: 'relative inline-block transition-all',
    },
    ...!isSponsorsOnly.value && {
      to: props.post._path,
    },
  }
})

const daysSincePublish = computed(() => {
  const publishedAt = new Date(props.post.publishOn)
  const now = new Date()
  const diff = now.getTime() - publishedAt.getTime()
  return Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)))
})
</script>

<template>
  <div class="w-full relative group">
    <TagList v-if="post.tags" :tags="post.tags" small class="absolute right-0 filter grayscale group-hover:grayscale-0 transition-all" />
    <component :is="component" v-if="!isHidden" ref="card" v-bind="componentAttrs" class="block max-w-full transition-all ">
      <div v-if="isSponsorsOnly" class="group-hover:flex hidden left-30 w-120 -top-5 page-enter-active absolute rounded-lg px-5 py-3 text-white items-center bg-gray-900/90 z-10">
        <Icon name="material-symbols:lock-outline" class="!w-8 !h-8" />
        <div class="ml-3">
          <p class="mb-1 font-bold">
            Super secret content
          </p>
          <p class="text-sm mb-1 opacity-80">
            This post is only available to my <a href="https://github.com/sponsors/harlan-zw" target="_blank">GitHub Sponsor community</a>.
          </p>
          <p class="text-xs  opacity-50">
            It will be made public in {{ daysSincePublish }} days.
          </p>
        </div>
      </div>
      <div class="flex items-center" :class="[isSponsorsOnly ? 'opacity-50 cursor-not-allowed ' : '']">
        <div class="opacity-70 group-hover:(opacity-90) transition-all absolute top-3 -left-20">
          <div class="">
            {{ month }}
          </div>
          <div class="text-sm">
            {{ day }}
          </div>
        </div>
        <div class="max-w-full">
          <h3 class="opacity-90 text-xl mb-3 group-hover:(sm:-mx-3 tracking-wide text-green-700 font-bold) transition-all">
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
    </component>
  </div>
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
