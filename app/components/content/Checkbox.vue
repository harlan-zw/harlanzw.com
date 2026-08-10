<script lang="ts" setup>
const value = ref(false)
const id = useId()
</script>

<template>
  <div class="py-3" :class="value ? ['opacity-50'] : []">
    <input :id="id" v-model="value" type="checkbox" class="sr-only">
    <label :for="id" class="mb-1 flex cursor-pointer items-center rounded px-2 py-3 hover:bg-elevated">
      <span class="relative">
        <Icon name="line-md:confirm-circle-twotone-to-circle-transition" class="size-8 text-primary" />
        <Icon v-if="value" name="line-md:confirm" class="check absolute text-primary" />
      </span>
      <span class="ml-3 capitalize">
        <MDCSlot :use="$slots.default" name="default" unwrap="p" />
      </span>
    </label>
    <div class="ml-12 opacity-85 max-h-full overflow-hidden transition-all" :class="value ? ['max-h-5'] : []">
      <MDCSlot :use="$slots.tip" name="tip" />
    </div>
  </div>
</template>

<style scoped>
.check {
  top: 6px;
  left: 5px;
  width: 18px !important;
  height: 18px !important;
}
</style>
