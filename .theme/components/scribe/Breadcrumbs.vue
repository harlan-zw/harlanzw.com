<script lang="ts" setup>
const breadcrumbs = await useBreadcrumbs()
</script>

<template>
  <nav aria-label="Breadcrumb" v-if="breadcrumbs.length > 1">
    <ul>
      <template v-for="(item, key) in breadcrumbs">
        <li v-if="item.item" :key="key">
          <NuxtLink :to="item.item" class="inline !border-none">
            {{ item.name }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
  <SchemaOrgBreadcrumb
    v-if="breadcrumbs.length > 1"
    :item-list-element="breadcrumbs"
  />
</template>
<style scoped>
ul {
  display: flex;
  font-size: $dt('fontSize.sm');
  opacity: 0.5;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
}

li {
  margin-top: 0;
  &:not(:first-child) {
    padding-left: $dt('space.3');
    &:before {
      content: '/';
       font-size: $dt('fontSize.xs');
      opacity: 0.4;
       display: inline-block;
      margin-right: $dt('space.3');
    }
  }
}
</style>
