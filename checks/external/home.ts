import { defineHttpCheck } from '@harlan-zw/nuxt-checkin/external'

export default defineHttpCheck({
  id: 'site.front-door',
  url: 'https://harlanzw.com/',
  status: 200,
})
