export function runnerCostChart(days: Array<{ date: string, billableMinutes: number, completed: number }>) {
  let minutes = 0
  return [...days].sort((a, b) => a.date.localeCompare(b.date)).map((day) => {
    minutes += day.billableMinutes
    return { ...day, at: Date.parse(day.date), totalUsd: minutes * 0.006, dailyUsd: day.billableMinutes * 0.006 }
  })
}
