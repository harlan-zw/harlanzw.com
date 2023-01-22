<script setup lang="ts">
const props = defineProps({
  path: String,
  title: String,
  description: String,
  totalStars: Number
})
const containerStyles = {
  padding: '0 60px',
  backgroundImage: 'linear-gradient(to bottom right, #111827, #0E262C)',
}

const initialStyles = {
  background: 'linear-gradient(90deg, rgb(17, 153, 142), rgb(56, 239, 125) 75%)',
  'background-clip': 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent',
  fontSize: '45px',
}
</script>

<template>
<div :style="containerStyles" class="w-full h-full flex flex-col items-center justify-center text-white relative">
  <div class="px-10 mb-10">
    <div :style="{ fontSize: '70px' }" class="bold mb-10 flex flex-row justify-between items-center">
      {{ title }}
    </div>
    <div :style="{ fontSize: '50px' }" class="flex flex-row mb-10">⭐ {{ totalStars }} Stars</div>
    <p :style="{ fontSize: '30px', lineHeight: '1.5em' }" class="text-gray-300" v-html="description"></p>
  </div>
  <div class="flex items-center flex-row absolute left-20 bottom-10" :style="{ width: '1000px' }">
    <img src="/harlan-wilton.jpeg" width="60" height="60" class="rounded-xl mr-5">
    <div class="flex text-gray-700 flex-col">
      <span class="text-green-700 font-bold" :style="initialStyles">Harlan Wilton</span>
    </div>
  </div>
</div>
</template>
