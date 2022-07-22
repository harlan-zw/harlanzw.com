<template>
  <div class="code-block transform relative lg:(-translate-x-100px w-900px) my-12 !py-0  max-h-700px overflow-y-auto">
    <slot />
  </div>
</template>

<style scoped>
.code-block:before {
  @apply absolute top-2 right-3 z-2 text-sm text-gray-500;
  content: attr(data-language);
}

:deep(pre) {
  padding-top: 2em;
  margin: 0 !important;
}

:deep(.code-block__filename) {
  @apply rounded text-xs px-2 py-1 absolute top-0 left-0 bg-gray-700/70 text-white;
}
</style>
