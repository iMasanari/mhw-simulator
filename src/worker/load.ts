import { Skill } from '~/app/hooks/useSkill'
import calc from './service/calc'

const slotList = [
  { type: 'slot1', objective: 'y7' },
  { type: 'slot2', objective: 'z8' },
  { type: 'slot3', objective: 'z9' },
  { type: 'slot4', objective: 'z10' },
] as const

export default (skill: Skill) => {
  const result = calc(skill, 'y11')

  postMessage({ action: 'done', payload: { type: 'def', result } })

  for (const { type, objective } of slotList) {
    const result = calc(skill, objective)

    postMessage({ action: 'done', payload: { type, result } })
  }
}
