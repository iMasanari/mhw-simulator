import React from 'react'
import { useWeaponSlots, useWeaponSlotsActions } from '~/app/hooks/weaponSlots'

require('./Weapon.css')

interface Props {
}

const Weapon: React.FC<Props> = () => {
  const slots = useWeaponSlots()
  const { set } = useWeaponSlotsActions()

  return (
    <div className="Weapon">
      <div>武器スロ</div>
      <div>
        {slots.map((slot, i) =>
          <select
            key={i}
            value={slot}
            onChange={(e) => set(i, +e.currentTarget.value)}
            className="Weapon-select"
          >
            <option value={0}>-</option>
            <option value={1}>【１】</option>
            <option value={2}>【２】</option>
            <option value={3}>【３】</option>
            <option value={4}>【４】</option>
          </select>
        )}
      </div>
    </div>
  )
}
export default Weapon
