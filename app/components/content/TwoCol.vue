<template>
  <div class="relative grid items-center gap-12 py-8 md:py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
    <div class="lg:col-span-7">
      <slot name="left" />
    </div>
    <div class="lg:col-span-5">
      <slot name="right" />
    </div>
  </div>
</template>
