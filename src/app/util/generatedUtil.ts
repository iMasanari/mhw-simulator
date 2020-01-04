import { fromEntries } from "./array"

type EquipData = [
  Record<string, number>,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

interface SkillInfo {
  name: string,
  category: string,
  items: number[]
}

const headData = require('~/generated/head.json') as Record<string, EquipData>
const bodyData = require('~/generated/body.json') as Record<string, EquipData>
const armData = require('~/generated/arm.json') as Record<string, EquipData>
const wstData = require('~/generated/wst.json') as Record<string, EquipData>
const legData = require('~/generated/leg.json') as Record<string, EquipData>
const charmData = require('~/generated/charm.json') as Record<string, EquipData>
const decoData = require('~/generated/deco.json') as Record<string, EquipData>

export const skillList = require('~/generated/skillList.json') as SkillInfo[]
export const allSkill = require('~/generated/allSkill.json') as string[]
export const weaponSkills = require('~/generated/weaponSkills.json') as string[]
export const seriesSkill = require('~/generated/seriesSkill.json') as Record<string, Record<string, number>>

const skillNameMap = new Map(allSkill.map((name, i) => [i, name]))

const getEquipInfo = ([skillData, slot1, slot2, slot3, def, maxDef, customDef, fire, water, thunder, ice, dragon]: EquipData) => {
  const skill = Object.keys(skillData).map((name) =>
    ({ name: skillNameMap.get(+name)!, value: skillData[name] })
  )

  return { skill, slot1, slot2, slot3, def, maxDef, customDef, fire, water, thunder, ice, dragon }
}

const getEquipData = (data: Record<string, EquipData>) =>
  fromEntries(
    Object.entries(data).map(([name, value]) => [name, getEquipInfo(value)])
  )

export const head = getEquipData(headData)
export const body = getEquipData(bodyData)
export const arm = getEquipData(armData)
export const wst = getEquipData(wstData)
export const leg = getEquipData(legData)
export const charm = getEquipData(charmData)
export const deco = getEquipData(decoData)

export const getEquip = (name: string) =>
  head[name] || body[name] || arm[name] || wst[name] || leg[name] || charm[name] || deco[name]
