import React from 'react'
import { useWeaponSlots } from '~/app/hooks/weaponSlots'
import WeaponSkills from './WeaponSkills'
import WeaponSlots from './WeaponSlots'

require('./WeaponSlots.css')

interface Props {
}

const Weapon: React.FC<Props> = () => {
  const [s1, s2, s3, weaponSkill] = useWeaponSlots()

  return (
    <div>
      <WeaponSlots />
      {!!weaponSkill && <WeaponSkills />}
    </div>
  )
}

export default Weapon
