export default defineEventHandler((event) => {
  if (getRequestURL(event).pathname !== '/experimental')
    return

  setResponseStatus(event, 200, 'OK')
  setResponseHeader(event, 'content-type', 'text/html;charset=utf-8')
  setResponseHeader(event, 'x-powered-by', 'Nuxt')
  setResponseHeader(event, 'x-robots-tag', 'noindex, nofollow')
})
