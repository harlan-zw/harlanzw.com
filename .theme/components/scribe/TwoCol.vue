<template>
<div class="grid lg:grid-cols-6 relative">
  <div class="col-span-3">
    <slot name="left"></slot>
  </div>
  <div></div>
  <div class="col-span-2 text-center">
    <div class="sticky top-35">
      <slot name="right"></slot>
    </div>
  </div>
</div>
</template>
