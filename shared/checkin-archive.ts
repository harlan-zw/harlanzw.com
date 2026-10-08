import type { CheckReport } from '@harlan-zw/nuxt-checkin/external'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { externalCheckin } from './checkin-external'

export interface ArchivedCheckinReport {
  name: string
  report: CheckReport
}

export interface CheckinArchive {
  reports: ArchivedCheckinReport[]
  state: Record<string, unknown> | null
}

export async function readCheckinArchive(dir: string): Promise<CheckinArchive> {
  const stateName = externalCheckin.save.stateFile
  const names = await readdir(dir)
  const reportNames = names.filter(name => name !== stateName).sort()
  const reports = await Promise.all(reportNames.map(async (name) => {
    const report = JSON.parse(await readFile(join(dir, name), 'utf8')) as CheckReport
    return { name, report }
  }))
  const stateText = stateName && names.includes(stateName)
    ? await readFile(join(dir, stateName), 'utf8')
    : null
  return {
    reports,
    state: stateText === null ? null : JSON.parse(stateText) as Record<string, unknown>,
  }
}
