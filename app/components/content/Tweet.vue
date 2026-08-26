<script setup lang="ts">
import type { TweetResult } from '#shared/types'

const { id: rawId } = defineProps<{ id: string }>()
/**
 * comark-content's renderer coerces any bare attribute value that looks like
 * a JSON number through `JSON.parse`, regardless of how it was quoted in the
 * markdown source. Tweet snowflake IDs are 18-19 digits, well past
 * `Number.MAX_SAFE_INTEGER`, so that round-trip silently rounds the last few
 * digits and the id stops matching any real tweet. A real snowflake ID never
 * starts with `0`, so authors prefix the id with one in content (`id="0175…"`)
 * to dodge the numeric-looking regex and keep it a string; strip it back off here.
 */
const id = computed(() => rawId.replace(/^0/, ''))
const { data, error, status } = await useFetch<TweetResult>(() => `/api/get-tweet/${id.value}`)
const tweetUrl = computed(() => `https://x.com/i/status/${id.value}`)
const formattedDate = computed(() => data.value?._tag === 'Ok'
  ? new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium' }).format(new Date(data.value.tweet.createdAt))
  : '')
</script>

<template>
  <article class="not-prose mx-auto my-14 max-w-[550px] rounded-xl border border-default bg-elevated p-5 shadow-sm">
    <USkeleton v-if="status === 'pending'" class="h-44" />
    <div v-else-if="error || data?._tag === 'Err'" class="text-center">
      <UIcon name="i-lucide-message-circle-off" class="mb-3 size-8 text-muted" aria-hidden="true" />
      <p class="mb-3 text-sm text-muted">
        {{ data?._tag === 'Err' ? data.reason : 'This embedded post is temporarily unavailable.' }}
      </p>
      <UButton :to="tweetUrl" target="_blank" rel="noopener" variant="soft" size="sm">
        View on X
      </UButton>
    </div>
    <template v-else-if="data?._tag === 'Ok'">
      <header class="mb-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <img :src="data.tweet.user.avatarUrl" :alt="`${data.tweet.user.name}'s avatar`" class="size-11 rounded-full" width="44" height="44">
          <div>
            <p class="font-semibold leading-5 text-highlighted">
              {{ data.tweet.user.name }}
            </p>
            <p class="text-sm text-muted">
              @{{ data.tweet.user.screenName }}
            </p>
          </div>
        </div>
        <UButton :to="tweetUrl" target="_blank" rel="noopener" icon="i-simple-icons-x" color="neutral" variant="ghost" aria-label="View post on X" />
      </header>
      <p class="whitespace-pre-line text-base leading-7 sm:text-lg">
        {{ data.tweet.text }}
      </p>
      <footer class="mt-5 flex items-center justify-between border-t border-default pt-4 text-sm text-muted">
        <time :datetime="data.tweet.createdAt">{{ formattedDate }}</time>
        <span class="flex gap-4">
          <span class="inline-flex items-center gap-1"><UIcon name="i-lucide-heart" aria-hidden="true" /> {{ data.tweet.favoriteCount }}</span>
          <span class="inline-flex items-center gap-1"><UIcon name="i-lucide-message-circle" aria-hidden="true" /> {{ data.tweet.replyCount }}</span>
        </span>
      </footer>
    </template>
  </article>
</template>
