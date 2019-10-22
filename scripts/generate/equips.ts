import { readCsv } from '../util/fileUtil'
import fromEntries from '../util/fromEntries'

export const getEquip = async (type: string, skillIndexMap: Map<string, number>) => {
  const csv = await readCsv(`./lib/${type}.csv`)

  const list = csv.map((row, i) => {
    const [名前, 性別, レア度, スロット1, スロット2, スロット3, 入手時期, 初期防御力, 最終防御力, 火耐性, 水耐性, 雷耐性, 氷耐性, 龍耐性, スキル系統1, スキル値1, スキル系統2, スキル値2, スキル系統3, スキル値3, スキル系統4, スキル値4, スキル系統5, スキル値5, 生産素材1, 生産個数1, 生産素材2, 生産個数2, 生産素材3, 生産個数3, 生産素材4, 生産個数4, カスタム強化防御力, カスタム強化素材1, 個数1, カスタム強化素材2, 個数2, ワンセット防具, 仮番号] = row

    const skillList = [
      [スキル系統1, +スキル値1],
      [スキル系統2, +スキル値2],
      [スキル系統3, +スキル値3],
      [スキル系統4, +スキル値4],
      [スキル系統5, +スキル値5],
    ] as const

    const skill = fromEntries(
      skillList
        .filter(([, point]) => point)
        .map(([name, point]) => [skillIndexMap.get(name)!, point])
    )

    return [名前, skill, +スロット1, +スロット2, +スロット3, +初期防御力, +最終防御力, +カスタム強化防御力, +火耐性, +水耐性, +雷耐性, +氷耐性, +龍耐性] as const
  })

  return list
}
