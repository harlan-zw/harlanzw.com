<script lang="ts" setup>
import { fetchPosts } from '~/logic'

const { data: postGroups } = await fetchPosts()
const yearKeys = Object.keys(unref(postGroups)).reverse()
</script>

<template>
<div>
  <Title>
    Blog
  </Title>
  <div class="space-y-10">
    <div v-for="year in yearKeys" :key="year">
      <SubTitle>
        {{ year }}
      </SubTitle>
      <div class="space-y-5">
        <ArticleCardAlt v-for="article in postGroups[year]" :key="article._id" :article="article" />
      </div>
    </div>
  </div>
</div>
</template>
