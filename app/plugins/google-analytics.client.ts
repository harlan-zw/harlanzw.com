import { defineNuxtPlugin, useHead } from '#app'

const measurementId = 'G-RR3TC7H6R6'

export default defineNuxtPlugin(() => {
  if (window.location.hostname !== 'harlanzw.com')
    return

  const tagWindow: Window & { dataLayer?: unknown[] } = window
  const dataLayer = tagWindow.dataLayer ??= []

  function googleTag(..._command: unknown[]) {
    // eslint-disable-next-line prefer-rest-params -- The Google tag queues commands as Arguments objects.
    dataLayer.push(arguments)
  }

  googleTag('js', new Date())
  googleTag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  useHead({
    script: [{
      key: 'google-analytics',
      src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
      async: true,
    }],
  })
})
