import { normalizeContentPath } from '~/utils/content-page'

export default defineNuxtRouteMiddleware(async (to) => {
  if (normalizeContentPath(to.path) === '/experimental')
    return

  const { data } = await useContentPage(to.path)
  if (data.value?._tag === 'NotFound') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    })
  }
})
