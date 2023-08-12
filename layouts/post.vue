<script lang="ts" setup>
const { page: post } = useContent()
defineOgImage({
  component: 'Newsletter',
  readingMins: post.value.readingMins,
  ...post.value.ogImage || {},
})
</script>

<template>
  <DocsPageLayout>
    <SchemaOrgArticle />
    <div v-if="post.breadcrumbs !== false" class="flex items-center mb-3">
      <SBreadcrumb hide-separator hide-current class="mb-0" />
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
