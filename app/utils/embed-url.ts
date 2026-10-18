export function resolveEmbedUrl(embed: string | undefined, theme: 'dark' | 'light') {
  if (!embed)
    return undefined

  const hashIndex = embed.indexOf('#')
  const pathAndQuery = hashIndex === -1 ? embed : embed.slice(0, hashIndex)
  const hash = hashIndex === -1 ? '' : embed.slice(hashIndex)
  const queryIndex = pathAndQuery.indexOf('?')
  const path = (queryIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, queryIndex)).replace(/\/index\.html$/, '/')
  const searchParams = new URLSearchParams(queryIndex === -1 ? '' : pathAndQuery.slice(queryIndex + 1))
  searchParams.set('present', '1')
  searchParams.set('theme', theme)

  return `${path}?${searchParams}${hash}`
}
