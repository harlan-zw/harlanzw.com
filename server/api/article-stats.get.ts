import { consola } from 'consola'
import { parseArticleStats } from '../../shared/utils/article-stats'
import { publicArticleReading } from '../../shared/utils/public-agent-work'
import { lookupPublicAgentWork } from '../utils/public-agent-work'

export default defineCachedEventHandler(async (event) => {
  const { hogwildStatsToken, hogwildStatsUrl } = useRuntimeConfig(event)
  if (!hogwildStatsToken)
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })

  const upstream = await $fetch.raw<unknown>(hogwildStatsUrl, {
    headers: { authorization: `Bearer ${hogwildStatsToken}` },
    timeout: 5000,
    retry: 0,
    // Workers supports manual redirects. Never forward the token to another URL.
    redirect: 'manual',
  }).catch(() => {
    // Never log a request error containing the authorization header.
    consola.warn('Hogwild statistics could not be read.')
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })
  })
  if (!upstream.ok)
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })
  const stats = parseArticleStats(upstream._data, Date.now())
  if (stats._tag === 'Unavailable')
    throw createError({ statusCode: 503, statusMessage: 'Live statistics are unavailable.' })
  return publicArticleReading(stats, lookupPublicAgentWork)
}, {
  name: 'article-stats',
  getKey: () => 'summary',
  maxAge: 15,
  swr: false,
})
