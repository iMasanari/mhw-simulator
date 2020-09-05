// @ts-ignore
import glpkPromise, { GLPK } from 'glpk.js'

export interface Result {
  error: boolean
  vars: Record<string, number>
  z: number
}

export default (lp: any): Promise<Result> =>
  // @ts-expect-error
  glpkPromise.then((glpk: GLPK) => {
    const { result } = glpk.solve(lp, glpk.GLP_MSG_ERR)

    return { error: result.status !== glpk.GLP_OPT, ...result }
  })
