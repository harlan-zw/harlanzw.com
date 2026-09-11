export function recentRunnerRate(days: Array<{ date: string, billableMinutes: number }>, updatedAt: number) {
  const end = Math.floor(updatedAt / 86_400_000) * 86_400_000
  const totals = new Map(days.map(day => [day.date, day.billableMinutes]))
  let minutes = 0
  for (let offset = 1; offset <= 7; offset++) {
    const value = totals.get(new Date(end - offset * 86_400_000).toISOString().slice(0, 10))
    if (value === undefined)
      return null
    minutes += value
  }
  return { minutesPerDay: minutes / 7, start: end - 7 * 86_400_000, end: end - 86_400_000 }
}

export function projectRunnerCosts(input: {
  minutesPerDay: number
  averageWatts: number
  electricityAudPerKwh: number
  usdPerAud: number
  includedMinutesPerMonth: number
  billableShare: number
  hardwareAud: number
}) {
  if (Object.values(input).some(value => !Number.isFinite(value) || value < 0) || input.usdPerAud === 0 || input.billableShare > 100)
    return { _tag: 'Invalid' as const }
  const annualKwh = input.averageWatts / 1000 * 24 * 365
  const annualElectricityAud = annualKwh * input.electricityAudPerKwh
  const annualPaidMinutes = Math.max(0, input.minutesPerDay * 365 * input.billableShare / 100 - input.includedMinutesPerMonth * 12)
  const annualHostedAud = annualPaidMinutes * 0.006 / input.usdPerAud
  const annualDifferenceAud = annualHostedAud - annualElectricityAud
  return {
    _tag: 'Available' as const,
    annualKwh,
    annualElectricityAud,
    annualHostedAud,
    fiveYearNetAud: annualDifferenceAud * 5 - input.hardwareAud,
    breakEvenYears: annualDifferenceAud > 0 ? input.hardwareAud / annualDifferenceAud : null,
    years: Array.from({ length: 6 }, (_, year) => ({ year, hostedAud: annualHostedAud * year, homelabAud: input.hardwareAud + annualElectricityAud * year })),
  }
}
