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
