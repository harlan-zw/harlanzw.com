<script lang="ts" setup>
const breadcrumbs = await useBreadcrumbs()
</script>

<template>
  <SchemaOrgBreadcrumb
    v-slot="{ itemListElement }"
    :item-list-element="breadcrumbs"
  >
    <nav aria-label="Breadcrumb">
      <ul v-if="itemListElement.length > 1" class="flex space-x-4 text-sm opacity-50 list-none !mt-0 !mb-0">
        <template v-for="(item, key) in itemListElement">
          <li v-if="item.item" :key="key" class="!mt-0">
            <NuxtLink :to="item.item" class="inline !border-none">
              {{ item.name }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </nav>
  </SchemaOrgBreadcrumb>
</template>

<style scoped lang="scss">
li:first-child {
  padding-left: 0;
  &:before {
    display: none;
  }
}
</style>
