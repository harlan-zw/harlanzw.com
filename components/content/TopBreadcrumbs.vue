<template>
  <Breadcrumbs class="unprose no-prose flex space-x-4 text-sm opacity-50 list-none !mt-0 mb-2">
    <template #breadcrumb="{ to, title, last }">
      <span><!-- empty --></span>
      <NuxtLink v-if="!last" :to="to" class="inline !border-none">
        {{ title }}
      </NuxtLink>
    </template>
  </Breadcrumbs>
</template>

<style scoped>
::v-deep(li:before) {
  display: none;
}
::v-deep(li:first-child) {
  padding-left: 0;
}
::v-deep(li) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
::v-deep(a) {
  margin-bottom: 0 !important;
}
::v-deep(ul) {
  @apply flex space-x-4;
}
</style>
