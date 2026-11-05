// `site.trailingSlash: false` makes the bare path canonical. Returns the bare
// location for a slash URL, or null when the URL is already canonical.
export function canonicalSlashLocation(url: URL): string | null {
  if (url.pathname === '/' || !url.pathname.endsWith('/'))
    return null
  return `${url.pathname.replace(/\/+$/u, '') || '/'}${url.search}`
}
