<script setup lang="ts">
import { getReadingMinutes } from '~/utils/content'

const route = useRoute()
const { data } = await useContentPage(route.path)
const page = computed(() => data.value?._tag === 'Ok' ? data.value.page : null)
const contentStyles = computed(() => data.value?._tag === 'Ok' ? data.value.styles : [])

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const isPost = computed(() => page.value?.layout === 'post' || (page.value?.path.startsWith('/blog/') && page.value.path !== '/blog'))
const readingMins = computed(() => page.value ? getReadingMinutes(page.value.body) : 1)
const pageWidthClass = computed(() => {
  if (page.value?.path === '/blog')
    return 'mx-auto max-w-[109ch]'
  return page.value?.wide ? 'max-w-none' : 'mx-auto max-w-[85ch]'
})
const breadcrumbs = computed(() => route.path
  .split('/')
  .filter(Boolean)
  .map((segment, index, segments) => ({
    label: segment.replaceAll('-', ' '),
    to: `/${segments.slice(0, index + 1).join('/')}`,
  })))

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogType: () => isPost.value ? 'article' : 'website',
})

useHead(() => ({
  style: contentStyles.value.map((textContent, index) => ({
    key: `content-shiki-${index}`,
    textContent,
  })),
}))

defineOgImage('Default', {
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <div v-if="page" :class="pageWidthClass">
    <nav v-if="isPost && page.breadcrumbs !== false" aria-label="Breadcrumbs" class="mb-8">
      <ol class="flex flex-wrap items-center gap-2 text-sm text-muted">
        <li>
          <NuxtLink to="/" aria-label="Home" class="unstyled grid size-11 place-items-center rounded-md text-muted transition-colors hover:bg-elevated hover:text-highlighted">
            <UIcon name="i-lucide-house" aria-hidden="true" />
          </NuxtLink>
        </li>
        <li v-for="item in breadcrumbs" :key="item.to" class="flex min-h-11 items-center gap-2 capitalize">
          <UIcon name="i-lucide-chevron-right" class="size-4 opacity-50" aria-hidden="true" />
          <NuxtLink :to="item.to" class="inline-flex min-h-11 items-center">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ol>
    </nav>

    <SchemaOrgArticle v-if="isPost" />
    <PageTitle :post="page" />
    <ContentPostMeta v-if="isPost && page.publishedAt" :post="page" :reading-mins="readingMins" />

    <article :class="[isPost ? 'mt-10' : '', page.path === '/talks' ? 'talk-directory' : '']">
      <ContentProse v-if="page.prose !== false">
        <ContentRenderer :value="page" />
      </ContentProse>
      <ContentRenderer v-else :value="page" />
    </article>
  </div>
</template>
