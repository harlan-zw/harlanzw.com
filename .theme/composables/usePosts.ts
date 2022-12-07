import {useAsyncData} from "#app";
import {queryContent} from "#imports";
import {Post} from "../types";

export function groupBy<T extends {}>(values: T[], fn: (v: T) => any) {
  return values.reduce((rv, x) => {
    (rv[fn(x)] = rv[fn(x)] || []).push(x)
    return rv
  }, {})
}

export interface UsePostsOptions {
  limit: number
  offset: number | string
  category: string
  sort: string
}
export const usePosts = (options?: UsePostsOptions) => {
  return useAsyncData('content:post-partials', () => queryContent<Post>()
    .where({ _path: { $contains: '/blog/' } })
    .where({ _path: { $ne: '/blog/_dir' }  })
    .where({ _path: { $ne: '/blog' }  })
    .only(['_path', 'description', 'title', 'publishedAt', 'readingMins'])
    .sort({
      publishedAt: -1,
    })
    .limit(options?.limit || 10)
    .find(), {
    // group posts by the publish year
    transform: posts => groupBy(posts, p => new Date(p.publishedAt).getFullYear()),
  })
}
