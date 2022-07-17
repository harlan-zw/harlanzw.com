<script lang="ts" setup>
const { data: postGroups } = await usePostList()
const yearKeys = Object.keys(unref(postGroups)).reverse()
</script>

<template>
  <div>
    <div class="space-y-10">
      <div v-for="year in yearKeys" :key="year">
        <SubTitle>
          {{ year }}
        </SubTitle>
        <div class="space-y-5">
          <PostCard v-for="post in postGroups[year]" :key="post._id" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>
