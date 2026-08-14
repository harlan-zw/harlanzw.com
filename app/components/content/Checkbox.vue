<script lang="ts" setup>
const value = ref(false)
const id = useId()
</script>

<template>
  <div class="py-3" :class="value ? ['opacity-50'] : []">
    <input :id="id" v-model="value" :name="id" type="checkbox" class="sr-only">
    <label :for="id" class="mb-1 flex min-h-11 cursor-pointer items-center rounded-md px-2 py-3 transition-colors hover:bg-elevated">
      <span class="relative">
        <Icon name="line-md:confirm-circle-twotone-to-circle-transition" class="size-8 text-primary" aria-hidden="true" data-allow-mismatch="style" />
        <Icon v-if="value" name="line-md:confirm" class="absolute inset-0 m-auto size-5 text-primary" aria-hidden="true" data-allow-mismatch="style" />
      </span>
      <span class="ml-3 capitalize">
        <slot />
      </span>
    </label>
    <div class="ml-12 grid opacity-85 transition-[grid-template-rows] duration-300" :class="value ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'">
      <div class="overflow-hidden">
        <slot name="tip" />
      </div>
    </div>
  </div>
</template>
