<script lang="ts" setup>
import { useBreadcrumbs } from '~/logic'

const breadcrumbs = useBreadcrumbs()
</script>

<template>
<div class="flex space-x-4 text-sm opacity-70">
  <NuxtLink v-for="(breadcrumb, key) in breadcrumbs" :key="key" :to="breadcrumb.path" class="inline">
    {{ breadcrumb.name }}
  </NuxtLink>
</div>
</template>
