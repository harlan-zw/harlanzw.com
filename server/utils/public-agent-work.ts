import { consola } from 'consola'
import { z } from 'zod'

const publicIssue = z.object({ title: z.string().max(1000), number: z.number().int().positive(), pull_request: z.object({}).optional() })

export const lookupPublicAgentWork = defineCachedFunction(async (repository: string, number: number) => {
  // No GitHub credential: inaccessible items must never enter the public response.
  const result = await $fetch<unknown>(`https://api.github.com/repos/${repository}/issues/${number}`, {
    headers: { 'accept': 'application/vnd.github+json', 'user-agent': 'harlanzw.com' },
    timeout: 4000,
    retry: 0,
    redirect: 'error',
  }).catch(() => {
    consola.info('A work reference is not available through public GitHub.')
    return null
  })
  const parsed = publicIssue.safeParse(result)
  if (!parsed.success || parsed.data.number !== number)
    return null
  return { title: parsed.data.title, url: `https://github.com/${repository}/${parsed.data.pull_request ? 'pull' : 'issues'}/${number}` }
}, { name: 'public-agent-work', getKey: (repository: string, number: number) => `${repository}:${number}`, maxAge: 900, swr: false })
