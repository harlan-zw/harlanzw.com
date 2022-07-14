<script lang="ts" setup>
import { fetchProjects } from '~/logic'

const { data: categories } = await fetchProjects()
</script>
<template>
<div class="space-y-10">
  <div v-for="(category, cKey) in categories.body" :key="cKey">
    <SubTitle>{{ category.name }}</SubTitle>
    <div class="grid md:grid-cols-2 gap-5">
      <ProjectCard v-for="(project, pKey) in category.projects" :key="pKey" :project="project" />
    </div>
  </div>
</div>
</template>
