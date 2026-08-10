<script setup lang="ts">
import { site } from '#shared/site'
</script>

<template>
  <div class="flex shrink-0 items-center">
    <NuxtLink to="/" class="group flex min-h-11 items-center unstyled" aria-label="Harlan Wilton, home">
      <NuxtImg
        :src="site.logo"
        width="80"
        height="80"
        :alt="site.name"
        provider="cloudinary"
        style="width: 40px; height: 40px;"
        class="mr-3 size-10 rounded-lg transition group-hover:scale-105 group-hover:shadow-lg"
      />
      <span aria-hidden="true" class="logo-initials hidden overflow-hidden text-3xl sm:block">
        <span class="logo-mark block">hw</span>
        <span class="logo-mark block">hw</span>
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.logo-initials {
  block-size: 2.5rem;
  inline-size: 2.75rem;
}

.logo-mark {
  background: linear-gradient(90deg, rgb(4 120 87 / 35%), rgb(52 211 153 / 35%));
  background-clip: text;
  color: transparent;
  font-weight: 400;
  line-height: 1;
  transform: skewX(-10deg);
  transition: transform 200ms ease, filter 200ms ease;
}

.logo-mark:nth-child(2) {
  background: linear-gradient(90deg, var(--color-emerald-400), var(--color-emerald-700));
  background-clip: text;
  transform: translate(-3px, -17px) skewX(-10deg);
}

.group:hover .logo-mark {
  background: linear-gradient(90deg, var(--color-emerald-700), var(--color-emerald-400));
  background-clip: text;
  filter: drop-shadow(0 0 10px rgb(52 211 153 / 40%));
  transform: translateY(18px) skewX(-10deg);
}

.group:hover .logo-mark:nth-child(2) {
  transform: translateY(-18px) skewX(-10deg);
}

@media (prefers-reduced-motion: reduce) {
  .logo-mark {
    transition: none;
  }
}
</style>
