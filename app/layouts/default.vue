<script setup lang="ts">
import { site } from '#shared/site'
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <NuxtLink to="#main-content" class="skip-link">
      Skip to content
    </NuxtLink>
    <Header />
    <main id="main-content" tabindex="-1" class="content-shell flex-1 py-10 md:py-14">
      <slot />
    </main>
    <footer class="content-shell mt-12 border-t border-default pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-sm text-dimmed">
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
