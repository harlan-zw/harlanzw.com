import type { H3Event } from 'h3'
import { queryCollection } from '@harlan-zw/comark-content/server'
import { defineCheck, fail, pass, unavailable } from '@harlan-zw/nuxt-checkin/server'

export default defineCheck<H3Event>({
  id: 'content.published',
  async run(context) {
    if (!context.event)
      return unavailable('The content check requires a server event.')
    const event = context.event
    const posts = await context.collect(event, 'content.published', async () => ({
      value: await queryCollection(event, 'pages').where('path', 'LIKE', '/blog/%').where('status', '=', 'published').all(),
      metrics: { requests: 1 },
    }))
    if (!posts.length)
      return fail('The published writing archive is empty.')
    const invalid = posts.filter(post => !post.title || !post.path || !post.publishedAt || !Number.isFinite(Date.parse(post.publishedAt)))
    if (invalid.length)
      return fail('Published articles lack feed metadata.', { articles: posts.length, invalid: invalid.length })
    return pass({ articles: posts.length })
  },
})
