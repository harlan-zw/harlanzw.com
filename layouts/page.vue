<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <div class="page-layout layout-page max-w-100ch mx-auto">
    <OgImageStatic :component="page.island || 'PageOgImage'" :title="page.title" v-bind="page.ogImage || {}" />
    <main>
      <TopBreadcrumbs v-if="page.breadcrumbs !== false" class="mb-2" />
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
