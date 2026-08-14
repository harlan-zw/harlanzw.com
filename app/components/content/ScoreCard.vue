<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  label: string
  before: number
  after: number
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
  <div class="rounded border-2 border-default bg-elevated p-5 text-highlighted shadow-sm">
    <div class="text-base text-muted">
      {{ label }}
    </div>
    <div class="flex items-center pt-1">
      <div class="text-2xl font-bold">
        {{ formattedAfter }}
      </div>
      <span v-if="isPositive" class="mx-2 flex items-center rounded-full bg-success/10 px-2 py-0.5 text-sm text-success">
        <UIcon name="i-lucide-trending-up" class="mr-1 size-4 opacity-70" aria-hidden="true" />
        <span>{{ percentage }}%</span>
      </span>
      <span v-else class="mx-2 flex items-center rounded-full bg-error/10 px-2 py-0.5 text-sm text-error">
        <UIcon name="i-lucide-trending-down" class="mr-1 size-4 opacity-70" aria-hidden="true" />
        <span>{{ percentage }}%</span>
      </span>
    </div>
  </div>
</template>
