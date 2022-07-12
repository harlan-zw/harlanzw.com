<script lang="ts" setup>
import { useBreadcrumbs } from '~/logic'

const breadcrumbs = useBreadcrumbs()
</script>

<template>
<SchemaOrgBreadcrumb :item-list-element="breadcrumbs" />
<div class="flex space-x-4 text-sm opacity-50 mb-3 min-h-20px">
  <NuxtLink v-for="(breadcrumb, key) in breadcrumbs" :key="key" :to="breadcrumb.item" class="inline">
    {{ breadcrumb.name }}
  </NuxtLink>
</div>
</template>
