import type { MaybeRefOrGetter } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ref, toValue } from 'vue'
import { useContentPage } from '../../app/composables/useContentPage'

describe('useContentPage', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('queries the current path after client navigation', async () => {
    const queriedPaths: string[] = []
    const path = ref('/projects')
    let dataKey!: MaybeRefOrGetter<string>
    let query!: () => Promise<unknown>

    vi.stubGlobal('useAsyncData', (key: MaybeRefOrGetter<string>, handler: () => Promise<unknown>) => {
      dataKey = key
      query = handler
      return {}
    })
    vi.stubGlobal('queryCollection', () => ({
      path: (pagePath: string) => ({
        first: async () => {
          queriedPaths.push(pagePath)
          return { path: pagePath }
        },
      }),
    }))

    useContentPage(path)
    expect(toValue(dataKey)).toBe('page:/projects')
    await query()

    path.value = '/blog'
    expect(toValue(dataKey)).toBe('page:/blog')
    await query()

    expect(queriedPaths).toEqual(['/projects', '/blog'])
  })
})
