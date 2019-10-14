import register from 'promise-worker/register'
import calc, { Equipment } from './service/calc'
import { Condition } from './service/execute'

export interface Message {
  objective: string
  condition: Condition
}

register<Message, Equipment>(({ condition, objective }) =>
  calc(objective, condition)
)
