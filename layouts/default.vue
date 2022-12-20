<script setup lang="ts">
let { page } = useContent()
page = page || {}
</script>

<template>
  <div class="page-layout layout-default max-w-90ch mx-auto">
    <main>
      <slot />
    </main>
  </div>
</template>
