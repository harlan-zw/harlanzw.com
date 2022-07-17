import { Feed } from 'feed'
import { appendHeader } from 'h3'
import { serverQueryContent } from '#content/server'
import { SiteAuthor, SiteLanguage, SiteUrl, TagLine } from '~/logic'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const feed = new Feed({
    title: `${TagLine} | ${SiteAuthor}`,
    description: 'Hey I&#39;m building Laravel &amp; Vue projects and would like to share my journey with you.',
    id: SiteUrl,
    link: SiteUrl,
    language: SiteLanguage,
    image: `${SiteUrl}/cover.png`,
    favicon: `${SiteUrl}/favicon.ico`,
    copyright: `Copyright (c) 2022-present, ${SiteAuthor}`,
    feedLinks: {
      json: 'https://antfu.me/feed.json',
      atom: 'https://antfu.me/feed.atom',
      rss: 'https://antfu.me/feed.xml',
    },
  })

  const posts = await serverQueryContent(event, 'posts').find()

  posts.forEach((post) => {
    const item = {
      title: post.title,
      id: `${SiteUrl}${post.url}`,
      link: `${SiteUrl}${post.url}`,
      description: '',
      content: '<div>Hi</div>',
      image: post.image,
      author: [
        {
          name: SiteAuthor,
          link: 'https://twitter.com/harlan_zw',
        },
      ],
      date: new Date(post.publishedAt),
    }
    feed.addItem(item)
  })

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
