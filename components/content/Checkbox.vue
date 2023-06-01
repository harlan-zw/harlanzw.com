<script lang="ts" setup>
const value = ref(false)
function changed() {
  value.value = !value.value
}
</script>

<template>
  <div class="py-3" :class="value ? ['opacity-50'] : []">
    <label class="mb-1 flex items-center py-3 px-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded cursor-pointer">
      <div class="relative">
        <input :checked="value ? 'checked' : false" type="checkbox" class="hidden" @input="changed">
        <icon name="line-md:confirm-circle-twotone-to-circle-transition" />
        <icon v-if="value" name="line-md:confirm" class="absolute check" />
      </div>
      <div class="ml-3 capitalize">
        <Markdown :use="$slots.default" unwrap="p" />
      </div>
    </label>
    <div class="ml-12 opacity-85 max-h-full overflow-hidden transition-all" :class="value ? ['max-h-5'] : []">
      <Markdown :use="$slots.tip" />
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
.icon {
  color: #00bfa5;
  width: 30px;
  height: 30px;
}
</style>
