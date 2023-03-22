<script setup lang="ts">
import { highlight } from '../../composables/shiki'

const props = defineProps({
  code: String,
})
const containerStyles = {

}

const initialStyles = {
  background: 'linear-gradient(90deg, rgb(17, 153, 142), rgb(56, 239, 125) 75%)',
  'background-clip': 'text',
  '-webkit-background-clip': 'text',
  color: 'transparent',
  fontSize: '45px',
}
const container = {
  style: {
    padding: '0 60px',
    backgroundImage: 'linear-gradient(to bottom right, #111827, #0E262C)',
  },
  class: 'w-full h-full flex text-white items-center'
}

const code = `<template>
<div v-bind="container">
    <div class="p-3">
   <pre class="p-3" v-html="highlight(code, 'vue')" />
   </div>
  <div :style="initialStyles">
    <div class="text-center">
      <div class="text-4xl font-bold">Vue 3</div>
      <div class="text-2xl">Composition API</div>
    </div>
  </div>
</div>
</template>
`

const codeWrap = {
  style: 'background-color: #121212',
  class: 'p-3 rounded text-xl'
}
</script>

<template>
<div v-bind="container">
  <div v-bind="codeWrap">
  <pre v-html="highlight(code, 'vue')" />
  </div>
  <div :style="initialStyles">
      <div class="text-4xl font-bold">Vue 3</div>
      <div class="text-2xl">Composition API</div>
  </div>
</div>
</template>
