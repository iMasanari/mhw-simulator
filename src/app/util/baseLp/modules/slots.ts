import { GLP_LO } from '~/app/constants/glpk'
import { LpModule } from '../createLp'

const lo0 = {
  type: GLP_LO,
  ub: 0,
  lb: 0,
}

export const SLOT_1_OVER = 'y_1'
export const SLOT_2_OVER = 'y_2'
export const SLOT_3_OVER = 'y_3'
export const SLOT_4_OVER = 'y_4'

export const SLOT_1 = SLOT_1_OVER
export const SLOT_2 = 'z_2'
export const SLOT_3 = 'z_3'
export const SLOT_4 = 'z_4'

export const slotsModule = (): LpModule => {
  const list = [
    SLOT_1_OVER,
    SLOT_2_OVER,
    SLOT_3_OVER,
    SLOT_4_OVER,
  ]

  const vars = [
    ...list.map(name => ({ name, generals: true, useData: true })),
    { name: SLOT_2, generals: true },
    { name: SLOT_3, generals: true },
    { name: SLOT_4, generals: true },
  ]

  const subjectTo = [
    { vars: [{ name: SLOT_2, coef: -1 }, { name: SLOT_1_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_2, coef: -1 }, { name: SLOT_2_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_3, coef: -1 }, { name: SLOT_1_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_3, coef: -1 }, { name: SLOT_2_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_3, coef: -1 }, { name: SLOT_3_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_4, coef: -1 }, { name: SLOT_1_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_4, coef: -1 }, { name: SLOT_2_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_4, coef: -1 }, { name: SLOT_3_OVER, coef: 1 }], bnds: lo0 },
    { vars: [{ name: SLOT_4, coef: -1 }, { name: SLOT_4_OVER, coef: 1 }], bnds: lo0 },
  ]

  return { vars, subjectTo }
}
