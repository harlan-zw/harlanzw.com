<template>
  <div class="my-4 rounded-md border border-primary/20 bg-primary/10 p-4">
    <div class="flex">
      <div>
        <UIcon name="i-line-md-lightbulb" class="mt-1 size-6 text-primary" />
      </div>
      <div class="ml-3">
        <MDCSlot :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>
</template>
