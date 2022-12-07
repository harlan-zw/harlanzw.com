<script lang="ts" setup>
const { data: categories } = await useProjects()

// compute the total amount of stars from projects
const totalStars = computed(() => {
  return categories.value?.body
    // @ts-expect-error untyped
    .map(c => c.projects).flat().map(p => p.stars)
    // @ts-expect-error untyped
    .reduce((acc, stars) => acc + stars, 0)
})
</script>

<template>
<div class="space-y-10">
  <div class="font-bold opacity-90"><i-carbon-star-filled class="inline text-yellow-400 mr-1 mb-2px" /> {{ totalStars }} stars and counting</div>
  <div v-for="(category, cKey) in categories.body" :key="cKey">
    <SubTitle>{{ category.name }}</SubTitle>
    <div class="grid md:grid-cols-3 gap-5">
      <ProjectCard v-for="(project, pKey) in category.projects" :key="pKey" :project="project" />
    </div>
  </div>
</div>
</template>
