<script lang="ts" setup>
const siteMeta = useSiteMeta()

</script>

<template>
<Html lang="en-AU" />
<Body class="text-gray-800 dark:text-gray-100 antialiased" />
<Meta property="og:image" content="/cover.jpg" />
<Meta name="og:type" content="website" />
<Meta name="twitter:card" content="summary_large_image" />
<Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<SchemaOrgPerson
  :name="siteMeta.name"
  :image="siteMeta.logo"
  :same-as="siteMeta.sameAs"
/>
<SchemaOrgWebSite
  :name="siteMeta.name"
  :image="siteMeta.image"
  :description="siteMeta.description"
/>
<SchemaOrgWebPage />
<Navbar />
<main class="md:max-w-700px mx-auto px-8 lg:px-0 py-7 pb-10 sm:pb-16 md:pb-20 max-w-full">
  <NuxtLoadingIndicator />
  <NuxtPage class="page-enter-active" />
</main>
<footer class="px-5 sm:px-7 md:px-10 text-center text-gray-400 text-sm my-5">
  <div class="flex justify-center mb-3">
    <SocialIcons />
  </div>
  <p class="mb-3">
    © 2022-PRESENT {{ siteMeta.name }}. All rights reserved.
  </p>
</footer>
</template>
