<script setup lang="ts">
import { site } from '#shared/site'
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <Header />
    <main class="content-shell flex-1 py-7">
      <slot />
    </main>
    <footer class="content-shell py-8 text-center text-sm text-dimmed">
      <SocialIcons class="mb-4 justify-center" />
      <p class="mb-2">
        Like this site? <NuxtLink to="https://github.com/harlan-zw/harlanzw.com">
          Clone away.
        </NuxtLink>
      </p>
      <p>© 2022 to present {{ site.name }}. All rights reserved.</p>
    </footer>
  </div>
</template>
