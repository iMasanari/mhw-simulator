// https://github.com/jvail/glpk.js/blob/3002a042a37e84e8c43ee29336ecd0de754ae2cb/src/pre.js#L58

/* direction: */
export const GLP_MIN = 1  /* minimization */
export const GLP_MAX = 2  /* maximization */

/* kind of structural variable: */
export const GLP_CV = 1  /* continuous variable */
export const GLP_IV = 2  /* integer variable */
export const GLP_BV = 3  /* binary variable */

/* type of auxiliary/structural variable: */
export const GLP_FR = 1  /* free (unbounded) variable */
export const GLP_LO = 2  /* variable with lower bound */
export const GLP_UP = 3  /* variable with upper bound */
export const GLP_DB = 4  /* double-bounded variable */
export const GLP_FX = 5  /* fixed variable */

/* message level: */
export const GLP_MSG_OFF = 0  /* no output */
export const GLP_MSG_ERR = 1  /* warning and error messages only */
export const GLP_MSG_ON = 2  /* normal output */
export const GLP_MSG_ALL = 3  /* full output */
export const GLP_MSG_DBG = 4  /* debug output */

/* solution status: */
export const GLP_UNDEF = 1  /* solution is undefined */
export const GLP_FEAS = 2  /* solution is feasible */
export const GLP_INFEAS = 3  /* solution is infeasible */
export const GLP_NOFEAS = 4  /* no feasible solution exists */
export const GLP_OPT = 5  /* solution is optimal */
export const GLP_UNBND = 6  /* solution is unbounded */
