import { describe, expect, it } from 'vitest'
import { deployRunCommands, readCiWorkflow } from '../../shared/ci-workflow'

describe('deployRunCommands', () => {
  it('splits each deploy step run into trimmed commands', () => {
    const workflow = {
      jobs: {
        deploy: {
          steps: [
            { run: '  pnpm build\n\n  pnpm cf:types:check ' },
            { name: 'checkout', uses: 'actions/checkout@v1' },
          ],
        },
      },
    }

    expect(deployRunCommands(workflow)).toEqual(['pnpm build', 'pnpm cf:types:check'])
  })

  it('returns no commands when the workflow has no deploy job', () => {
    expect(deployRunCommands({ jobs: { validate: { steps: [{ run: 'pnpm lint' }] } } })).toEqual([])
  })
})

describe('ci workflow sentry release', () => {
  it('creates the release before finalizing it', () => {
    const commands = deployRunCommands(readCiWorkflow())

    const createIndex = commands.findIndex(command => command.includes('sentry-cli releases new "$GITHUB_SHA"'))
    const finalizeIndex = commands.findIndex(command => command.includes('sentry-cli releases finalize "$GITHUB_SHA"'))

    expect(createIndex).toBeGreaterThanOrEqual(0)
    expect(finalizeIndex).toBeGreaterThan(createIndex)
  })
})
