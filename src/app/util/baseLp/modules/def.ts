import { LpModule } from '../createLp'

export const DEF = 'ydl'

export const defModule = (): LpModule => {
  const vars = [
    { name: DEF, generals: true, useData: true },
  ]

  return { vars }
}
