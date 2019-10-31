const fromEntries: <T = any>(entries: Iterable<readonly [PropertyKey, T]>) => { [k in PropertyKey]: T } = (entries) =>
  (Object as any).fromEntries(entries)

export default fromEntries
