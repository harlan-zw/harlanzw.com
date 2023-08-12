<script lang="ts" setup>
const { page } = useContent()
</script>

<template>
  <div class="page-layout layout-page mx-auto flex justify-center items-center" style="min-height: calc(100vh - 330px)" :class="!page.wide ? 'max-w-85ch' : ''">
    <OgImage :component="page.island || 'Page'" :title="page.title" v-bind="page.ogImage || {}" />
    <main>
<!--      <SBreadcrumb v-if="page.breadcrumbs !== false" hide-separator hide-current class="mb-2" />-->
      <PageTitle :post="page" />
      <article>
        <div class="prose-wrap" :class="!page.wide ? 'max-w-85ch' : ''">
          <Prose v-if="page.prose">
            <ContentRenderer :value="page" />
          </Prose>
          <ContentRenderer v-else :value="page" />
        </div>
      </article>
    </main>
  </div>
</template>
