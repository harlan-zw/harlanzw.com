import { appendHeader, defineHandler } from 'h3'
import { generateBlogFeed } from '../utils/rss'

export default defineHandler(async (event) => {
  const feed = await generateBlogFeed(event)
  appendHeader(event, 'Content-Type', 'application/atom')
  return feed.atom1()
})
