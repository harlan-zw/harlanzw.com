<template>
<div class="header">
  <div class="flex justify-between items-center max-w-8xl mx-auto mx-auto sm:px-8 px-4">
    <Logo />
    <div class="flex items-center">
      <!-- Navigation -->
      <nav class="flex md:(space-x-7 mr-15) space-x-4 sm:mr-7 items-center opacity-75">
        <NuxtLink to="/blog" class="!inline-flex items-center group" title="Blog">
          <i-line-md-text-box-multiple class="hidden sm:inline-block text mr-2 transition opacity-75 group-hover:opacity-100" />
          Blog
        </NuxtLink>
        <NuxtLink v-slot="{ isActive }" to="/projects" class="!inline-flex items-center group" title="Projects">
          <i-line-md-lightbulb
            class="hidden sm:inline-block text-sm mr-1 transition group-hover:opacity-100"
            :class="isActive ? 'opacity-100 text-lg' : 'opacity-75'"
          />
          Projects
        </NuxtLink>
        <NuxtLink to="/sponsors" class="!inline-flex items-center group" title="Sponsors">
          <i-line-md-heart class="mr-5px transition opacity-75 group-hover:opacity-100" />
          <span class="hidden sm:inline-block">Sponsors</span>
        </NuxtLink>
      </nav>
      <!-- Social icons & Color Mode -->
      <SocialIcons class="hidden sm:flex" />
    </div>
  </div>
</div>
</template>

<style>
.header {
  border-style: none;
  backdrop-filter: blur(2px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
}
</style>
