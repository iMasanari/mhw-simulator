import calc from './service/calc'
import { Condition } from './service/execute'

const slotList = [
  { type: 'slot1', objective: 'y_1' },
  { type: 'slot2', objective: 'z_2' },
  { type: 'slot3', objective: 'z_3' },
  { type: 'slot4', objective: 'z_4' },
] as const

export default (condition: Condition) => {
  const result = calc(condition, 'ydl')

  postMessage({ action: 'done', payload: { type: 'def', result } })

  for (const { type, objective } of slotList) {
    const result = calc(condition, objective)

    postMessage({ action: 'done', payload: { type, result } })
  }
}
