<template>
<div class="article-card md:-mx-8 mb-8 hover:shadow-lg transition-all text-lg">
  <div class="article-card__effect"></div>
  <div class="bg-white rounded-lg md:p-8 p-4">
    <h3 class="opacity-80 text-2xl mb-2">
      <nuxt-link :to="article._path">
        <svg v-if="article.link" class="inline-flex mr-2" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -256 1850 1850"><path d="M1438.373 818.95v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19q-26 0-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45q19-19 45-19h512q26 0 45 19t19 45z" fill="currentColor"/></svg>
        <span>{{ article.title }}</span>
      </nuxt-link>
    </h3>

    <div v-if="article.publishDate" class="text-sm opacity-85 mb-3">
      <time class="mr-1">{{ article.publishDate }}</time>
    </div>

    <p class="text-lg text-gray-600 mb-5 opacity-80">{{ article.description }}</p>

    <div class="mb-10">
      <ArticleTags v-if="article.tags" :tags="article.tags" />
    </div>

    <div class="flex justify-between items-center " >
      <nuxt-link class="text-green-600 hover:underline" :to="article._path.replace('/feed/', '')">Read</nuxt-link>
      <span v-if="article.readMins" class="text-lg opacity-50">{{ article.readMins }} minute read</span>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {ArticleCard} from "~/logic";

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<ArticleCard>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
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
