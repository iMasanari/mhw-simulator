import React from 'react'
import { WeaponSlots } from '~/app/hooks/useWeaponSlots'

require('./Weapon.css')

interface Props {
  slots: WeaponSlots
  setSlot: (index: number, value: number) => void
}

const Weapon: React.FC<Props> = ({ slots, setSlot }) =>
  <div className="Weapon">
    <div>武器スロ</div>
    <div>
      {slots.map((slot, i) =>
        <select
          key={i}
          value={slot}
          onChange={(e) => setSlot(i, +e.currentTarget.value)}
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

export default Weapon
