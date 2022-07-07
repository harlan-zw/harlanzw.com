<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Post } from '~/logic'

const props = defineProps({
  article: Object as PropType<Post>,
})

const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(props.article.publishedDate)
const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(props.article.publishedDate)
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(props.article.publishedDate)
</script>

<template>
<nuxt-link :to="article._path" class="unstyled block transition-all group">
  <div class="flex items-center">
    <div class="mr-10 opacity-70 group-hover:(opacity-100) transition-all">
      <div class="text-xs">
        {{ day }}
      </div>
      <div>{{ month }}</div>
      <div class="text-xs opacity-50">
        {{ year }}
      </div>
    </div>
    <div class="max-w-full">
      <h3 class="opacity-90 text-2xl mb-3 group-hover:(-mx-3 tracking-wide text-green-700 font-bold) transition-all">
        <svg v-if="article.link" class="inline-flex mr-2" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -256 1850 1850"><path d="M1438.373 818.95v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19q-26 0-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45q19-19 45-19h512q26 0 45 19t19 45z" fill="currentColor" /></svg>
        <span>{{ article.title }}</span>
      </h3>
      <div class="text-sm overflow-hidden whitespace-nowrap text-ellipsis mb-3">
        <span v-if="article.readMins" class="opacity-80">{{ article.readMins }} min</span>
        <span class="px-2 opacity-50">·</span>
        <!--          <ArticleTags v-if="article.tags" :tags="article.tags" /> -->
        <span class="text-xs opacity-60">{{ article.description }}</span>
      </div>
    </div>
  </div>
  <div class="border-2 w-full group-hover:(border-green-500) border-green-500/5 transition-all mt-5" />
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
.article-card {

  position: relative;

  .prose {
    max-width: 100% !important;
  }

  &__effect {
    z-index: -1;
    content: ' ';
    height: 30px;
    width: 672px;
    position: absolute;
    background-size: 800px;
    border-radius: 8px;
    background-image: linear-gradient(0deg, rgb(5, 150, 105), rgb(5, 200, 150) );
    transition: 1s;
    opacity: 0;
    top: 0
  }

  &:hover {
    transform: translateY(-3px);
    .article-card__effect {
      top: -5px;
      opacity: 1;
      animation: effect  3s;
      animation-fill-mode: both;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes effect {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0.35deg);
  }
  100% {
    transform: rotate(-0.35deg);
    background-position: 672px;
  }
}
</style>
