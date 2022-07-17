<template>
<div class="text-gray-800 dark:text-gray-100 antialiased ">
  <!-- App Meta -->
  <Html lang="en-AU" />
  <Meta property="og:image" content="/cover.jpg" />
  <Meta name="twitter:card" content="summary_large_image" />
  <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <SchemaOrgPerson
    name="Harlan Wilton"
    image="/harlan-wilton.jpeg"
    :same-as="[
      'https://twitter.com/harlan_zw',
      'https://github.com/harlan-zw',
    ]"
  />
  <SchemaOrgWebSite name="Harlan Wilton" />
  <SchemaOrgWebPage />
  <!-- App template -->
  <Navbar />
  <main class="md:max-w-700px mx-auto px-8 lg:px-0 py-7 pb-10 sm:pb-16 md:pb-20 max-w-full">
    <!--    <div class="mb-3"> -->
    <!--      <Breadcrumbs /> -->
    <!--    </div> -->
    <NuxtPage class="animate-enter" />
  </main>
  <footer class="px-5 sm:px-7 md:px-10 text-center text-gray-400 text-sm my-5">
    <div class="flex justify-center mb-3">
      <SocialIcons />
    </div>
    <p class="mb-3">
      © 2022-PRESENT Harlan Wilton. All rights reserved.
    </p>
  </footer>
</div>
</template>

<style lang="postcss">
body {
  min-height: 100vh;
  background-color: rgb(247,247,247);
  background-image: linear-gradient(0deg, #33e47f10, #ffffff);
  @apply dark:bg-gray-900;
}
html.dark body {
  background-image: none;
}
</style>
