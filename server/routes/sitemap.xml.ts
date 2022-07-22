import { SitemapStream, streamToPromise } from 'sitemap'
import { contentPaths } from '../util/content'
import { SiteUrl } from '~/logic'

export default defineEventHandler(async (event) => {
  const routes = await contentPaths(event)

  const sitemap = new SitemapStream({
    hostname: SiteUrl,
  })
  for (const doc of routes) {
    sitemap.write({
      url: doc.path,
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
