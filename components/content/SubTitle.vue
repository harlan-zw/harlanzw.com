<template>
  <h2 class="mb-5 bg-gradient-to-b from-emerald-500 to-teal-600 inline-block font-semibold text-lg">
    <slot />
  </h2>
</template>

<style scoped lang="scss">
h2 {
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
}
</style>
