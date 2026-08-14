<script lang="ts" setup>
import type { SitePage } from '#shared/types'
import { dayNth } from '~/utils/date'

const { post, readingMins } = defineProps<{
  post: SitePage
  readingMins: number
}>()

const formatPublishedDate = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en', options).format(new Date(post.publishedAt ?? ''))
const year = formatPublishedDate({ year: 'numeric' })
const month = formatPublishedDate({ month: 'short' })
const day = dayNth(formatPublishedDate({ day: 'numeric' }))

useSeoMeta({
  twitterLabel1: 'Written on',
  twitterData1: `${month} ${day}, ${year}`,
  twitterLabel2: 'Reading time',
  twitterData2: `${readingMins} mins`,
})
</script>

<template>
  <div class="post-meta items-center space-y-3 opacity-80 sm:flex sm:space-y-0 sm:space-x-7 sm:text-lg">
    <div>
      Published {{ month }} {{ day }} {{ year }}
    </div>
    <div class="hidden text-sm opacity-50 sm:block">
      ●
    </div>
    <div>
      {{ readingMins }} minute read
    </div>
  </div>
</template>
