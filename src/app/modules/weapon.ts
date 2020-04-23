import ActionReducer from 'action-reducer'

type Slots = [number, number, number]

export type Weapon = {
  slots: Slots
  skill: string
}

const initState: Weapon = {
  slots: [0, 0, 0],
  skill: 'yws_none',
}

const { reducer, createAction } = ActionReducer(initState, 'weapon/')

export const setSlots = createAction(
  'setSlots',
  ({ skill }, [s1, s2, s3, weaponSkill]: [number, number, number, number]) =>
    ({ slots: [s1, s2, s3], skill: weaponSkill === 0 ? 'yws_none' : weaponSkill === 2 ? 'yws_爛輝龍の真髄' : (skill !== 'yws_none' && skill !== 'yws_爛輝龍の真髄') ? skill : 'yws_auto' })
)

export const setSkill = createAction('setSkill', (state, skill: string) =>
  ({ ...state, skill })
)

export default reducer
