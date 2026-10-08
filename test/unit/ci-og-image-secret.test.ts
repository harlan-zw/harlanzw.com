import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'

interface WorkflowStep {
  run?: string
  env?: Record<string, string>
}

interface WorkflowJob {
  steps?: WorkflowStep[]
}

interface Workflow {
  jobs: Record<string, WorkflowJob>
}

function readDeploySteps() {
  const workflowPath = fileURLToPath(new URL('../../.github/workflows/ci.yml', import.meta.url))
  const workflow = parse(readFileSync(workflowPath, 'utf8')) as Workflow
  return workflow.jobs.deploy.steps ?? []
}

describe('ci workflow og image signing secret', () => {
  it('builds the deploy with the stable signing secret', () => {
    const buildStep = readDeploySteps().find(step => step.run === 'pnpm build')

    expect(buildStep?.env?.NUXT_OG_IMAGE_SECRET).toContain('${{ secrets.NUXT_OG_IMAGE_SECRET')
  })

  it('uploads the signing secret as a Worker binding without requiring it', () => {
    const prepStep = readDeploySteps().find(step => step.run?.includes('worker-secrets.json'))

    expect(prepStep?.env?.NUXT_OG_IMAGE_SECRET).toContain('${{ secrets.NUXT_OG_IMAGE_SECRET')
    expect(prepStep?.run).toContain('$NUXT_OG_IMAGE_SECRET')
    expect(prepStep?.run).not.toContain('test -n "$NUXT_OG_IMAGE_SECRET"')
  })
})
