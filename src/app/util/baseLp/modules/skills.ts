import { GLP_FX, GLP_LO } from '~/app/constants/glpk'
import { flat } from '../../array'
import { allSkill, seriesSkill } from '../../generatedUtil'
import { LpModule } from '../createLp'

export const skillModule = (): LpModule => {
  const vars = allSkill.map(name => ({ name, generals: true, useData: true }))

  return { vars }
}

export const seriesSkillModule = (): LpModule => {
  const seriesSkillNameList = Object.keys(seriesSkill)
  const seriesSkillItemList = flat(
    seriesSkillNameList.map((skill) =>
      Object.entries(seriesSkill[skill]).map(([name, value]) => ({ skill, name, value }))
    )
  )

  const vars = [
    ...seriesSkillNameList.map(name =>
      ({ name: `_${name}`, generals: true })
    ),
    ...seriesSkillItemList.map(({ skill, name }) =>
      ({ name: `_${skill}_${name}`, generals: true })
    )
  ]

  const subjectTo = [
    // 同一スキル発動チェック
    ...seriesSkillNameList.map(skill =>
      ({
        vars: [
          { name: `_${skill}`, coef: -1 },
          { name: skill, coef: 1 },
          ...Object.entries(seriesSkill[skill]).map(([name]) =>
            ({ name: `_${skill}_${name}`, coef: 1 })
          ),
        ],
        bnds: { type: GLP_FX, ub: 0, lb: 0 },
      })
    ),
    // シリーズスキル発動チェック
    ...seriesSkillItemList.map(({ skill, name, value }) =>
      ({
        vars: [{ name: `_${skill}_${name}`, coef: -value }, { name: name, coef: 1 }],
        bnds: { type: GLP_LO, ub: 0, lb: 0 },
      })
    ),
  ]

  return { vars, subjectTo }
}
