import { Skill } from '~/app/hooks/useSkill'

export default (skill: Skill) => {
  // clone
  skill = { ...skill }

  // スリンガー装填数ＵＰ / 銀火竜の真髄
  if (skill.ys4 > 3) {
    skill.ys95 = Math.max(skill.ys95 || 0, 2)
  }

  // 整備 / 炎妃龍の真髄
  if (skill.ys5 > 3) {
    skill.ys76 = Math.max(skill.ys76 || 0, 3)
  }

  // ボマー / 調査団の錬金術
  if (skill.ys12 > 3) {
    skill.ys81 = Math.max(skill.ys81 || 0, 3)
  }

  // 満足感 / 轟竜の真髄
  if (skill.ys13 > 1) {
    skill.ys86 = Math.max(skill.ys86 || 0, 3)
  }

  // 渾身 / 斬竜の真髄
  if (skill.ys110 > 3) {
    skill.ys84 = Math.max(skill.ys84 || 0, 3)
  }

  // 力の解放 / 雷狼竜の真髄
  if (skill.ys121 > 5) {
    skill.ys89 = Math.max(skill.ys89 || 0, 3)
  }

  // 挑戦者 / 砕竜の真髄
  if (skill.ys123 > 5) {
    skill.ys85 = Math.max(skill.ys85 || 0, 3)
  }

  // 砲術 / 熔山龍の真髄
  if (skill.ys134 > 3) {
    skill.ys52 = Math.max(skill.ys52 || 0, 3)
  }

  // 精霊の加護 / 金火竜の真髄
  if (skill.ys148 > 3) {
    skill.ys94 = Math.max(skill.ys94 || 0, 2)
  }

  // ＫＯ術 / 角竜の覇気
  if (skill.ys155 > 3) {
    skill.ys50 = Math.max(skill.ys50 || 0, 3)
  }

  // スタミナ奪取 / 恐暴竜の真髄
  if (skill.ys157 > 3) {
    skill.ys88 = Math.max(skill.ys88 || 0, 3)
  }

  return skill
}
