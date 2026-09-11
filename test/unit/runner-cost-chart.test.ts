import { expect, it } from 'vitest'
import { runnerCostChart } from '../../shared/utils/runner-cost-chart'

it('accumulates recorded minutes in date order without inventing missing days', () => {
  const points = runnerCostChart([
    { date: '2026-09-11', billableMinutes: 4, completed: 2 },
    { date: '2026-09-09', billableMinutes: 2, completed: 1 },
  ])
  expect(points.map(point => point.date)).toEqual(['2026-09-09', '2026-09-11'])
  expect(points[0]!.totalUsd).toBeCloseTo(0.012)
  expect(points[1]!.totalUsd).toBeCloseTo(0.036)
  expect(points[1]!.dailyUsd).toBeCloseTo(0.024)
  expect(runnerCostChart([])).toEqual([])
})
