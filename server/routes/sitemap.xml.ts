import { SitemapStream, streamToPromise } from 'sitemap'
import { contentPaths } from '../util/content'
import { SiteUrl } from '~/logic'

export default defineEventHandler(async (event) => {
  const routes = await contentPaths(event)

  const sitemap = new SitemapStream({
    hostname: SiteUrl,
  })
  for (const url of routes) {
    sitemap.write({
      url,
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
