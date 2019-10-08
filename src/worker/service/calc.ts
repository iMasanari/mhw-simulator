import * as armorsData from '~/app/data'
import skillList from '~/app/data/skill.json'
import execute, { Condition } from './execute'

export interface Result {
  head: string | undefined
  body: string | undefined
  arm: string | undefined
  wst: string | undefined
  leg: string | undefined
  charm: string | undefined
  decos: { name: string, count: number }[]
  skills: { name: string, count: number }[]
  def: number
  slot1: number
  slot2: number
  slot3: number
  slot4: number
}

const skillHash = skillList.reduce(
  (acc, v) => (acc[v.id] = v.name, acc),
  {} as Record<string, string>
)

const findArmor = <T>(list: string[], obj: Record<string, T>) =>
  list.map((value) => obj[value]).find(Boolean)

const getSlots = (result: Record<string, number>) => {
  const slot3Over = Math.min(result.y_1, result.y_2, result.y_3)
  const slot2Over = Math.min(result.y_1, result.y_2)

  const slot4 = Math.min(result.y_1, result.y_2, result.y_3, result.y_4)
  const slot3 = slot3Over - slot4
  const slot2 = slot2Over - slot3Over
  const slot1 = result.y_1 - slot2Over

  return [slot1, slot2, slot3, slot4]
}

export default (condition: Condition, objective: string): Result => {
  const result = execute(condition, objective)

  const list = Object.keys(result).filter(key => result[key])

  const head = findArmor(list, armorsData.head)
  const body = findArmor(list, armorsData.body)
  const arm = findArmor(list, armorsData.arm)
  const wst = findArmor(list, armorsData.wst)
  const leg = findArmor(list, armorsData.leg)
  const charm = findArmor(list, armorsData.charm)

  const decos = list
    .map(value => ({ name: (armorsData.deco as Record<string, string>)[value], count: result[value] }))
    .filter(({ name }) => name)

  const skills = list
    .map(value => ({ name: skillHash[value], count: result[value] }))
    .filter(({ name }) => name)
    .sort((a, b) => b.count - a.count)

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
