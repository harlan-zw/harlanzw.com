<script lang="ts" setup>
const config = useTheme()
</script>

<template>
  <Html :lang="config.site.language" dir="ltr">
    <Head>
      <Meta name="og:type" content="website" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta property="og:locale" content="en_AU" />
      <Meta property="og:image" :content="`${config.site.url}/cover.png`" />
      <Meta http-equiv="Accept-CH" content="DPR" />
      <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <Link rel="preconnect" href="https://res.cloudinary.com" />
      <SchemaOrgPerson
        :name="config.site.name"
        :image="config.site.cover"
        :same-as="config.site.sameAs"
      />
      <SchemaOrgWebSite
        :name="config.site.name"
        :image="config.site.image"
        :description="config.site.description"
      />
      <SchemaOrgWebPage />
    </Head>
    <Body class="text-gray-800 dark:text-gray-100 antialiased">
      <NuxtLoadingIndicator />
      <Header />
      <main class=" lg:(px-0) md:(max-w-700px pb-20 px-8) sm:(pb-16 px-6) mx-auto max-w-ful px-4 py-7 pb-10 l">
        <NuxtPage class="page-enter-active" />
      </main>
      <footer class="px-5 sm:px-7 md:px-10 text-center text-gray-400 text-sm my-5">
        <div class="flex justify-center mb-3">
          <SocialIcons />
        </div>
        <p class="mb-3">
          © 2022-PRESENT {{ config.site.name }}. All rights reserved.
        </p>
      </footer>
    </Body>
  </Html>
</template>
