// @vitest-environment node
import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'
import { readCheckinArchive } from '../../shared/checkin-archive'
import { externalCheckin } from '../../shared/checkin-external'

const run = promisify(execFile)
const repoRoot = fileURLToPath(new URL('../..', import.meta.url))
const cli = resolve(repoRoot, 'node_modules/@harlan-zw/nuxt-checkin/dist/cli/index.mjs')

async function saveArchive(severity: 'pass' | 'warn') {
  const root = await mkdtemp(join(tmpdir(), 'checkin-archive-'))
  const saveDir = join(root, 'durable-evidence')
  const workspace = join(root, 'worktree')
  await mkdir(workspace)
  const artifact = [
    `import { defineCheck, pass, warn } from ${JSON.stringify(resolve(repoRoot, 'node_modules/@harlan-zw/nuxt-checkin/dist/runtime/external/index.js'))}`,
    `export default [defineCheck({ id: 'fixture.ok', run: () => ${severity === 'warn' ? 'warn(\'fixture warning\', {})' : 'pass({})'} })]`,
    `export const options = ${JSON.stringify({ save: externalCheckin.save })}`,
    '',
  ].join('\n')
  const artifactPath = join(root, 'artifact.mjs')
  await writeFile(artifactPath, artifact)
  try {
    const collection = run('node', [cli, '--save', '--artifact', artifactPath], { cwd: workspace, env: { ...process.env, DAILY_CHECKIN_DIR: saveDir } })
    if (severity === 'warn')
      await expect(collection).rejects.toMatchObject({ code: 1 })
    else
      await collection
    await rm(workspace, { recursive: true })
    const archive = await readCheckinArchive(saveDir)
    expect(archive.reports).toHaveLength(1)
    const saved = archive.reports[0]!
    expect(saved.report).toMatchObject({ severity, coverage: 'complete' })
    expect(archive.state?.lastRunAt).toBe(saved.report.observedAt)
    return saved.name
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
}

it('reads saved reports and state from an evidence directory', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'checkin-archive-read-'))
  try {
    const report = { severity: 'pass', coverage: 'complete', observedAt: '2026-10-08T08:00:00.000Z' }
    await writeFile(join(dir, '2026-10-08T08-00-00-000Z-d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5.json'), JSON.stringify(report))
    await writeFile(join(dir, 'state.json'), JSON.stringify({ lastRunAt: report.observedAt }))

    const archive = await readCheckinArchive(dir)

    expect(archive.reports).toEqual([{ name: '2026-10-08T08-00-00-000Z-d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5.json', report }])
    expect(archive.state).toEqual({ lastRunAt: report.observedAt })
  }
  finally {
    await rm(dir, { recursive: true, force: true })
  }
})

it('returns no state before the first save', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'checkin-archive-empty-'))
  try {
    await writeFile(join(dir, '2026-10-08T08-00-00-000Z-d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5.json'), JSON.stringify({ severity: 'pass' }))

    const archive = await readCheckinArchive(dir)

    expect(archive.reports).toHaveLength(1)
    expect(archive.reports[0]?.name).toBe('2026-10-08T08-00-00-000Z-d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5.json')
    expect(archive.state).toBe(null)
  }
  finally {
    await rm(dir, { recursive: true, force: true })
  }
})

it.each(['pass', 'warn'] as const)('archives complete %s evidence outside a disposable worktree', async (severity) => {
  const archiveName = await saveArchive(severity)
  expect(archiveName).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z-[0-9a-f-]{36}\.json$/)
})
