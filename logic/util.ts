export function groupBy<T extends {}>(values: T[], fn: (v: T) => any) {
  return values.reduce((rv, x) => {
    (rv[fn(x)] = rv[fn(x)] || []).push(x)
    return rv
  }, {})
}
