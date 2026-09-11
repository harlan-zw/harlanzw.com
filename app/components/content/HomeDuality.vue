<script setup lang="ts">
import { site } from '#shared/site'
</script>

<template>
  <div class="home-duality grid gap-24 lg:grid-cols-2 lg:gap-0">
    <section aria-label="Harlan Wilton" class="human-home relative z-1 min-w-0 lg:pr-16">
      <NuxtImg :src="site.logo" provider="cloudinary" width="80" height="80" alt="Harlan Wilton" class="mb-5 size-20 rounded-full" />
      <div class="identity-content">
        <slot name="human" />
      </div>
    </section>
    <section aria-label="Harlan GitHub Agent" class="agent-home dark relative z-1 min-w-0 lg:pl-16">
      <img src="/agent-avatar.png" width="80" height="80" alt="Harlan GitHub Agent" class="mb-5 size-20 rounded-sm">
      <div class="identity-content">
        <slot name="agent" />
        <ArticleLiveStats contained />
      </div>
    </section>
  </div>
</template>

<style scoped>
.identity-content {
  display: grid;
  gap: clamp(1rem, 3dvh, 2rem);
}

.agent-home :deep(.prose h2) {
  margin-block: 0 0.6em;
  font-size: 1.625rem;
  font-weight: 500;
  line-height: 1.2;
}

.agent-home {
  --ui-primary: var(--color-orange-400);
  --ui-bg: var(--color-neutral-950);
  --ui-bg-elevated: var(--color-neutral-900);
  --ui-bg-muted: var(--color-neutral-800);
  --ui-border: var(--color-neutral-700);
  --ui-text: var(--color-neutral-300);
  --ui-text-muted: var(--color-neutral-400);
  --ui-text-dimmed: var(--color-neutral-400);
  --ui-text-highlighted: var(--color-orange-100);
  font-family: var(--font-mono);
}

.agent-home :deep(.prose) {
  font-size: 0.875rem;
  line-height: 1.75;
}

.agent-home :deep(a) {
  color: var(--ui-primary);
  text-decoration-color: currentColor;
}

.agent-home :deep(a:hover) {
  color: var(--color-orange-200);
}

.agent-home :deep(.hogwild-stats) {
  border-style: dashed;
}

.agent-home :deep(.hogwild-stats dt) {
  font-size: 0.875rem;
}

@media (max-width: 1023px) {
  .agent-home {
    margin-inline: -1rem;
    padding: 1rem;
    background: var(--ui-bg);
  }

  .agent-home::before {
    position: absolute;
    top: -96px;
    left: 0;
    right: 0;
    height: 96px;
    background: var(--ui-bg);
    mask: url('/agent-dither-horizontal.svg') repeat-x;
    pointer-events: none;
    content: '';
  }
}

@media (min-width: 1024px) and (max-height: 700px) {
  .home-duality img {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }

  .identity-content {
    gap: 0.75rem;
  }

  .agent-home :deep(.hogwild-stats dl) {
    row-gap: 0.5rem;
  }
}
</style>
