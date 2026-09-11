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
  <div class="post-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
    <time :datetime="post.publishedAt">
      {{ month }} {{ day }} {{ year }}
    </time>
    <span aria-hidden="true">·</span>
    <span>{{ readingMins }} minute read</span>
  </div>
</template>
