import { readCsv } from '../util/fileUtil'

const SERIES_SKILL = 'シリーズスキル'

export const getSkillList = async () => {
  const csv = await readCsv('./lib/skill.csv')

  const skills = csv.map(([スキル系統, 発動スキル, 必要ポイント, カテゴリ, 効果, 系統番号, 仮番号]) =>
    ({ スキル系統, 発動スキル, 必要ポイント, カテゴリ, 効果, 系統番号, 仮番号 })
  )

  const skillNames = Array.from(new Set(skills.map(({ スキル系統 }) => スキル系統)))

  return skillNames.map((name) => {
    const details = skills.filter(v => v.スキル系統 === name)
    const category = details[0].カテゴリ
    const items = details.map(v => +v.必要ポイント)

    return { name, category, items }
  })
}
