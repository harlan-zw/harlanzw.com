<script lang="ts" setup>
const { data: categories } = await useProjects()

// compute the total amount of stars from projects
const totalStars = computed(() => {
  return categories.value?.body
    // @ts-expect-error untyped
    .map(c => c.projects).flat().map(p => p.stars || 0)
    // @ts-expect-error untyped
    .reduce((acc, stars) => acc + stars, 0)
})
</script>

<template>
<div class="space-y-10 ">
  <div class="font-bold opacity-90"><i-carbon-star-filled class="inline text-yellow-400 mr-1 mb-2px" /> {{ totalStars }} stars and counting</div>
  <div v-for="(category, cKey) in categories.body" :key="cKey">
    <SubTitle>
      <IconNuxt v-if="category.name === 'Nuxt'" class="text-black dark:text-white w-7 h-7 mr-1 inline" />
      <icon v-else-if="category.icon" :name="category.icon" class="w-14 h-auto mr-2 group-hover:opacity-75 transition-all svg-container" />
      {{ category.name }}
    </SubTitle>
    <div class="grid md:grid-cols-2 gap-5">
      <ProjectCard v-for="(project, pKey) in category.projects" :key="pKey" :project="project" />
    </div>
  </div>
</div>
</template>
