<script setup lang="ts">
const { linkLabel = 'Open full size', ...props } = defineProps<{
  src: string
  href?: string
  linkLabel?: string
  alt: string
  caption: string
  width: number | string
  height: number | string
}>()
</script>

<template>
  <Expand :width="1200">
    <figure class="not-prose my-10 min-w-0">
      <a :href="props.href || props.src" target="_blank" rel="noopener noreferrer" class="block overflow-hidden rounded-lg border border-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" :aria-label="`${linkLabel}: ${props.alt}`">
        <img :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" loading="lazy" decoding="async" class="block h-auto w-full">
      </a>
      <figcaption class="mx-auto mt-3 max-w-prose text-sm leading-relaxed text-muted">
        {{ props.caption }}
        <a :href="props.href || props.src" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">{{ linkLabel }}<span class="sr-only">: {{ props.alt }}</span></a>
      </figcaption>
    </figure>
  </Expand>
</template>
