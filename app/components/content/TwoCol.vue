<template>
  <div class="relative items-center justify-center lg:grid lg:grid-cols-12 lg:gap-20 lg:pt-52">
    <div class="col-span-7">
      <slot name="left" />
    </div>
    <div class="col-span-5">
      <slot name="right" />
    </div>
  </div>
</template>
