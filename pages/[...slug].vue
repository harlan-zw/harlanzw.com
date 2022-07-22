<script setup lang="ts">
import { callWithNuxt, throwError, useNuxtApp } from '#app'
import { createError } from 'h3'

const routesContentQuery = await useRoutesContent()

const { data: pageContent, error } = routesContentQuery

if (process.server && error.value && (error.value as unknown as Error).message.includes('404')) {
  const nuxtApp = useNuxtApp()
  callWithNuxt(nuxtApp, throwError, [createError({
    statusCode: 404,
    statusMessage: `Page not found: ${useRoute().path}`,
  })])

  if (process.server && nuxtApp.ssrContext)
    nuxtApp.ssrContext.res.statusCode = 404
}
else {
  addHead(pageContent)
}
</script>

<template>
  <div>
    <template v-if="pageContent">
      <LazyPageRenderer v-if="pageContent.renderer === 'page'" :page="pageContent" />
      <LazyPostRenderer v-else-if="pageContent.renderer === 'post'" :post="pageContent" />
    </template>
    <!--    Handle Error -->
  </div>
</template>
