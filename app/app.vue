<script setup lang="ts">
import { site } from '#shared/site'

useHead({
  htmlAttrs: { dir: 'ltr', lang: site.language },
  bodyAttrs: { class: 'antialiased' },
})
</script>

<template>
  <UApp :tooltip="{ delayDuration: 400, skipDelayDuration: 300 }">
    <Head>
      <SchemaOrgPerson :name="site.name" :same-as="site.sameAs" image="https://res.cloudinary.com/dl6o1xpyq/image/upload/f_jpg,q_auto:best,dpr_auto,w_240,h_240/images/harlan-wilton" />
    </Head>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtLayout>
      <NuxtPage class="page-enter-active" />
    </NuxtLayout>
  </UApp>
</template>
