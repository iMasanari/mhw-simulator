import register from 'promise-worker/register'
import calc, { Result } from './service/calc'
import { Condition } from './service/execute'

export interface Message {
  objective: string
  condition: Condition
}

register<Message, Result>(({ condition, objective }) =>
  calc(objective, condition)
)
