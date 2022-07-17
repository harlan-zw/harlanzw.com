<template>
  <div class="p-4 rounded-md bg-gray-800">
    <div class="flex">
      <div>
        <i-line-md-lightbulb class="icon mt-1" />
      </div>
      <div class="ml-3">
        <Markdown :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>
</template>
