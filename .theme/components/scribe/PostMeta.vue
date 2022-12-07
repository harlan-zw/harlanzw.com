<script lang="ts" setup>
import type { Post } from '../../types'
import {dayNth} from "../../logic";
import {useSeoMeta} from "@vueuse/head";

const { post } = defineProps<{
  post: Post
}>()

console.log(post)

const formatPublishedDate = (options: any) => new Intl.DateTimeFormat('en', options).format(new Date(post.publishedAt))
const year = formatPublishedDate({ year: 'numeric' })
const month = formatPublishedDate({ month: 'short' })
const day = dayNth(formatPublishedDate({ day: 'numeric' }))


useSeoMeta({
  twitterLabel1: 'Written on',
  twitterData1: `${month} ${day}, ${year}`,
  twitterLabel2: 'Reading time',
  twitterData2: `${post.readingMins} mins`,
})
</script>
<template>
  <div class="post-meta">
    <div>
      Published {{ month }} {{ day }} {{ year }}
    </div>
    <div class="opacity-50 text-xs hidden sm:block">
      ●
    </div>
    <div>
      {{ post.readingMins }} minute read
    </div>
  </div>
</template>
<style scoped lang="ts">
/* sm:(flex space-x-7 mb-10 text-lg space-y-0) opacity-80 space-y-3 items-center*/
css({
 '.post-meta': {
  display: 'block',
  'opacity': '0.8',
  '@sm': {
    display: 'flex',
    fontSize: '{fontSize.lg}',
    marginBottom: '{space.3}',
  },
}
})
</style>
