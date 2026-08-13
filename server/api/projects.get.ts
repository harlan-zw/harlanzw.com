import type { Project, ProjectCategory, ProjectSource, ProjectSourceCategory, ProjectsResult } from '#shared/types'
import projectSource from '../data/projects.json' with { type: 'json' }
import { consola } from 'consola'
import { z } from 'zod'

const githubRepoSchema = z.object({
  repo: z.object({
    description: z.string().nullable(),
    stars: z.number().int().nonnegative(),
  }),
})

type EnrichedProject
  = | { _tag: 'Ok', project: Project }
    | { _tag: 'Err', project: Project, repo: string, reason: string }

async function enrichProject(source: ProjectSource): Promise<EnrichedProject> {
  const response = await $fetch<unknown>(`https://ungh.cc/repos/${source.repo}`)
    .then(value => ({ _tag: 'Ok' as const, value }))
    .catch((error: unknown) => ({
      _tag: 'Err' as const,
      reason: error instanceof Error ? error.message : String(error),
    }))

  if (response._tag === 'Err') {
    return {
      _tag: 'Err',
      repo: source.repo,
      reason: response.reason,
      project: { ...source, description: 'GitHub metadata temporarily unavailable.', stars: 0 },
    }
  }

  const parsed = githubRepoSchema.safeParse(response.value)
  if (!parsed.success) {
    return {
      _tag: 'Err',
      repo: source.repo,
      reason: z.prettifyError(parsed.error),
      project: { ...source, description: 'GitHub metadata temporarily unavailable.', stars: 0 },
    }
  }

  return {
    _tag: 'Ok',
    project: {
      ...source,
      description: parsed.data.repo.description || 'No description provided.',
      stars: parsed.data.repo.stars,
    },
  }
}

export default defineCachedEventHandler(async (): Promise<ProjectsResult> => {
  const source = projectSource.body as ProjectSourceCategory[]
  const sourceProjects = source.flatMap(category => category.projects)
  const enrichedProjects = await Promise.all(sourceProjects.map(enrichProject))
  const failed = enrichedProjects.filter((result): result is Extract<EnrichedProject, { _tag: 'Err' }> => result._tag === 'Err')
  const projectByRepo = new Map(enrichedProjects.map(result => [result.project.repo, result.project]))
  const categories: ProjectCategory[] = source.map(category => ({
    ...category,
    projects: category.projects.map((project): Project => projectByRepo.get(project.repo) ?? {
      ...project,
      description: 'GitHub metadata temporarily unavailable.',
      stars: 0,
    }),
  }))
  const totalStars = categories.flatMap(category => category.projects).reduce((total, project) => total + project.stars, 0)

  if (failed.length) {
    consola.warn('Project metadata degraded', failed.map(({ repo, reason }) => ({ repo, reason })))
    return { _tag: 'Degraded', categories, totalStars, failedRepos: failed.map(result => result.repo) }
  }

  return { _tag: 'Ok', categories, totalStars }
}, {
  maxAge: 60 * 60,
  name: 'projects',
})
