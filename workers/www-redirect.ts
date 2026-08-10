export function redirectToApex(request: Request) {
  const url = new URL(request.url)
  url.hostname = 'harlanzw.com'
  url.protocol = 'https:'

  return Response.redirect(url, 308)
}

export default {
  fetch: redirectToApex,
} satisfies ExportedHandler
