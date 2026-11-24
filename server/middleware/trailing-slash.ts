import { defineHandler, redirect } from 'h3'
import { canonicalSlashLocation } from '../utils/trailing-slash'

// Workers static assets answer a slash URL for a prerendered page with a 307.
// Pages the Worker renders, such as `/sponsors/`, reach this handler instead,
// and answered 200 before it. A 301 tells Google the bare URL is the one to keep.
export default defineHandler((event) => {
  if (import.meta.dev || (event.req.method !== 'GET' && event.req.method !== 'HEAD'))
    return
  const location = canonicalSlashLocation(event.url)
  if (location)
    return redirect(location, 301)
})
