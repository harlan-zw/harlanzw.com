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

describe('ci workflow secret pinning', () => {
  it('never hands a secret env to an unpinned pnpm dlx package', () => {
    const workflowPath = fileURLToPath(new URL('../../.github/workflows/ci.yml', import.meta.url))
    const workflow = parse(readFileSync(workflowPath, 'utf8')) as Workflow

    const offenders: string[] = []
    for (const [jobName, job] of Object.entries(workflow.jobs)) {
      for (const [index, step] of (job.steps ?? []).entries()) {
        const exposesSecret = Object.values(step.env ?? {})
          .some(env => env.includes('${{ secrets.'))
        if (exposesSecret && step.run?.includes('pnpm dlx '))
          offenders.push(`${jobName}.steps[${index}]: ${step.run}`)
      }
    }

    expect(offenders).toEqual([])
  })
})
