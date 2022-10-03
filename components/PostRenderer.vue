<script lang="ts" setup>
import type { PropType } from 'vue'
import { useMetaTags } from '#head'
import { dayNth } from '~/logic'
import type { Post } from '~/types'

const props = defineProps({
  post: Object as PropType<Post>,
})

const formatPublishedDate = (options: any) => new Intl.DateTimeFormat('en', options).format(new Date(props.post.publishedAt))
const year = formatPublishedDate({ year: 'numeric' })
const month = formatPublishedDate({ month: 'short' })
const day = dayNth(formatPublishedDate({ day: 'numeric' }))

const schema = computed(() => props.post.schema || {})

useMetaTags({
  twitterLabel1: 'Written on',
  twitterData1: `${month} ${day}, ${year}`,
  twitterLabel2: 'Reading time',
  twitterData2: `${props.post.readingMins} mins`,
})
</script>

<template>
  <div>
    <SchemaOrgArticle
      v-bind="{ ...schema }"
    />
    <Breadcrumbs class="mb-2" />
    <h1 class="!text-3xl font-header font-bold !leading-11 !md:(text-4xl leading-14) mb-7">
      {{ post.title }}
    </h1>
    <TagList :tags="post.tags" class="mb-5" />
    <div class="sm:(flex space-x-7 mb-10 text-lg space-y-0) opacity-80 space-y-3 items-center">
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
    <Prose>
      <ContentRenderer :value="post" class="max-w-none">
        <template #not-found>
          <h1 class="text-2xl">
            Page not found
          </h1>
        </template>
      </ContentRenderer>
    </Prose>
  </div>
</template>
