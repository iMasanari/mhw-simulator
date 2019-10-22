import { readCsv } from '../util/fileUtil'
import fromEntries from '../util/fromEntries'

export const getCharm = async (skillIndexMap: Map<string, number>) => {
  const csv = await readCsv('./lib/charm.csv')

  const result = csv.map((row, i) => {
    const [名前, レア度, 入手時期, スキル系統1, スキル値1, スキル系統2, スキル値2, 生産素材A1, 個数A1, 生産素材A2, 個数A2, 生産素材A3, 個数A3, 生産素材A4, 個数A4, 前段階, 仮番号] = row

    const skillList = [
      [スキル系統1, +スキル値1],
      [スキル系統2, +スキル値2],
    ] as const

    const skill = fromEntries(
      skillList
        .filter(([, point]) => point)
        .map(([name, point]) => [skillIndexMap.get(name)!, point])
    )

    return [名前, skill] as const
  })

  return result
}
