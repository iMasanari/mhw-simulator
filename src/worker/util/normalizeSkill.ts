import { Skill } from '~/app/hooks/useSkill'

export default (skill: Skill) => {
  // clone
  skill = { ...skill }

  // スリンガー装填数ＵＰ / 銀火竜の真髄
  if (skill.y16 > 3) {
    skill.y100 = Math.max(skill.y100 || 0, 2)
  }

  // 整備 / 炎妃龍の真髄
  if (skill.y17 > 3) {
    skill.y98 = Math.max(skill.y98 || 0, 3)
  }

  // ボマー / 調査団の錬金術
  if (skill.y24 > 3) {
    skill.y76 = Math.max(skill.y76 || 0, 3)
  }

  // 満足感 / 轟竜の真髄
  if (skill.y25 > 1) {
    skill.y86 = Math.max(skill.y86 || 0, 3)
  }

  // 渾身 / 斬竜の真髄
  if (skill.y115 > 3) {
    skill.y84 = Math.max(skill.y84 || 0, 3)
  }

  // 力の解放 / 雷狼竜の真髄
  if (skill.y126 > 5) {
    skill.y90 = Math.max(skill.y90 || 0, 3)
  }

  // 挑戦者 / 砕竜の真髄
  if (skill.y128 > 5) {
    skill.y85 = Math.max(skill.y85 || 0, 3)
  }

  // 砲術 / 熔山龍の真髄
  if (skill.y138 > 3) {
    skill.y97 = Math.max(skill.y97 || 0, 3)
  }

  // 精霊の加護 / 金火竜の真髄
  if (skill.y150 > 3) {
    skill.y99 = Math.max(skill.y99 || 0, 2)
  }

  // ＫＯ術 / 角竜の覇気
  if (skill.y156 > 3) {
    skill.y79 = Math.max(skill.y79 || 0, 3)
  }

  // スタミナ奪取 / 恐暴竜の真髄
  if (skill.y158 > 3) {
    skill.y89 = Math.max(skill.y89 || 0, 3)
  }

  return skill
}
