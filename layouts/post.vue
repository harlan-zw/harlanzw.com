<script lang="ts" setup>
const { page: post } = useContent()
defineOgImage({
  component: 'Post',
  ...post.value.ogImage || {},
  readingMins: post.value.readingMins
})
</script>

<template>
  <DocsPageLayout>
    <SchemaOrgArticle />
    <div class="flex items-center mb-3">
      <SBreadcrumb v-if="post.breadcrumbs !== false" hide-separator hide-current class="mb-0" />
      <TagList :tags="post.tags" class="opacity-50 hover:opacity-100 transition text-sm" />
    </div>
    <PageTitle :post="post" />
    <PostMeta :post="post" />
    <article>
      <div class="prose-wrap max-w-85ch">
        <NewsletterAlert v-if="post.tags.includes('newsletter')" class="my-10" />
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
