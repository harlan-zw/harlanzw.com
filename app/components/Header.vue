<script setup lang="ts">
const navigation = [
  { title: 'Blog', to: '/blog', icon: 'i-lucide-notebook-text' },
  { title: 'Projects', to: '/projects', icon: 'i-lucide-lightbulb' },
  { title: 'Sponsors', to: '/sponsors', icon: 'i-lucide-heart' },
  { title: 'Talks', to: '/talks', icon: 'i-lucide-presentation' },
]

const mobileNavigation = navigation.map(link => ({
  label: link.title,
  to: link.to,
  icon: link.icon,
}))
</script>

<template>
  <header class="sticky top-0 z-50 bg-elevated/80 backdrop-blur-sm">
    <div class="page-shell flex min-h-18 items-center justify-between gap-3">
      <Logo />
      <div class="flex min-w-0 items-center gap-1 sm:gap-2">
        <nav aria-label="Main navigation" class="hidden max-w-[62vw] overflow-x-auto md:block [scrollbar-width:none]">
          <ul class="flex items-center gap-2 text-sm lg:gap-5 lg:text-base">
            <li v-for="link in navigation" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group inline-flex min-h-11 items-center gap-2 rounded px-2.5 text-muted transition-colors hover:bg-muted hover:text-highlighted"
                active-class="bg-primary/10 text-primary"
              >
                <UIcon :name="link.icon" class="hidden size-4 lg:block" />
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="flex items-center gap-1 text-muted">
          <UDropdownMenu :items="mobileNavigation" :content="{ align: 'end' }">
            <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="md:hidden" aria-label="Open navigation" />
          </UDropdownMenu>
          <SocialIcons class="hidden xl:flex" />
          <ColorModeSwitch />
        </div>
      </div>
    </div>
  </header>
</template>
