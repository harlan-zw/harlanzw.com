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
<nuxt-link :to="`/blog/${article._path.replace('/posts/', '')}`" class="block max-w-full transition-all group">
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
