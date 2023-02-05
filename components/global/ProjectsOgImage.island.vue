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
<div :style="containerStyles" class="w-full h-full flex text-white items-center relative">
  <div class="pr-10" style="width: 700px;">
    <div :style="{ fontSize: '70px', fontWeight: '900' }" class="font-bolder mb-10 flex flex-row justify-between items-center">
      {{ title }}
    </div>
    <p :style="{ fontSize: '30px', lineHeight: '1.5em' }" class="text-gray-300 mb-10" v-html="description"></p>
    <div :style="{ fontSize: '50px' }" class="flex flex-row">⭐ {{ totalStars }} Stars</div>
  </div>
  <div class="items-center justify-center" style="width: 350px;">
    <img src="/harlan-wilton.jpeg" width="350" height="350" class="rounded-xl mb-10">
    <div class="text-green-700 font-bold justify-center items-center flex" :style="initialStyles">Harlan Wilton</div>
  </div>
</div>
</template>
