import { Skill } from '~/app/hooks/useSkill'

export default (skill: Skill) => {
  // clone
  skill = { ...skill }

  // スリンガー装填数ＵＰ / 銀火竜の真髄
  if (skill.ys4 > 3) {
    skill.ys88 = Math.max(skill.ys88 || 0, 2)
  }

  // 整備 / 炎妃龍の真髄
  if (skill.ys5 > 3) {
    skill.ys86 = Math.max(skill.ys86 || 0, 3)
  }

  // ボマー / 調査団の錬金術
  if (skill.ys12 > 3) {
    skill.ys64 = Math.max(skill.ys64 || 0, 3)
  }

  // 満足感 / 轟竜の真髄
  if (skill.ys13 > 1) {
    skill.ys74 = Math.max(skill.ys74 || 0, 3)
  }

  // 渾身 / 斬竜の真髄
  if (skill.ys103 > 3) {
    skill.ys72 = Math.max(skill.ys72 || 0, 3)
  }

  // 力の解放 / 雷狼竜の真髄
  if (skill.ys114 > 5) {
    skill.ys78 = Math.max(skill.ys78 || 0, 3)
  }

  // 挑戦者 / 砕竜の真髄
  if (skill.ys116 > 5) {
    skill.ys73 = Math.max(skill.ys73 || 0, 3)
  }

  // 砲術 / 熔山龍の真髄
  if (skill.ys126 > 3) {
    skill.ys85 = Math.max(skill.ys85 || 0, 3)
  }

  // 精霊の加護 / 金火竜の真髄
  if (skill.ys138 > 3) {
    skill.ys87 = Math.max(skill.ys87 || 0, 2)
  }

  // ＫＯ術 / 角竜の覇気
  if (skill.ys144 > 3) {
    skill.ys67 = Math.max(skill.ys67 || 0, 3)
  }

  // スタミナ奪取 / 恐暴竜の真髄
  if (skill.ys146 > 3) {
    skill.ys77 = Math.max(skill.ys77 || 0, 3)
  }

  return skill
}
