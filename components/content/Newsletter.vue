<template>
<div class="mt-12">
  <div class="relative bg-white border border-gray-200 rounded-lg px-4 py-6 overflow-hidden sm:px-6 sm:py-8 lg:p-12 xl:p-16">
    <h2 class="text-2xl font-semibold font-display text-gray-900 sm:text-3xl" style="margin-top: 0 !important;">Keep up to date</h2>
    <p class="mt-2 max-w-2xl text-base text-gray-500">
      I'll be posting new articles every couple of weeks about what I'm working on. Sign up for below and I'll email you when I post something new.
    </p>
    <form v-if="!success" class="mt-6" @submit.prevent="submit($event)" :action="postUrl" method="POST">
      <div class="sm:flex">
        <input v-model="email" type="email" autocomplete="email" required="" placeholder="Enter your email" class="block sm:max-w-xs w-full px-4 py-3 text-base appearance-none border border-gray-300 shadow-none bg-white rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
        <button class="mt-4 relative sm:mt-0 sm:h-auto sm:ml-4 block w-full sm:w-auto border border-transparent px-6 py-3 text-base font-semibold leading-snug bg-green-700 text-white rounded-md shadow-md hover:bg-green-900 focus:outline-none focus:bg-green-900 transition ease-in-out duration-150" :class="{ 'opacity-50 pointer-events-none': submitting, 'hover:bg-green-600': !submitting }" :disabled="submitting">
          <span :class="{ 'opacity-0': submitting }">Subscribe</span>
          <span style="" v-show="true" class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0" :class="{ 'opacity-0': !submitting }">
              <svg class="h-8 w-8 spin" viewBox="0 0 24 24">
                <path class="text-gray-600" fill="currentColor" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"></path>
                <path class="text-gray-400" fill="currentColor" d="M12 3a9 9 0 010 18v-2a7 7 0 000-14V3z"></path>
              </svg>
            </span>
        </button>
      </div>
      <p class="text-sm text-gray-400">Your email will be stored with <a class="text-green-400" href="https://emailoctopus.com/legal/privacy" target="_blank">EmailOctopus</a>. You can unsubscribe at any time.</p>
    </form>
    <p v-else class="mt-4">Thanks for signing up :)</p>
  </div>
</div>
</template>

<script lang="ts">
import { inject, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      analytics: inject('analytics'),
    }
  },
  data () {
    return {
      email: '',
      submitting: false,
      success: false,
      postUrl: 'https://hooks.zapier.com/hooks/catch/3750603/ocopz6c'
    }
  },
  methods: {
    async submit (e) {
      if (this.submitting) {
        return
      }

      this.submitting = true

      const formData = new FormData()
      formData.append('email',  this.email)

      await fetch(e.target.action, {
        method: 'post',
        body: formData
      })

      // track subscriptions
      this.analytics.track('SubscribedNewsletter');

      this.submitting = false
      this.email = ''
      this.success = true
    }
  }
})
</script>
