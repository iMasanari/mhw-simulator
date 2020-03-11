import { GLP_FR } from '~/app/constants/glpk'
import { LpModule } from '../createLp'

export const DEF = 'ydl'
export const FIRE = 'yef'
export const WATER = 'yew'
export const THUNDER = 'yet'
export const ICE = 'yei'
export const DRAGON = 'yed'

const free = { type: GLP_FR, ub: 0, lb: 0 }

export const defModule = (): LpModule => {
  const vars = [
    { name: DEF, generals: true, useData: true },
    { name: FIRE, generals: true, useData: true, bounds: free },
    { name: WATER, generals: true, useData: true, bounds: free },
    { name: THUNDER, generals: true, useData: true, bounds: free },
    { name: ICE, generals: true, useData: true, bounds: free },
    { name: DRAGON, generals: true, useData: true, bounds: free },
  ]

  return { vars }
}
