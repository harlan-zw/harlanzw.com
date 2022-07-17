<script lang="ts" setup>
const { data: post } = await usePost(`posts/${useRoute().params.slug}`)

addHead(post)
</script>

<template>
  <div>
    <SchemaOrgArticle
      type="TechArticle"
      :date-published="post.publishedAt"
      :data-modified="post.modifiedAt"
    />
    <Breadcrumbs class="mb-2" />
    <h1 class="!text-3xl font-bold !leading-11 !md:(text-5xl leading-16) mb-10">
      {{ post.title }}
    </h1>
    <div class="sm:(flex space-x-7 mb-10 text-lg) mb-5 items-center">
      <div class="opacity-80 mb-5 sm:mb-0">
        {{ post.readingMins }} minute read
      </div>
      <TagList :tags="post.tags" />
    </div>
    <Prose>
      <ContentRenderer :value="post" class="max-w-none">
        <template #not-found>
          <h1 class="text-2xl">
            Page not found
          </h1>
        </template>
      </ContentRenderer>
    </Prose>
  </div>
</template>
