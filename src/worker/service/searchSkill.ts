import execute, { Condition } from './execute'

export default function* (condition: Condition, skillList: string[]) {
  for (const id of skillList) {
    const result = execute(condition, id)
    const value = result[id]

    yield { id, value }
  }
}
