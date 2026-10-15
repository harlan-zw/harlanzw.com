import { describe, expect, it } from 'vitest'
import { resolveEmbedUrl } from '../../app/utils/embed-url'

describe('resolveEmbedUrl', () => {
  it('opens an embedded directory at its canonical path', () => {
    expect(resolveEmbedUrl('/blog/ai-workflow/factory/index.html', 'light')).toBe('/blog/ai-workflow/factory/?present=1&theme=light')
  })

  it('keeps existing query parameters and fragments', () => {
    expect(resolveEmbedUrl('/diagram/index.html?view=full#overview', 'dark')).toBe('/diagram/?view=full&present=1&theme=dark#overview')
  })
})
