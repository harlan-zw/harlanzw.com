<script lang="ts" setup>
const { page: post } = useContent()
defineOgImage({
  component: post.value._path.startsWith('2023') ? 'Newsletter' : 'Post',
  readingMins: post.value.readingMins,
  ...post.value.ogImage || {},
})
const items = useBreadcrumbItems()
</script>

<template>
  <DocsPageLayout>
    <SchemaOrgArticle />
    <div v-if="post.breadcrumbs !== false" class="mb-3 w-full">
      <nav aria-label="Breadcrumbs">
        <ul class="flex items-center gap-4 text-gray-500">
          <li v-for="(item, key) in items" :key="key">
            <NuxtLink v-bind="item">
              <span v-if="item.label !== 'Home'">{{ item.label }}</span>
              <Icon v-else name="carbon:home" class=" text-sm" style="width: 1.3rem; height: 1.3rem;" />
            </NuxtLink>
            <Icon v-if="key !== items.length - 1" name="carbon:chevron-right" class="opacity-50 ml-3" style="width: 1.3rem; height: 1.3rem;" />
          </li>
        </ul>
      </nav>
    </div>
    <PageTitle :post="post" />
    <PostMeta :post="post" />
    <article>
      <div class="prose-wrap max-w-85ch">
        <NewsletterAlert v-if="post.tags.includes('newsletter')" class="md:mt-10 mt-3" />
        <Prose>
          <ContentRenderer :value="post" />
        </Prose>
      </div>
    </article>
  </DocsPageLayout>
</template>

<style>
@media(max-width: 1024px) {
  .toc {
    position: initial !important;
  }
}
.toc {
  top: 160px !important;
}

.docs-prev-next .wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  align-items: start !important;
}
</style>
