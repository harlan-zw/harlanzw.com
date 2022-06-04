<template>
<div class="card-post md:-mx-8 my-8 hover:shadow-lg transition-all">
  <div class="card-post__effect"></div>
  <a class="card-post__link unstyled" :href="post.url" :target="post.link ? '_blank' : 'initial'"></a>
  <div class="card-post__content">
      <div class="md:p-8 p-4 prose md:prose-xl">
        <h3 style="margin-top: 0 !important;">
          <a :href="post.url" :target="post.link ? '_blank' : 'initial'" style="font-weight: bold;" class="md:text-2xl flex items-center">
            <span v-if="post.link">
              <svg class="inline-flex mr-2" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -256 1850 1850"><path d="M1438.373 818.95v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19q-26 0-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45q19-19 45-19h512q26 0 45 19t19 45z" fill="currentColor"/></svg>
            </span>
            <span>{{ post.title }}</span>
          </a>
        </h3>

        <div class="text-xs text-gray-600">
          <time class="mr-2">{{ post.publishDate }}</time><span v-if="post.readMins">- {{ post.readMins }}min</span>
        </div>

        <p class="text-sm text-gray-600">{{ post.excerpt }}</p>

        <PostTags :post="post" />
      </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Post } from '../../types'
import PostTags from './PostTags.vue'

export default defineComponent({
  components: {
    PostTags
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
.card-post {

  position: relative;

  .prose {
    max-width: 100% !important;
  }

  &__link {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: ' ';
    z-index: 1;
  }

  &__content {
    background-color: white;
    z-index: 1;
  }

  &__effect {
    z-index: -1;
    content: ' ';
    height: 30px;
    width: 100%;
    position: absolute;
    background-color: rgb(5, 150, 105);
    transition: 0.2s;
    opacity: 0;
    top: 30px;
  }

  &:hover {
    .card-post__effect {
      top: -5px;
      opacity: 1;
      transform: rotate(0.25deg);
    }
  }
}
</style>
