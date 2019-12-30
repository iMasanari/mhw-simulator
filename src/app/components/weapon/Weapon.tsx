import React from 'react'
import { useWeapon } from '~/app/hooks/weapon'
import WeaponSkills from './WeaponSkills'
import WeaponSlots from './WeaponSlots'

require('./WeaponSlots.css')

interface Props {
}

const Weapon: React.FC<Props> = () => {
  const { skill } = useWeapon()

  return (
    <div>
      <WeaponSlots />
      {skill !== 'yws_none' && <WeaponSkills />}
    </div>
  )
}

export default Weapon
