import { GLP_FX } from '~/app/constants/glpk'
import { flat } from '../array'

interface SubjectTo {
  vars: {
    name: string
    coef: number
  }[]
  bnds: {
    type: number
    ub: number
    lb: number
  }
}

interface Var {
  name: string
  bounds?: { type: number, ub: number, lb: number }
  generals?: boolean
  binaries?: boolean
  useData?: boolean
}

export interface LpData {
  name: string
  value: Record<string, number>
  generals?: boolean
  binaries?: boolean
}

export interface LpModule {
  vars?: Var[]
  data?: LpData[]
  subjectTo?: SubjectTo[]
}

const fx0 = {
  type: GLP_FX,
  ub: 0,
  lb: 0,
}

const isNonNull = <T>(x: T): x is NonNullable<T> => x != null

const createSubject = (name: string, data: LpData[]) => {
  const filterdData = data
    .filter(v => v.value[name])
    .map(v => ({ name: v.name, coef: v.value[name] }))

  return {
    vars: [{ name, coef: -1 }, ...filterdData],
    bnds: fx0,
  }
}

export default (modules: LpModule[]) => {
  const vars = flat(modules.map(v => v.vars).filter(isNonNull))
  const data = flat(modules.map(v => v.data).filter(isNonNull))

  const subjectTo = [
    ...flat(modules.map(v => v.subjectTo).filter(isNonNull)),
    ...vars.filter(v => v.useData).map(v => createSubject(v.name, data)),
  ]

  const bounds = vars
    .filter(v => v.bounds)
    .map(({ name, bounds }) => ({ name, ...bounds }))

  const generals = [...vars, ...data].filter(v => v.generals).map(v => v.name)
  const binaries = [...vars, ...data].filter(v => v.binaries).map(v => v.name)

  return { subjectTo, bounds, generals, binaries }
}
