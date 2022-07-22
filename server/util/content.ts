import { serverQueryContent } from '#content/server'

export async function contentPaths(event) {
  const content = await Promise.all([
    serverQueryContent(event, 'posts').find(),
    serverQueryContent(event, 'pages').find(),
  ])

  return content.flat().map(c => c.path)
}
