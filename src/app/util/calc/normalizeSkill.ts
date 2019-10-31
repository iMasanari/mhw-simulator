import { ActiveSkill } from '~/app/modules/activeSkill'

export default (skill: ActiveSkill) => {
  // clone
  skill = { ...skill }

  if (skill['スリンガー装填数ＵＰ'] > 3) {
    skill['銀火竜の真髄'] = Math.max(skill['銀火竜の真髄'] || 0, 2)
  }

  if (skill['整備'] > 3) {
    skill['炎妃龍の真髄'] = Math.max(skill['炎妃龍の真髄'] || 0, 3)
  }

  if (skill['ボマー'] > 3) {
    skill['調査団の錬金術'] = Math.max(skill['調査団の錬金術'] || 0, 3)
  }

  if (skill['満足感'] > 1) {
    skill['轟竜の真髄'] = Math.max(skill['轟竜の真髄'] || 0, 3)
  }

  if (skill['渾身'] > 3) {
    skill['斬竜の真髄'] = Math.max(skill['斬竜の真髄'] || 0, 3)
  }

  if (skill['力の解放'] > 5) {
    skill['雷狼竜の真髄'] = Math.max(skill['雷狼竜の真髄'] || 0, 3)
  }

  if (skill['挑戦者'] > 5) {
    skill['砕竜の真髄'] = Math.max(skill['砕竜の真髄'] || 0, 3)
  }

  if (skill['砲術'] > 3) {
    skill['熔山龍の真髄'] = Math.max(skill['熔山龍の真髄'] || 0, 3)
  }

  if (skill['精霊の加護'] > 3) {
    skill['金火竜の真髄'] = Math.max(skill['金火竜の真髄'] || 0, 2)
  }

  if (skill['ＫＯ術'] > 3) {
    skill['角竜の覇気'] = Math.max(skill['角竜の覇気'] || 0, 3)
  }

  if (skill['スタミナ奪取'] > 3) {
    skill['恐暴竜の真髄'] = Math.max(skill['恐暴竜の真髄'] || 0, 3)
  }

  return skill
}
