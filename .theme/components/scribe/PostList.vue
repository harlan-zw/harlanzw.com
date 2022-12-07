<script lang="ts" setup>
// define props
export interface UsePostsOptions {
  limit?: number
  offset?: number | string
  category?: string
  sort?: string
}

const props = withDefaults(defineProps<UsePostsOptions>(), {
  limit: 10,
  offset: 0,
  category: '',
})
const { data: posts } = await usePosts(props)
const yearKeys = Object.keys(posts.value).reverse()
</script>

<template>
  <div class="post-list">
    <div v-for="year in yearKeys" :key="year" class="post-list__year-wrap">
      <SubTitle>
        {{ year }}
      </SubTitle>
      <div class="post-list__post-wrap">
        <PostCard v-for="(post, key) in posts[year]" :key="key" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
'.post-list': {
textAlign: 'left',
position: 'relative',
maxWidth: '65ch',
'&__year-wrap': {
                marginBottom: '{space.10}',
              },
'&__post-wrap': {

              },
'&__post-wrap > *:not(:last-child)': {
                                     marginBottom: '{space.10}',
                                   },
},
})
</style>
