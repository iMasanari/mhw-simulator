// @ts-ignore
import glpkPromise from 'glpk.js'

/* message level: */
const GLP_MSG_OFF = 0  /* no output */
const GLP_MSG_ERR = 1  /* warning and error messages only */
const GLP_MSG_ON = 2  /* normal output */
const GLP_MSG_ALL = 3  /* full output */
const GLP_MSG_DBG = 4  /* debug output */

export default (lp: any): Promise<Record<string, number>> =>
  glpkPromise.then((glpk: any) =>
    glpk.solve(lp, GLP_MSG_ERR).result.vars
  )
