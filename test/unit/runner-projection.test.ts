import { expect, it } from 'vitest'
import { projectRunnerCosts, recentRunnerRate } from '../../shared/utils/runner-projection'

const input = { minutesPerDay: 1000, averageWatts: 50, electricityAudPerKwh: 0.3, usdPerAud: 0.75, includedMinutesPerMonth: 2000, billableShare: 100, hardwareAud: 2773 }

it('subtracts allowances, converts USD and charges 24/7 power plus hardware', () => {
  const result = projectRunnerCosts(input)
  if (result._tag === 'Available')
    expect(result.annualKwh).toBeCloseTo(438)
  expect(result).toMatchObject({ _tag: 'Available', annualElectricityAud: 131.4, annualHostedAud: 2728, fiveYearNetAud: 10210 })
})
it('shows a loss and no payback when included minutes cover the workload', () => {
  expect(projectRunnerCosts({ ...input, includedMinutesPerMonth: 100000 })).toMatchObject({ _tag: 'Available', annualHostedAud: 0, fiveYearNetAud: -3430, breakEvenYears: null })
})
it('rejects invalid assumptions instead of rendering NaN', () => {
  expect(projectRunnerCosts({ ...input, usdPerAud: 0 })).toEqual({ _tag: 'Invalid' })
})
it('uses seven complete UTC days and excludes today', () => {
  const days = Array.from({ length: 8 }, (_, index) => ({ date: `2026-09-${String(index + 1).padStart(2, '0')}`, billableMinutes: index === 7 ? 9999 : 100 }))
  expect(recentRunnerRate(days, Date.parse('2026-09-08T12:00:00Z'))?.minutesPerDay).toBe(100)
  expect(recentRunnerRate(days.slice(1), Date.parse('2026-09-08T12:00:00Z'))).toBeNull()
})
