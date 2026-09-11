<script setup lang="ts">
import { site } from '#shared/site'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-dvh flex flex-col" :class="{ 'home-layout': isHome }">
    <NuxtLink to="#main-content" class="skip-link">
      Skip to content
    </NuxtLink>
    <Header />
    <main id="main-content" tabindex="-1" class="content-shell flex-1" :class="isHome ? 'home-main' : 'py-10 md:py-14'">
      <slot />
    </main>
    <footer class="content-shell text-sm text-dimmed" :class="isHome ? 'home-footer' : 'mt-12 border-t border-default pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-center'">
      <SocialIcons v-if="!isHome" class="mb-4 justify-center" />
      <p v-if="!isHome" class="mb-2">
        Like this site? <NuxtLink to="https://github.com/harlan-zw/harlanzw.com">
          Clone away.
        </NuxtLink>
      </p>
      <p>© 2022 to present {{ site.name }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
.home-layout {
  overflow-x: clip;
}

.home-main {
  position: relative;
  display: grid;
  align-content: center;
  padding-block: clamp(0.5rem, 1.5dvh, 1.5rem);
}

.home-main > div {
  width: 100%;
  max-width: 68rem;
  margin-inline: auto;
}

.home-main article {
  display: grid;
  gap: clamp(0.5rem, calc((100dvh - 36rem) / 4), 3rem);
}

.home-main .prose h1 {
  margin-block: 0 0.5em;
}

.home-main .prose p {
  margin-block: 0.4em;
}

.home-main .prose {
  margin: 0;
}

.home-main .hogwild-stats {
  margin-block: 0;
}

.home-footer {
  padding-block: 1rem max(1rem, env(safe-area-inset-bottom));
  text-align: center;
  font-size: 0.75rem;
}
@media (min-width: 1024px) {
  .home-main::before,
  .home-main::after {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--color-neutral-950);
    pointer-events: none;
    content: '';
  }

  .home-main::before {
    left: calc(50% + 48px);
    right: calc((100vw - 100%) / -2);
  }

  .home-main::after {
    left: calc(50% - 48px);
    width: 96px;
    mask: url('/agent-dither.svg') repeat-y;
  }
}
</style>
