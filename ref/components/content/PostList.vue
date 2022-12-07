<script lang="ts" setup>
const { data: postGroups } = await usePostList()
const yearKeys = Object.keys(unref(postGroups)).reverse()
</script>

<template>
  <div>
    <div class="space-y-7">
      <div v-for="year in yearKeys" :key="year">
        <SubTitle>
          {{ year }}
        </SubTitle>
        <div class="space-y-10">
          <PostCard v-for="(post, key) in postGroups[year]" :key="key" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>
