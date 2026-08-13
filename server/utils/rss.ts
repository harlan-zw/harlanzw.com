import type { H3Event } from 'h3'
import { queryCollection } from '@harlan-zw/comark-content/server'
import { load } from 'cheerio'
import { Feed } from 'feed'
import { site } from '#shared/site'

export async function generateBlogFeed(event: H3Event): Promise<Feed> {
  const feed = new Feed({
    title: `${site.tagline} | ${site.name}`,
    description: site.description,
    id: site.url,
    link: site.url,
    language: site.language,
    image: `${site.url}${site.image}`,
    favicon: `${site.url}/favicon.ico`,
    copyright: `Copyright © 2022 to present, ${site.name}`,
    feedLinks: {
      json: `${site.url}/feed.json`,
      atom: `${site.url}/feed.atom`,
      rss: `${site.url}/feed.xml`,
    },
  })

  const posts = await queryCollection(event, 'pages')
    .where('path', 'LIKE', '/blog/%')
    .where('status', '=', 'published')
    .order('publishedAt', 'DESC')
    .all()

  for (const post of posts) {
    if (!post.publishedAt)
      continue

    const html = await event.$fetch<string>(post.path)
    const page = load(html)
    const content = load(page('.prose').html() ?? '')
    content('*').each(function removeAttributes() {
      if ('attribs' in this)
        this.attribs = {}
    })

    feed.addItem({
      title: post.title,
      id: `${site.url}${post.path}`,
      link: `${site.url}${post.path}`,
      description: post.description,
      content: content('body').html() ?? '',
      image: post.image,
      author: [{ name: site.name, link: site.sameAs[0] }],
      date: new Date(post.publishedAt),
    })
  }

  return feed
}
