<script setup lang="ts">
import { site } from '#shared/site'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: site.tagline,
  description: site.description,
})
</script>

<template>
  <div class="flex h-full w-full bg-zinc-950 p-[72px] font-sans text-zinc-100">
    <div class="flex w-full flex-col justify-between">
      <div class="flex max-w-[920px] flex-col">
        <p class="m-0 mb-7 text-[28px] font-bold text-emerald-400">
          harlanzw.com
        </p>
        <h1 class="m-0 text-[68px] leading-[1.1] tracking-[-2px]">
          {{ title }}
        </h1>
        <p class="m-0 mt-7 text-[30px] leading-[1.45] text-zinc-400">
          {{ description }}
        </p>
      </div>
      <div class="flex items-center gap-5">
        <img :src="`${site.url}${site.logo}`" :alt="site.name" width="64" height="64" class="rounded-xl">
        <p class="m-0 text-[30px] font-bold">
          {{ site.name }}
        </p>
      </div>
    </div>
  </div>
</template>
