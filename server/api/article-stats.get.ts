import { consola } from 'consola'
import { parseArticleStats } from '../../shared/utils/article-stats'

export default defineCachedEventHandler(async (event) => {
  const { hogwildStatsToken, hogwildStatsUrl } = useRuntimeConfig(event)
  if (!hogwildStatsToken)
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })

  const upstream = await $fetch<unknown>(hogwildStatsUrl, {
    headers: { authorization: `Bearer ${hogwildStatsToken}` },
    timeout: 5000,
    retry: 0,
    redirect: 'error',
  }).catch(() => {
    // Never log a request error containing the authorization header.
    consola.warn('Hogwild statistics could not be read.')
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })
  })
  const stats = parseArticleStats(upstream, Date.now())
  if (stats._tag === 'Unavailable')
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })
  return stats
}, {
  name: 'article-stats',
  getKey: () => 'summary',
  maxAge: 15,
  swr: false,
})
