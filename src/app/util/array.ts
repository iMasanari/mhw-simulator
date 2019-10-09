export const partition = <T>(list: T[], predicate: (v: T, i: number) => any) =>
  list.reduce((acc, v, i) => (
    acc[predicate(v, i) ? 0 : 1].push(v), acc
  ), [[], []] as [T[], T[]])
