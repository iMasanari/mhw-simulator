import { ActiveSkill } from '~/app/modules/activeSkill'
import seriesSkill from '~/generated/seriesSkill.json'
import { fromEntries } from '../array'

export default (skill: ActiveSkill) => {
  // clone
  skill = { ...skill }

  // 極意スキル展開
  if (skill['スリンガー装填数ＵＰ'] > 3) {
    skill['スリンガー装填数・極意'] = 1
  }

  if (skill['整備'] > 3) {
    skill['整備・極意'] = 1
  }

  if (skill['ボマー'] > 3) {
    skill['ボマー・極意'] = 1
  }

  if (skill['満足感'] > 1) {
    skill['満足感・極意'] = 1
  }

  if (skill['渾身'] > 3) {
    skill['渾身・極意'] = 1
  }

  if (skill['力の解放'] > 5) {
    skill['力の解放・極意'] = 1
  }

  if (skill['挑戦者'] > 5) {
    skill['挑戦者・極意'] = 1
  }

  if (skill['砲術'] > 3) {
    skill['砲術・極意'] = 1
  }

  if (skill['精霊の加護'] > 3) {
    skill['精霊の加護・極意'] = 1
  }

  if (skill['ＫＯ術'] > 3) {
    skill['ＫＯ術・極意'] = 1
  }

  if (skill['スタミナ奪取'] > 3) {
    skill['スタミナ奪取・極意'] = 1
  }

  // シリーズスキル展開
  skill = fromEntries(
    Object.entries(skill).map(([name, value]) =>
      [name in seriesSkill ? `_${name}` : name, value]
    )
  )

  return skill
}
