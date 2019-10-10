import { Skill } from '~/app/hooks/useSkill'

export default (skill: Skill) => {
  // clone
  skill = { ...skill }

  // スリンガー装填数ＵＰ / 銀火竜の真髄
  if (skill.ys4 > 3) {
    skill.ys94 = Math.max(skill.ys94 || 0, 2)
  }

  // 整備 / 炎妃龍の真髄
  if (skill.ys5 > 3) {
    skill.ys75 = Math.max(skill.ys75 || 0, 3)
  }

  // ボマー / 調査団の錬金術
  if (skill.ys12 > 3) {
    skill.ys80 = Math.max(skill.ys80 || 0, 3)
  }

  // 満足感 / 轟竜の真髄
  if (skill.ys13 > 1) {
    skill.ys85 = Math.max(skill.ys85 || 0, 3)
  }

  // 渾身 / 斬竜の真髄
  if (skill.ys109 > 3) {
    skill.ys83 = Math.max(skill.ys83 || 0, 3)
  }

  // 力の解放 / 雷狼竜の真髄
  if (skill.ys120 > 5) {
    skill.ys88 = Math.max(skill.ys88 || 0, 3)
  }

  // 挑戦者 / 砕竜の真髄
  if (skill.ys122 > 5) {
    skill.ys84 = Math.max(skill.ys84 || 0, 3)
  }

  // 砲術 / 熔山龍の真髄
  if (skill.ys132 > 3) {
    skill.ys52 = Math.max(skill.ys52 || 0, 3)
  }

  // 精霊の加護 / 金火竜の真髄
  if (skill.ys144 > 3) {
    skill.ys93 = Math.max(skill.ys93 || 0, 2)
  }

  // ＫＯ術 / 角竜の覇気
  if (skill.ys150 > 3) {
    skill.ys50 = Math.max(skill.ys50 || 0, 3)
  }

  // スタミナ奪取 / 恐暴竜の真髄
  if (skill.ys152 > 3) {
    skill.ys87 = Math.max(skill.ys87 || 0, 3)
  }

  return skill
}
