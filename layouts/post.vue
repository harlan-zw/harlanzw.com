<script lang="ts" setup>
const { page: post } = useContent()
defineOgImageScreenshot({
  delay: 1000,
})
</script>

<template>
  <DocsPageLayout>
    <SchemaOrgArticle />
    <div class="flex items-center mb-3">
      <TopBreadcrumbs v-if="post.breadcrumbs !== false" class="mb-0" />
      <TagList :tags="post.tags" />
    </div>
    <PageTitle :post="post" />
    <PostMeta :post="post" />
    <article>
      <div class="prose-wrap max-w-85ch">
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
  top: 104px !important;
  grid-column: span 2 / span 2 !important;
  padding: 0 !important;
  margin: var(--space-8) 0 0 0 !important;
}
.docs-page-content {
  grid-template-columns: repeat(12,minmax(0,1fr)) !important;
  padding: 0 !important;
}
.page-body {
  max-width: 100%;
  grid-column: span 10 /span 10;
}
.toc-wrapper {
  border-radius: 4px;
}
</style>
