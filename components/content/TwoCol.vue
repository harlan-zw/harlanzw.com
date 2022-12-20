<template>
<div class="grid lg:grid-cols-12 gap-20 relative">
  <div class="col-span-7">
    <slot name="left"></slot>
  </div>
  <div class="col-span-5 text-center">
    <div class="sticky top-35">
      <slot name="right"></slot>
    </div>
  </div>
</div>
</template>
