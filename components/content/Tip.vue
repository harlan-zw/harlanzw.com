<template>
  <div class="p-4 my-4 rounded-md bg-blue-100 dark:bg-blue-700">
    <div class="flex">
      <div>
        <i-line-md-lightbulb class="icon mt-1" />
      </div>
      <div class="ml-3">
        <MDCSlot :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>
</template>
