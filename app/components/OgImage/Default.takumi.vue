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
  <div style="display: flex; width: 100%; height: 100%; padding: 72px; color: #f4f4f5; background: #07110d; font-family: 'JetBrains Mono';">
    <div style="display: flex; width: 100%; flex-direction: column; justify-content: space-between;">
      <div style="display: flex; flex-direction: column; max-width: 920px;">
        <p style="margin: 0 0 28px; color: #34d399; font-size: 28px; font-weight: 700;">
          harlanzw.com
        </p>
        <h1 style="margin: 0; font-size: 68px; line-height: 1.1; letter-spacing: -2px;">
          {{ title }}
        </h1>
        <p style="margin: 28px 0 0; color: #a1a1aa; font-size: 30px; line-height: 1.45;">
          {{ description }}
        </p>
      </div>
      <div style="display: flex; align-items: center; gap: 20px;">
        <img :src="`${site.url}${site.logo}`" width="64" height="64" style="border-radius: 12px;">
        <p style="margin: 0; font-size: 30px; font-weight: 700;">
          {{ site.name }}
        </p>
      </div>
    </div>
  </div>
</template>
