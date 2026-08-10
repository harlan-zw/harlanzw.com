import type { SitePage } from '#shared/types'

export type ContentPageResult
  = | { _tag: 'Ok', page: SitePage, styles: string[] }
    | { _tag: 'NotFound', path: string }

type QueryPage = (path: string) => Promise<SitePage | null>

const removedStyle = Symbol('removedStyle')

function normalizeContentNode(value: unknown, styles: string[]): unknown | typeof removedStyle {
  if (!Array.isArray(value))
    return value

  if (value[0] === 'style' && typeof value[2] === 'string' && value[2].includes('html pre.shiki')) {
    styles.push(value[2])
    return removedStyle
  }

  return value
    .map(child => normalizeContentNode(child, styles))
    .filter(child => child !== removedStyle)
}

function normalizeContentPage(page: SitePage): Extract<ContentPageResult, { _tag: 'Ok' }> {
  const styles: string[] = []
  return {
    _tag: 'Ok',
    styles,
    page: {
      ...page,
      body: {
        ...page.body,
        value: normalizeContentNode(page.body.value, styles) as SitePage['body']['value'],
      },
    },
  }
}

export async function resolveContentPage(path: string, queryPage: QueryPage): Promise<ContentPageResult> {
  const page = await queryPage(path)
  return page
    ? normalizeContentPage(page)
    : { _tag: 'NotFound', path }
}
