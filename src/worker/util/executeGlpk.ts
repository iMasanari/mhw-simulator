// @ts-ignore
import glpk from 'glpk.js'

export default (data: string, mip: boolean) => {
  try {
    let result = {} as Record<string, number>

    const lp = glpk.glp_create_prob()
    const smcp = new glpk.SMCP({ presolve: glpk.GLP_ON })

    glpk.glp_read_lp_from_string(lp, null, data)
    glpk.glp_scale_prob(lp, glpk.GLP_SF_AUTO)
    glpk.glp_simplex(lp, smcp)

    if (mip) {
      glpk.glp_intopt(lp)
      // objective = glpk.glp_mip_obj_val(lp)
      for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
        result[glpk.glp_get_col_name(lp, i)] = glpk.glp_mip_col_val(lp, i)
      }
    } else {
      // objective = glpk.glp_get_obj_val(lp)
      for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
        result[glpk.glp_get_col_name(lp, i)] = glpk.glp_get_col_prim(lp, i)
      }
    }
    return result
  }
  catch (err) {
    console.error(err.message)
    return {}
  }
}
