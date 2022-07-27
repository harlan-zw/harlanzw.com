<template>
  <div class="prose md:prose-lg prose-gray dark:prose-invert mb-8 md:mb-12">
    <slot />
  </div>
</template>

<style>
.prose h2 a {
  @apply bg-gradient-to-b from-primary-light to-primary-dark bg-clip-text before:opacity-0 after:opacity-0;
  -webkit-text-fill-color: transparent !important;
}

/*
.dark .prose h2 a {
  background: linear-gradient(180deg, var(--colors-primary-lighest), var(--colors-primary-light)) !important;
  -webkit-background-clip: text !important;
}
*/

.prose h3 a {
  @apply opacity-90 after:opacity-0 before:opacity-0
}

@keyframes text-glow {
  0% {
    filter: drop-shadow(0px 0px 2px var(--colors-primary-light));
  }
  100% {
    filter: drop-shadow(0px 1px 8px var(--colors-primary-lightest));
  }
}

/* Fix icons in headers */
.prose h1 svg {
  @apply ml-1 md:(w-8 h-8) w-6 h-6 mb-1 text-gray-500 inline-block;
}

.prose code {
  @apply bg-gray-200 text-gray-700 dark:(bg-gray-800 text-gray-300) py-1 px-2 rounded font-normal after:hidden before:hidden;
}

.prose h2 a,
.prose h3 a {
  @apply no-underline hover:border-none;
}
</style>
