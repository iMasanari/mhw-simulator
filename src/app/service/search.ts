import * as data from '~/app/data'
import skillList from '~/app/data/skill.json'
import { Skill } from '../hooks/useSkill'

export interface Result {
  head: string | undefined
  body: string | undefined
  arm: string | undefined
  wst: string | undefined
  leg: string | undefined
  charm: string | undefined
  decos: { name: string, count: number }[]
  skills: { name: string, count: number }[]
  def: number | undefined
}

let _worker: Worker | undefined

const createWorker = () => {
  // 2重実行しないよう、前回のワーカーを終了させる
  // TODO: 実行が完了している場合、前回のものを使い回すようにする
  if (_worker) _worker.terminate()

  return _worker = new Worker('~/worker/index.js')
}

const skillHash = skillList.reduce(
  (acc, v) => (acc[v.id] = v.name, acc),
  {} as Record<string, string>
)

const find = <T>(list: string[], obj: Record<string, T>) =>
  list.map(value => obj[value]).find(Boolean)

export default async (skill: Skill) =>
  new Promise<Result>(resolve => {
    const worker = createWorker()

    worker.postMessage({
      action: 'load',
      data: Object.keys(skill).map(key => `${key} >= ${skill[key]}`).join('\n'),
      mip: true,
    })

    worker.addEventListener('message', (e) => {
      const { action, result } = e.data

      if (action !== 'done') return

      const list = Object.keys(result).filter(key => result[key])

      const head = find(list, data.head)
      const body = find(list, data.body)
      const arm = find(list, data.arm)
      const wst = find(list, data.wst)
      const leg = find(list, data.leg)
      const charm = find(list, data.charm)

      const decos = list
        .map(value => ({ name: data.deco[value], count: result[value] }))
        .filter(({ name }) => name)

      const skills = list
        .map(value => ({ name: skillHash[value], count: result[value] }))
        .filter(({ name }) => name)
        .sort((a, b) => b.count - a.count)

      const def = result.y11

      resolve({ head, body, arm, wst, leg, charm, decos, skills, def })
    })
  })
