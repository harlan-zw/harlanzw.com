<template>
  <div class="lg:(grid grid-cols-12 gap-20) relative">
    <div class="col-span-7">
      <slot name="left" />
    </div>
    <div class="col-span-5 text-center">
      <div class="sticky top-35">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
