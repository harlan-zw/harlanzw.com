import { defineHandler, getRequestURL, setResponseHeader, setResponseStatus } from 'h3'

export default defineHandler((event) => {
  if (getRequestURL(event).pathname !== '/experimental')
    return

  setResponseStatus(event, 200, 'OK')
  setResponseHeader(event, 'content-type', 'text/html;charset=utf-8')
  setResponseHeader(event, 'x-powered-by', 'Nuxt')
  setResponseHeader(event, 'x-robots-tag', 'noindex, nofollow')
})
