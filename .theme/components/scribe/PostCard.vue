<script lang="ts" setup>
import { TransitionPresets } from '@vueuse/core'
import type { Post } from '../../types'
import { useElementHover, useTransition } from '#imports'
import { dayNth } from '../../logic'

const props = defineProps<{ post: Post }>()

const formatPublishedDate = (options: any) => new Intl.DateTimeFormat('en', options).format(new Date())

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
</script>

<template>
  <NuxtLink ref="card" :to="post._path" class="post-card">
    <div class="post-card__date">
      <div class="post-card__date-month">
        {{ month }}
      </div>
      <div class="post-card__date-day">
        {{ day }}
      </div>
    </div>
    <div class="post-card__content">
      <NuxtImg v-if="post.image" :src="post.image" class="rounded-full h-128px w-128px mr-5 object-cover" />
      <div>
        <h2 class="post-card__title">
          <span>{{ post.title }}</span>
        </h2>
        <div class="post-card__marquee">
          <span v-if="post.readingMins" class="post-card__reading-min">{{ post.readingMins }} min</span>
          <span class="post-card__separator">·</span>
          <div ref="marqueeEl" class="post-card__desc">
            <div class="opacity-60">
              {{ post.description }}
            </div>
          </div>
        </div>
        <div class="post-card__desc--mobile">
          {{ post.description }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="ts">
css({
'.post-card': {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  maxWidth: '100%',
  transition: 'all .2s',
},
'.post-card__date': {
  opacity: '0.7',
  transition: 'all .2s',
  position: 'absolute',
  top: '{space.3}',
  left: '-5rem',
},
'.post-card__date-day': {
  fontSize: '{fontSize.sm}'
},
'.post-card__content': {
  display: 'flex',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '100%',
  alignItems: 'center',
  transition: 'all .2s',
},
'.post-card__title': {
  opacity: '0.9',
  marginBottom: '{space.3}',
  fontSize: '{fontSize.xl}',
  transition: 'all .2s',
},
'.post-card__marquee': {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  opacity: '0.7',
  fontWeight: 'bold',
  lineHeight: '1',
  letterSpacing: '0.05em',
  transition: 'all .2s',
},
'.post-card__desc': {
  display: 'none',
  alignItems: 'center',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  transition: 'all .2s',
  '@sm': {
    display: 'inline-block',
  },
  '&--mobile': {
    display: 'block',
    '@sm': {
      display: 'none',
    },
  },
},
'.post-card__reading-min': {
  opacity: '0.7',
},
'.post-card__separator': {
  opacity: '0.5',
  display: 'none',
  marginLeft: '{space.2}',
  marginRight: '{space.2}',
  '@sm': {
    display: 'inline-block',
  },
},
})
</style>
