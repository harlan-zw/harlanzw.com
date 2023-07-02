<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <div class="page-layout layout-page max-w-100ch mx-auto">
    <OgImage :component="page.island || 'Page'" :title="page.title" v-bind="page.ogImage || {}" />
    <main>
      <SBreadcrumb v-if="page.breadcrumbs !== false" hide-separator hide-current class="mb-2" />
      <PageTitle :post="page" />
      <article>
        <div class="prose-wrap max-w-100ch">
          <Prose v-if="page.prose">
            <ContentRenderer :value="page" />
          </Prose>
          <ContentRenderer v-else :value="page" />
        </div>
      </article>
    </main>
  </div>
</template>
