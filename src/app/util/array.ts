const emptyArray: never[] = []

export const partition = <T>(list: T[], predicate: (v: T, i: number) => any) =>
  list.reduce((acc, v, i) => (
    acc[predicate(v, i) ? 0 : 1].push(v), acc
  ), [[], []] as [T[], T[]])

export const flat = <T>(list: T[][]) =>
  (emptyArray as T[]).concat(...list)

export const fromEntries = <T>(list: [string, T][]) =>
  list.reduce((acc, [k, v]) => (acc[k] = v, acc), {} as Record<string, T>)
