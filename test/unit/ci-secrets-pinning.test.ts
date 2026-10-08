import { describe, expect, it } from 'vitest'
import { readCiWorkflow, secretExposedDlxOffenders } from '../../shared/ci-workflow'

describe('secretExposedDlxOffenders', () => {
  it('labels steps that hand a secret env to pnpm dlx', () => {
    const workflow = {
      jobs: {
        deploy: {
          steps: [
            { run: 'pnpm dlx secret-tool', env: { TOKEN: '${{ secrets.TOKEN' } },
            { run: 'pnpm dlx safe-tool', env: { TOKEN: 'literal' } },
            { run: 'pnpm exec safe-tool', env: { TOKEN: '${{ secrets.TOKEN' } },
          ],
        },
      },
    }

    expect(secretExposedDlxOffenders(workflow)).toEqual(['deploy.steps[0]: pnpm dlx secret-tool'])
  })

  it('returns no offenders when jobs have no steps', () => {
    expect(secretExposedDlxOffenders({ jobs: { deploy: {} } })).toEqual([])
  })
})

describe('ci workflow secret pinning', () => {
  it('never hands a secret env to an unpinned pnpm dlx package', () => {
    expect(secretExposedDlxOffenders(readCiWorkflow())).toEqual([])
  })
})
