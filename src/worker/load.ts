import calc from './service/calc'
import { Condition } from './service/execute'

const slotList = [
  { type: 'slot1', objective: 'y7' },
  { type: 'slot2', objective: 'z8' },
  { type: 'slot3', objective: 'z9' },
  { type: 'slot4', objective: 'z10' },
] as const

export default (condition: Condition) => {
  const result = calc(condition, 'y11')

  postMessage({ action: 'done', payload: { type: 'def', result } })

  for (const { type, objective } of slotList) {
    const result = calc(condition, objective)

    postMessage({ action: 'done', payload: { type, result } })
  }
}
