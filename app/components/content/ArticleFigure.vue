<script setup lang="ts">
const { src, embed, alt, caption, width, height, displayWidth = 1200 } = defineProps<{
  src: string
  embed?: string
  alt: string
  caption: string
  displayWidth?: number | string
  width: number | string
  height: number | string
}>()

const image = useTemplateRef('image')
const zoomImage = useTemplateRef('zoomImage')
const dialog = useTemplateRef('dialog')
const reducedMotion = usePreferredReducedMotion()
const colorMode = useColorMode()
const embedUrl = computed(() => embed ? `${embed}?present=1&theme=${colorMode.value === 'dark' ? 'dark' : 'light'}` : undefined)

function openZoom() {
  if (!image.value || !dialog.value || !zoomImage.value)
    return
  const from = image.value.getBoundingClientRect()
  dialog.value.showModal()
  if (reducedMotion.value === 'reduce')
    return
  const to = zoomImage.value.getBoundingClientRect()
  zoomImage.value.animate([
    { transform: `translate(${from.x - to.x}px, ${from.y - to.y}px) scale(${from.width / to.width}, ${from.height / to.height})` },
    { transform: 'none' },
  ], { duration: 250, easing: 'ease-out' })
}
</script>

<template>
  <Expand :width="Number(displayWidth)">
    <figure class="not-prose my-10 min-w-0">
      <iframe
        v-if="embed"
        :src="embedUrl"
        :title="alt"
        loading="lazy"
        class="article-diagram w-full rounded-lg border border-default bg-default"
        allow="fullscreen"
      />
      <button
        v-else
        type="button"
        class="mx-auto block w-fit max-w-full cursor-zoom-in overflow-hidden rounded-lg border border-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        :aria-label="`Enlarge image: ${alt}`"
        aria-haspopup="dialog"
        @click="openZoom"
      >
        <img ref="image" :src="src" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async" class="block h-auto w-auto max-w-full">
      </button>
      <figcaption class="mx-auto mt-3 max-w-prose text-sm leading-relaxed text-muted">
        {{ caption }}
        <a v-if="embed" :href="embedUrl" target="_blank" rel="noopener noreferrer" class="ml-1 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Open diagram in a new tab</a>
      </figcaption>
    </figure>
    <Teleport to="body">
      <dialog v-if="!embed" ref="dialog" :aria-label="alt" class="article-zoom m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 text-default" @click.self="dialog?.close()">
        <div class="flex justify-end gap-4 bg-default px-3">
          <a :href="src" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Open full size</a>
          <button type="button" autofocus class="min-h-11 cursor-pointer px-3 focus-visible:outline-2 focus-visible:outline-primary" @click="dialog?.close()">
            Close
          </button>
        </div>
        <button type="button" class="block cursor-zoom-out" aria-label="Close enlarged image" @click="dialog?.close()">
          <img ref="zoomImage" :src="src" :alt="alt" :width="width" :height="height" loading="lazy" class="article-zoom-image block h-auto w-auto">
        </button>
      </dialog>
    </Teleport>
  </Expand>
</template>

<style scoped>
.article-diagram {
  height: clamp(640px, 65vw, 760px);
}

.article-zoom {
  width: fit-content;
}

.article-zoom::backdrop {
  background: color-mix(in oklab, var(--ui-bg) 94%, transparent);
}

.article-zoom-image {
  max-width: calc(100vw - 2rem);
  max-height: calc(100dvh - 6rem);
  transform-origin: top left;
}
</style>
