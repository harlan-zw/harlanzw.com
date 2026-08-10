<template>
  <div class="prose mb-8 md:mb-12">
    <slot />
  </div>
</template>

<style>
.prose .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.prose h2 a {
  color: var(--ui-primary);
}

.dark .prose h2 a {
  color: var(--color-emerald-300);
}

.prose h3 a {
  opacity: 0.9;
}

/* Fix icons in headers */
.prose h1 svg {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0 0.25rem 0.25rem;
  color: var(--ui-text-muted);
}

.prose p code {
  display: inline;
  border-radius: 0.25rem;
  background: var(--ui-bg-muted);
  padding: 0.25rem 0.5rem;
  color: var(--ui-text);
  font-weight: 400;
  overflow-wrap: break-word;
}

.prose h2 a,
.prose h3 a {
  text-decoration: none;
}

@media (min-width: 48rem) {
  .prose h1 svg { width: 2rem; height: 2rem; }
}
</style>
