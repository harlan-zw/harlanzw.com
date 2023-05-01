<script setup lang="ts">
const props = defineProps({
  path: String,
  title: String,
  description: String,
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
<div :style="containerStyles" class="w-full h-full flex flex-row text-white relative">
  <Icon name="logos:nuxt-icon" style="height: 504px; width: 768px; left: 70px; top: 30px; position: absolute; opacity: 0.1;" />
  <div class="py-10 px-10">
    <div :style="{ fontSize: '70px' }" class="mt-10 font-bold mb-10 flex flex-row justify-between items-center">
      {{ title }}
    </div>
    <p :style="{ fontSize: '30px', lineHeight: '1.5em' }" class="text-gray-300" v-html="description"></p>
  </div>
  <div class="flex items-center flex-row absolute left-20 bottom-20" :style="{ width: '1000px', left: '100px'}">
    <img src="/harlan-wilton.jpeg" width="60" height="60" class="rounded-xl mr-5">
    <div class="flex text-gray-700 flex-col">
      <span class="text-green-700 font-bold" :style="initialStyles">Harlan Wilton</span>
    </div>
  </div>
</div>
</template>
