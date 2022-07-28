import { Feed } from 'feed'
import * as cheerio from 'cheerio'
import { serverQueryContent } from '#content/server'

export async function generateBlogFeed(event) {
  // Grab theme configuration
  const theme = await $fetch('/api/_theme/options')

  // Fetch all documents
  const feed = new Feed({
    title: `${theme.site.tagLine} | ${theme.site.name}`,
    description: theme.site.description,
    id: theme.site.url,
    link: theme.site.url,
    language: theme.site.language,
    image: `${theme.site.url}/cover.png`,
    favicon: `${theme.site.url}/favicon.ico`,
    copyright: `Copyright (c) 2022-present, ${theme.site.name}`,
    feedLinks: {
      json: `${theme.site.url}/feed.json`,
      atom: `${theme.site.url}/feed.atom`,
      rss: `${theme.site.url}/feed.xml`,
    },
  })

  const posts = await serverQueryContent(event, 'posts').find()

  for (const post of posts) {
    const path = post._path.replace('posts', 'blog')
    // this will return the SSR content of the post
    const content = await $fetch<string>(path)
    let $ = cheerio.load(content)
    const prose = $('.prose').html()
    $ = cheerio.load(prose)
    // remove all attributes from all elements
    $('*').each(function () {
      this.attribs = {}
    })
    const item = {
      title: post.title,
      id: `${theme.site.url}${path}`,
      link: `${theme.site.url}${path}`,
      description: post.description,
      content: $('body').html(),
      image: post.image,
      author: [
        {
          name: theme.site.name,
          link: theme.site.sameAs[0],
        },
      ],
      date: new Date(post.publishedAt),
    }
    feed.addItem(item)
  }

  return feed
}
