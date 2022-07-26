import { serverQueryContent } from '#content/server'

export async function contentPaths(event) {
  const content = await Promise.all([
    serverQueryContent(event, 'pages').find(),
    serverQueryContent(event, 'posts').find(),
  ])

  return content.flat().map(c => c.path)
}
