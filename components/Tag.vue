<script lang="ts" setup>
const props = defineProps({
  tag: String,
  small: Boolean,
})

const title = computed(() => {
  switch (props.tag) {
    case 'nuxt':
      return 'Nuxt'
    case 'github':
      return 'GitHub'
    case 'vue':
      return 'Vue.js'
    case 'vite':
      return 'Vite'
    case 'typescript':
      return 'TypeScript'
    case 'newsletter':
      return 'Newsletter'
    default:
      return props.tag
  }
})

const icon = computed(() => {
  switch (props.tag) {
    case 'nuxt':
      return 'logos:nuxt-icon'
    case 'github':
      return 'logos:github'
    case 'vue':
      return 'logos:vue'
    case 'vite':
      return 'logos:vitejs'
    case 'typescript':
      return 'logos:typescript-icon'
    case 'webpack':
      return 'logos:webpack'
    case 'newsletter':
      return 'line-md:email-twotone'
    default:
      return ''
  }
})
</script>

<template>
  <div :title="title" class="flex items-center">
    <Icon :name="icon" :class="small ? '!h-4 !w-4' : '!h-6 !w-6'" />
    <div v-if="!small" class="ml-1.5 text-sm">
      {{ title }}
    </div>
  </div>
</template>
