<script lang="ts" setup>
import { fetchProjects } from '~/logic'

const { data: categories } = await fetchProjects()
</script>
<template>
<div>
  <Title>Projects</Title>
  <div class="space-y-10">
    <div v-for="(category, key) in categories.body" :key="key">
      <SubTitle>{{ category.name }}</SubTitle>
      <div class="grid grid-cols-2 gap-5">
        <div v-for="(pkg, key) in category.packages" :key="key" class="">
          <a :href="pkg.link" target="_blank" class="!flex space-x-3 p-4 group rounded hover:bg-white dark:hover:bg-gray-800 transition-all">
            <div v-if="pkg.icon" class="opacity-30 pt-1 group-hover:opacity-75 transition-all" v-html="pkg.icon">
            </div>
            <div>
              <h2 class="opacity-85 mb-2 text-lg">
                {{ pkg.name }}
              </h2>
              <p class="text-xs opacity-75 h-12">{{ pkg.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
