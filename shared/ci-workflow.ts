import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

export interface WorkflowStep {
  run?: string
  env?: Record<string, string>
}

export interface WorkflowJob {
  steps?: WorkflowStep[]
}

export interface CiWorkflow {
  jobs: Record<string, WorkflowJob>
}

export function readCiWorkflow(): CiWorkflow {
  const workflowPath = fileURLToPath(new URL('../.github/workflows/ci.yml', import.meta.url))
  return parse(readFileSync(workflowPath, 'utf8')) as CiWorkflow
}

export function deployRunCommands(workflow: CiWorkflow): string[] {
  return (workflow.jobs.deploy?.steps ?? [])
    .flatMap(step => (step.run ?? '').split('\n'))
    .map(line => line.trim())
    .filter(line => line !== '')
}

export function secretExposedDlxOffenders(workflow: CiWorkflow): string[] {
  const offenders: string[] = []
  for (const [jobName, job] of Object.entries(workflow.jobs)) {
    for (const [index, step] of (job.steps ?? []).entries()) {
      const exposesSecret = Object.values(step.env ?? {})
        .some(env => env.includes('${{ secrets.'))
      if (exposesSecret && step.run?.includes('pnpm dlx '))
        offenders.push(`${jobName}.steps[${index}]: ${step.run}`)
    }
  }
  return offenders
}
