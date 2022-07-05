<template>
<div class="sm:py-10">
  <Html lang="en" />
  <Meta property="og:image" content="/cover.jpg" />
  <Meta name="twitter:card" content="summary_large_image" />
  <div>
    <Navbar class="w-3xl flex-shrink" />
  </div>
  <div class="max-w-5xl flex items-start py-15 relative ml-1/5">
    <aside class="top-25 sticky px-10 mr-10 opacity-60 text-xl children:(mb-4 inline-block)">
      <NuxtLink class="!block" to="/">Home</NuxtLink>
      <NuxtLink class="!block" to="/articles">Articles</NuxtLink>
      <NuxtLink class="!block" to="/projects">Projects</NuxtLink>
      <NuxtLink class="!block" to="/snippets">Snippets</NuxtLink>
      <NuxtLink class="!block" to="/about">About</NuxtLink>
    </aside>
    <main class="w-672px pb-10 sm:pb-16 md:pb-20">
      <NuxtPage />
    </main>
  </div>
  <footer class="px-5 sm:px-7 md:px-10 text-center text-gray-400 text-sm my-5">
    <div class="text-center mb-5">
      <a href="https://github.com/harlan-zw" target="_blank" class="unstyled transition-opacity inline-block opacity-70 hover:opacity-100 mr-5" title="Github: harlan-zw">
        <svg role="img" viewBox="0 0 24 24" width="24" height="24"  xmlns="http://www.w3.org/2000/svg" fill="var(--c-brand)"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
      <a href="https://twitter.com/harlan_zw" target="_blank" class="unstyled transition-opacity inline-block opacity-70 hover:opacity-100  inline-block" title="Twitter: harlan_zw">
        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--c-brand)"><title>Twitter icon</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
      </a>
    </div>
    <p class="mb-3">© 2021 Harlan Wilton, All rights reserved.</p>
    <p><a href="/open-blogging/" class="mr-3">Open blogging</a><span class=" border-l-2 border-grey-50"></span><a href="/subscribe/" class="ml-3">Subscribe</a></p>
  </footer>
</div>
</template>

<style lang="postcss">
body {
  @apply bg-gray-50 dark:bg-gray-900;
}
</style>
