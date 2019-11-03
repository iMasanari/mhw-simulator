// @ts-ignore
import glpkPromise from 'glpk.js'

/* message level: */
const GLP_MSG_OFF = 0  /* no output */
const GLP_MSG_ERR = 1  /* warning and error messages only */
const GLP_MSG_ON = 2  /* normal output */
const GLP_MSG_ALL = 3  /* full output */
const GLP_MSG_DBG = 4  /* debug output */

/* solution status: */
const GLP_UNDEF = 1  /* solution is undefined */
const GLP_FEAS = 2  /* solution is feasible */
const GLP_INFEAS = 3  /* solution is infeasible */
const GLP_NOFEAS = 4  /* no feasible solution exists */
const GLP_OPT = 5  /* solution is optimal */
const GLP_UNBND = 6  /* solution is unbounded */

export interface Result {
  error: boolean
  vars: Record<string, number>
  z: number
}

export default (lp: any): Promise<Result> =>
  glpkPromise.then((glpk: any) => {
    const { result } = glpk.solve(lp, GLP_MSG_ERR)

    return { error: result.status !== GLP_OPT, ...result }
  })
