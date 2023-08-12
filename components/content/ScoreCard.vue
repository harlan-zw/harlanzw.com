<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  label: string
  before: number
  after?: number
  currency?: boolean
  suffix?: string
}>()

const isPositive = computed(() => {
  return props.before < props.after
})

const percentage = computed(() => {
  // round 2 decimal places
  return (((props.after - props.before) / props.before) * 100)
    .toFixed()
})

const formattedAfter = computed(() => {
  // use Intl for money formatting
  if (props.currency) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(props.after)
  }
  // otherwise just use nice number formatting with ,
  return new Intl.NumberFormat('en-AU').format(props.after) + (props.suffix || '')
})
</script>
<template>
<div class="p-5 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded shadow-sm text-gray-900 dark:text-gray-200 ">
  <div class="text-base text-gray-400 dark:text-gray-500">{{ label }}</div>
  <div class="flex items-center pt-1">
    <div class="text-2xl font-bold">
    {{ formattedAfter }}
    </div>
    <span v-if="isPositive" class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600  bg-green-100 rounded-full">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1 opacity-70 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"/></svg>
                        <span>{{ percentage }}%</span>
					</span>
    <span v-else class="flex items-center px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1 opacity-70 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                        <span>{{ percentage }}%</span>
					</span>
  </div>
</div>
</template>
