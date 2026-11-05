import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { canonicalSlashLocation } from '../utils/trailing-slash'

// Workers static assets answer a slash URL for a prerendered page with a 307.
// Pages the Worker renders, such as `/sponsors/`, reach this handler instead,
// and answered 200 before it. A 301 tells Google the bare URL is the one to keep.
export default defineEventHandler((event) => {
  if (import.meta.dev || (event.method !== 'GET' && event.method !== 'HEAD'))
    return
  const location = canonicalSlashLocation(getRequestURL(event))
  if (location)
    return sendRedirect(event, location, 301)
})
