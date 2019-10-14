import React from 'react'
import { Armors } from '~/app/modules/ignoreArmors'

require('./ArmorList.css')

interface Props {
  armors: string[][]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}

const ArmorList: React.FC<Props> = ({ armors, ignoreArmors, toggleIgnoreArmors }) =>
  <ul className="ArmorList">
    {armors.map(([id, name]) =>
      <li key={id} className="ArmorList-li">
        <label>
          <input
            type="checkbox"
            checked={ignoreArmors[id] !== 0}
            onChange={() => { toggleIgnoreArmors(id) }}
          />
          <span>{name}</span>
        </label>
      </li>
    )}
  </ul>

export default ArmorList
