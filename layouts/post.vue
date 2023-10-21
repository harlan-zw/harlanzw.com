<script lang="ts" setup>
const { page: post } = useContent()
defineOgImage({
  component: post.value._path.startsWith('2023') ? 'Newsletter' : 'Post',
  readingMins: post.value.readingMins,
  ...post.value.ogImage || {},
})
const items = useBreadcrumbItems()
const ui = useBreadcrumbsUi()
</script>

<template>
  <DocsPageLayout>
    <SchemaOrgArticle />
    <div v-if="post.breadcrumbs !== false" class="mb-3 w-full">
      <SBreadcrumb :items="items" :ui="ui" class="mb-0" />
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
