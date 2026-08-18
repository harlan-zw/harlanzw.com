import type { SitePage } from './types'

// The package base item declares only the fields every site shares. This site
// adds its own front matter, so the pages collection is declared here.
declare module '@harlan-zw/comark-content' {
  interface PageCollections {
    pages: SitePage
  }
}

export {}
