<template>
  <div class="lg:(grid grid-cols-12 gap-20) relative items-center justify-center">
    <div class="col-span-7">
      <slot name="left" />
    </div>
    <div class="col-span-5">
      <slot name="right" />
    </div>
  </div>
</template>
