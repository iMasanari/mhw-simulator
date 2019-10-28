import * as data from '~/app/util/generatedUtil'
import execute, { Condition } from './execute'

const skillSet = new Set(data.skillList.map(v => v.name))

export interface Equipment {
  head: string | undefined
  body: string | undefined
  arm: string | undefined
  wst: string | undefined
  leg: string | undefined
  charm: string | undefined
  decos: { name: string, value: number }[]
  skills: { name: string, value: number }[]
  def: number
  slot1: number
  slot2: number
  slot3: number
  slot4: number
}

const findArmor = (list: string[], data: Record<string, any>) =>
  list.find(name => data[name])

const getSlots = (result: Record<string, number>) => {
  const slot3Over = Math.min(result.y_1, result.y_2, result.y_3)
  const slot2Over = Math.min(result.y_1, result.y_2)

  const slot4 = Math.min(result.y_1, result.y_2, result.y_3, result.y_4)
  const slot3 = slot3Over - slot4
  const slot2 = slot2Over - slot3Over
  const slot1 = result.y_1 - slot2Over

  return [slot1, slot2, slot3, slot4]
}

export default async (objective: string, condition: Condition): Promise<Equipment> => {
  const result = await execute(objective, condition)

  const list = Object.keys(result).filter(key => result[key])

  const head = findArmor(list, data.head)
  const body = findArmor(list, data.body)
  const arm = findArmor(list, data.arm)
  const wst = findArmor(list, data.wst)
  const leg = findArmor(list, data.leg)
  const charm = findArmor(list, data.charm)

  const decos = list
    .filter(name => data.deco[name])
    .map(name => ({ name, value: result[name] }))

  const skills = list
    .filter(name => skillSet.has(name))
    .map(name => ({ name, value: result[name] }))
    .sort((a, b) => b.value - a.value)

  const { ydl: def } = result
  const [slot1, slot2, slot3, slot4] = getSlots(result)

  return {
    head,
    body,
    arm,
    wst,
    leg,
    charm,
    decos,
    skills,
    def,
    slot1,
    slot2,
    slot3,
    slot4,
  }
}
