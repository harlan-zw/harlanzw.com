<script lang="ts" setup>
import type { PropType } from 'vue'
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
</script>

<template>
  <div>
    <SchemaOrgArticle
      v-bind="{ schema }"
    />
    <Breadcrumbs class="mb-2" />
    <h1 class="!text-3xl font-header font-bold !leading-11 !md:(text-5xl leading-16) mb-7">
      {{ post.title }}
    </h1>
    <div class="sm:(flex space-x-7 mb-10 text-lg) space-y-3 items-center">
      <div class="opacity-80">
        Published {{ month }} {{ day }} {{ year }}
      </div>
      <div class="opacity-50 text-xs hidden sm:block">
        ●
      </div>
      <div class="opacity-80 mb-5 sm:mb-0">
        {{ post.readingMins }} minute read
      </div>
      <div class="opacity-50 text-xs hidden sm:block">
        ●
      </div>
      <TagList :tags="post.tags" />
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
