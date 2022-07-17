<script lang="ts" setup>
const breadcrumbs = await useBreadcrumbs()

const visibleBreadcrumbs = computed(() => {
  const crumbs = []
  unref(breadcrumbs).forEach((c) => {
    crumbs.push(c)
  })
  crumbs.pop()
  return crumbs
})
</script>

<template>
  <div class="mb-3">
    <SchemaOrgBreadcrumb
      v-slot="{ itemListElement }"
      as="ul"
      class="flex space-x-4 text-sm opacity-50"
      :item-list-element="breadcrumbs"
    >
      <template v-for="(item, key) in itemListElement" :key="key">
        <li>
          <NuxtLink v-if="item.item" :to="item.item" class="inline">
            {{ item.name }}
          </NuxtLink>
        </li>
      </template>
    </SchemaOrgBreadcrumb>
  </div>
</template>
