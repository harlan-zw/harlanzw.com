<script lang="ts" setup>
defineProps({
  tag: String,
})
</script>

<template>
  <div>
    <template v-if="tag === 'github'">
      <i-logos-github-icon class="inline-block mr-1" height="15" />
      <span class="opacity-75">GitHub</span>
    </template>
    <template v-else-if="tag === 'vue'">
      <i-vscode-icons-file-type-vue class="inline-block mr-1" height="15" />
      <span class="opacity-75">Vue</span>
    </template>
    <template v-else-if="tag === 'vite'">
      <i-logos-vitejs class="inline-block mr-1" height="15" />
      <span class="opacity-75">Vite</span>
    </template>
    <template v-else-if="tag === 'typescript'">
      <i-logos-typescript-icon class="inline-block mr-1" height="15" />
      <span class="opacity-75">TypeScript</span>
    </template>
    <template v-else-if="tag === 'webpack'">
      <i-logos-webpack class="inline-block mr-1" height="15" />
      <span class="opacity-75">webpack</span>
    </template>
  </div>
</template>
