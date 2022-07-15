import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const posts = await serverQueryContent(event, 'posts').find()
  const pages = await serverQueryContent(event, 'pages').find()
  const routes = [...posts, ...pages]
  const sitemap = new SitemapStream({
    hostname: 'https://harlanzw.com',
  })
  for (const doc of routes) {
    sitemap.write({
      url: doc._path,
      changefreq: 'monthly',
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
