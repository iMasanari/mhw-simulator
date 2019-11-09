import { getCharm } from './generate/charm'
import { getDeco } from './generate/deco'
import { getEquip } from './generate/equips'
import { getSkillList } from './generate/skill'
import { writeJson } from './util/fileUtil'
import fromEntries from './util/fromEntries'

const main = async () => {
  // スキル
  const { skillList, allSkill, seriesSkill } = await getSkillList()
  await writeJson('src/generated/skillList.json', skillList)
  await writeJson('src/generated/allSkill.json', allSkill)
  await writeJson('src/generated/seriesSkill.json', seriesSkill)

  const skillIndexMap = new Map(allSkill.map((name, i) => [name, i]))

  // 防具
  const equipTypes = ['head', 'body', 'arm', 'wst', 'leg']
  const equips = await Promise.all(equipTypes.map(async type =>
    [type, await getEquip(type, skillIndexMap)] as const
  ))

  for (const [type, list] of equips) {
    const hash = fromEntries(list.map(({ name, list }) => [name, list]))
    await writeJson(`src/generated/${type}.json`, hash)
  }

  // ワンセット防具リスト
  const oneset = equips.map(([type, list]) =>
    list.filter(v => v.oneset).map(v => v.name)
  )

  await writeJson('src/generated/oneset.json', oneset[0].map((_, i) => oneset.map(v => v[i])))

  // 護石
  const { charm, charmGroup } = await getCharm(skillIndexMap)
  const charmHash = fromEntries(charm.map(([name, ...list]) => [name, list]))
  await writeJson('src/generated/charm.json', charmHash)
  await writeJson('src/generated/charmGroup.json', charmGroup)

  // 装飾品
  const deco = await getDeco(skillIndexMap)
  const decoHash = fromEntries(deco.map(([name, ...list]) => [name, list]))
  await writeJson('src/generated/deco.json', decoHash)
}

main()
