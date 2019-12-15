import React from 'react'
import WeaponSkills from './WeaponSkills'
import WeaponSlots from './WeaponSlots'

require('./WeaponSlots.css')

interface Props {
}

const Weapon: React.FC<Props> = () =>
  <div>
    <WeaponSlots />
    <WeaponSkills />
  </div>

export default Weapon
