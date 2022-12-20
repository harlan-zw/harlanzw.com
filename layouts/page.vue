<script lang="ts" setup>
const { page } = useContent()
defineOgImageScreenshot()
</script>
<template>
  <div class="page-layout layout-page max-w-90ch mx-auto">
    <main>
      <TopBreadcrumbs v-if="page.breadcrumbs !== false" class="mb-2" />
      <PageTitle :post="page" />
      <article>
        <div class="prose-wrap max-w-90ch">
          <Prose v-if="page.prose">
            <ContentRenderer :value="page" />
          </Prose>
          <ContentRenderer v-else :value="page" />
        </div>
      </article>
    </main>
  </div>
</template>
