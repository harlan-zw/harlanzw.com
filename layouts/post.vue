<script lang="ts" setup>
const { page: post } = useContent()
defineOgImageScreenshot()
</script>

<template>
  <DocsPageContent>
    <SeoKit />
    <SchemaOrgArticle
    />
    <TopBreadcrumbs v-if="post.breadcrumbs !== false" class="mb-2" />
    <PageTitle :post="post" />
    <TagList :tags="post.tags" class="mb-5" />
    <PostMeta :post="post" />

    <article>
      <div class="prose-wrap max-w-90ch">
        <Prose>
          <ContentRenderer :value="post" />
        </Prose>
      </div>
    </article>
  </DocsPageContent>
</template>
<style scoped>
@media(max-width: 1024px) {
  ::v-deep(.toc) {
    position: initial !important;
  }
}
::v-deep(.toc) {
  top: 72px !important;
}
::v-deep(.toc-wrapper) {
  border-radius: 4px;
}
</style>
