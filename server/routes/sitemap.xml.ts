import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const posts = await serverQueryContent(event, 'posts').find()
  const pages = await serverQueryContent(event, 'pages').find()
  const routes = [...pages, { _path: '/projects' }, { _path: '/blog' }, ...posts]

  const sitemap = new SitemapStream({
    hostname: 'https://harlanzw.com',
  })
  for (const doc of routes) {
    sitemap.write({
      url: doc._path
        .replace('/pages/home', '/')
        .replace('/pages', '')
        .replace('/posts', '/blog'),
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
