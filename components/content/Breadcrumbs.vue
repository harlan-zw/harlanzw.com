<script lang="ts" setup>
const breadcrumbs = await useBreadcrumbs()
</script>

<template>
  <div>
    <SchemaOrgBreadcrumb
      v-slot="{ itemListElement }"
      as="ul"
      class="flex space-x-4 text-sm opacity-50 list-none"
      :item-list-element="breadcrumbs"
    >
      <template v-for="(item, key) in itemListElement" :key="key">
        <li v-if="item.item">
          <NuxtLink :to="item.item" class="inline">
            {{ item.name }}
          </NuxtLink>
        </li>
      </template>
    </SchemaOrgBreadcrumb>
  </div>
</template>

<style scoped lang="scss">
li:first-child {
  padding-left: 0;
  &:before {
    display: none;
  }
}
</style>
