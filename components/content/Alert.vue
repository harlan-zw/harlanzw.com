<template>
  <div class="p-4 rounded-md bg-yellow-50">
    <div class="flex">
      <div class="flex-shrink-0 mr-3" />
      <div>
        <h3 class="m-0 text-base font-medium text-yellow-800">
          <Markdown :use="$slots.title" unwrap="p" />
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <Markdown :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </div>
  </div>
</template>
