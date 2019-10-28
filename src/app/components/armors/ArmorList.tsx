import React from 'react'
import { Armors } from '~/app/modules/ignoreArmors'

require('./ArmorList.css')

interface Props {
  armors: string[]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}

const ArmorList: React.FC<Props> = ({ armors, ignoreArmors, toggleIgnoreArmors }) =>
  <ul className="ArmorList">
    {armors.map(name =>
      <li key={name} className="ArmorList-li">
        <label>
          <input
            type="checkbox"
            checked={ignoreArmors[name] !== 0}
            onChange={() => { toggleIgnoreArmors(name) }}
          />
          <span>{name}</span>
        </label>
      </li>
    )}
  </ul>

export default ArmorList
