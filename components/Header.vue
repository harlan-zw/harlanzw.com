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
          <ul class="flex lg:(space-x-7 mr-15) sm:space-x-2 space-x-1 md:mr-7 items-center">
            <li v-for="(link, key) in nav" :key="key">
              <NuxtLink v-slot="{ isActive }" :to="link.path" class="!inline-flex items-center group" :title="`Visit ${link.title} Page`">
                <div :class="isActive ? ['sm:bg-primary-lightest/10', 'text-primary-dark', 'dark:(sm:bg-primary-darkest/10 text-primary-light)'] : []" class="md:(px-3 py-2) px-1 py-1 rounded">
                  <svg
                    v-if="link.icon"
                    v-bind="link.icon"
                    class="hidden sm:inline-block text mr-2 mb-1 transition opacity-75 group-hover:opacity-100"
                    :class="isActive ? 'opacity-100' : 'opacity-75'"
                  />
                  {{ link.title }}
                </div>
                <!-- Render Prefetch hints for all navigation pages -->
                <Link :key="key" rel="prefetch" :href="link.path" />
              </NuxtLink>
            </li>
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
}
</style>
