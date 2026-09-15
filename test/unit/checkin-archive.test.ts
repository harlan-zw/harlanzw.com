// @vitest-environment node
import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'
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
    const files = (await readdir(saveDir)).filter(name => name !== 'state.json')
    expect(files).toHaveLength(1)
    const archive = JSON.parse(await readFile(join(saveDir, files[0]!), 'utf8'))
    expect(archive).toMatchObject({ severity, coverage: 'complete' })
    const state = JSON.parse(await readFile(join(saveDir, 'state.json'), 'utf8'))
    expect(state.lastRunAt).toBe(archive.observedAt)
    return files[0]!
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
}

it.each(['pass', 'warn'] as const)('archives complete %s evidence outside a disposable worktree', async (severity) => {
  const archiveName = await saveArchive(severity)
  expect(archiveName).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z-[0-9a-f-]{36}\.json$/)
})
