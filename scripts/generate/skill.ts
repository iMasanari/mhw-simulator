import { readCsv } from '../util/fileUtil'

const SERIES_SKILL = 'シリーズスキル'

export const getSkillList = async () => {
  const csv = await readCsv('./lib/skill.csv')

  const skills = csv.map(([スキル系統, 発動スキル, 必要ポイント, カテゴリ, 効果, 系統番号, 仮番号]) =>
    ({ スキル系統, 発動スキル, 必要ポイント, カテゴリ, 効果, 系統番号, 仮番号 })
  )

  const skillNames = Array.from(new Set([
    // ...skills.filter(v => v.カテゴリ !== SERIES_SKILL).map(({ スキル系統 }) => スキル系統),
    ...skills.map(({ スキル系統 }) => スキル系統),
    ...skills.filter(v => v.カテゴリ === SERIES_SKILL).map(({ 発動スキル }) => 発動スキル),
  ]))

  return skillNames.map((name) => {
    const isSeriesSkill = skills.some(v => v.発動スキル === name)

    const details = skills.filter(v => v.スキル系統 === name)
    const category = isSeriesSkill ? SERIES_SKILL : details[0].カテゴリ

    const items = details.length && details[0].カテゴリ === SERIES_SKILL
      ? []
      : isSeriesSkill ? [1] : details.map(v => +v.必要ポイント)

    return { name, category, items }
  })
}
