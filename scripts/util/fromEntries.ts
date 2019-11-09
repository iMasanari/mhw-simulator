export default <T>(list: [string, T][]) =>
  list.reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, T>)
