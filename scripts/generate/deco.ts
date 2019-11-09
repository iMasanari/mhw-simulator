import { readCsv } from '../util/fileUtil'
import fromEntries from '../util/fromEntries'

export const getDeco = async (skillIndexMap: Map<string, number>) => {
  const csv = await readCsv('./lib/fetched/deco.csv')

  const result = csv.map((row, i) => {
    const [名前, レア度, スロットサイズ, 入手時期, スキル系統1, スキル値1, スキル系統2, スキル値2, 調査ポイント, 錬金ポイント, 仮番号] = row

    const skillList = [
      [スキル系統1, +スキル値1],
      [スキル系統2, +スキル値2],
    ] as const

    const skill = fromEntries(
      skillList
        .filter(([, point]) => point)
        .map(([name, point]) => [skillIndexMap.get(name)!, point])
    )

    return [名前, skill, +スロットサイズ] as const
  })

  return result
}
