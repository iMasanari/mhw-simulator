import React from 'react'
import { useWeapon } from '~/app/hooks/weapon'
import HeadingTitle from '../common/HeadingTitle'
import WeaponSkills from './WeaponSkills'
import WeaponSlots from './WeaponSlots'

interface Props {
}

const Weapon: React.FC<Props> = () => {
  const { skill } = useWeapon()

  return (
    <div>
      <HeadingTitle title="武器" />
      <WeaponSlots />
      {skill !== 'yws_none' && <WeaponSkills />}
    </div>
  )
}

export default Weapon
