export interface BreadcrumbLink {
  _tag: 'Link'
  id: string
  label: string
  to: string
}

export interface CurrentBreadcrumb {
  _tag: 'Current'
  id: string
  label: string
}

export type BreadcrumbItem = BreadcrumbLink | CurrentBreadcrumb

export function getBreadcrumbs(path: string): BreadcrumbItem[] {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment, index, segments): BreadcrumbItem => {
      const to = `/${segments.slice(0, index + 1).join('/')}`
      const item = {
        id: to,
        label: segment.replaceAll('-', ' '),
      }

      if (index === segments.length - 1) {
        return {
          _tag: 'Current',
          ...item,
        }
      }

      return {
        _tag: 'Link',
        ...item,
        to,
      }
    })
}
