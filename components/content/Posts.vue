<template>
<div class="posts">
  <CardPost
      v-for="(post, key) in posts"
      :key="key"
      :post="post"
  />
</div>
</template>

<script>
import allPosts from '../../posts'
import { filter } from 'lodash'
import { useRoute } from 'vitepress/dist/client/app/router';

export default {
  setup () {
    const route = useRoute()
    const path = route.path.replace('/index.html', '/')
    const posts = filter(allPosts, p => p.url !== path && (p.status === 'published' || import.meta.env.MODE !== 'production'))
    return {
      posts
    }
  }
}
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
