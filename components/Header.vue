<script lang="ts" setup>
const { data: nav } = await useHeaderNav()
</script>

<template>
  <header>
    <div class="flex justify-between items-center max-w-8xl mx-auto mx-auto sm:px-8 px-4">
      <Logo />
      <div class="flex items-center">
        <!-- Navigation -->
        <nav aria-label="Main Menu" class="opacity-75">
          <ul class="flex lg:(space-x-7 mr-15) sm:space-x-2 space-x-1 text-sm md:text-base items-center">
            <template v-for="(link, key) in nav">
              <li v-if="link._path !== '/'" :key="key">
                <NuxtLink v-slot="slot" :to="link._path" class="!inline-flex items-center group" :title="`Visit ${link.title} Page`">
                  <div :class="slot?.isActive ? ['sm:bg-green-50', 'text-green-800', 'dark:(sm:bg-green-800/10 text-green-50)'] : []" class="md:(px-3 py-2) px-1 py-1 rounded">
                    <icon v-if="link.icon" :name="link.icon" :class="slot?.isActive ? 'opacity-100' : 'opacity-75'" class="hidden text-sm w-3 h-3 lg:inline-block text mr-2 mb-1 transition opacity-75 group-hover:opacity-100" />
                    {{ link.title }}
                  </div>
                  <!-- Render Prefetch hints for all navigation pages -->
                  <Link :key="key" rel="prefetch" :href="link._path" />
                </NuxtLink>
              </li>
            </template>
          </ul>
        </nav>
        <div class="md:(space-x-2) space-x-1 text-gray-500 flex items-center">
          <!-- Social icons & Color Mode -->
          <SocialIcons class="hidden sm:flex md:(space-x-2) space-x-1 " />
          <ColorModeSwitch />
        </div>
      </div>
    </div>
  </header>
</template>

<style>
header {
  border-style: none;
  backdrop-filter: blur(2px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.8);
}

.dark header {
  background-color: #111827ed;
}

nav .icon {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 1024px) {
  nav .icon {
    display: none !important;
  }
}
</style>
