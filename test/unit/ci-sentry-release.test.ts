import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'

interface WorkflowStep {
  run?: string
}

interface WorkflowJob {
  steps?: WorkflowStep[]
}

interface Workflow {
  jobs: Record<string, WorkflowJob>
}

describe('ci workflow sentry release', () => {
  it('creates the release before finalizing it', () => {
    const workflowPath = fileURLToPath(new URL('../../.github/workflows/ci.yml', import.meta.url))
    const workflow = parse(readFileSync(workflowPath, 'utf8')) as Workflow

    const commands = (workflow.jobs.deploy.steps ?? [])
      .flatMap(step => (step.run ?? '').split('\n'))
      .map(line => line.trim())
    const createIndex = commands.findIndex(command => command.includes('sentry-cli releases new "$GITHUB_SHA"'))
    const finalizeIndex = commands.findIndex(command => command.includes('sentry-cli releases finalize "$GITHUB_SHA"'))

    expect(createIndex).toBeGreaterThanOrEqual(0)
    expect(finalizeIndex).toBeGreaterThan(createIndex)
  })
})
