import React from 'react'
import { Armors } from '~/app/modules/ignoreArmors'
import Table from '../common/Table'

require('./ArmorTable.css')

interface Props {
  armorGroups: (readonly [string, (string | null)[]])[]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}

const armorList = ['頭', '胴', '腕', '腰', '足']

const ArmorTable: React.FC<Props> = ({ armorGroups, ignoreArmors, toggleIgnoreArmors }) =>
  <Table className="ArmorTable">
    <tbody>
      <tr>
        <th></th>
        {armorList.map((v) =>
          <th key={v} className="ArmorTable-checkboxCell">{v}</th>
        )}
      </tr>
      {armorGroups.map(([group, list]) =>
        <tr key={group}>
          <td>{group}</td>
          {list.map((name, i) =>
            <td key={i} className="ArmorTable-checkboxCell">
              {!!name &&
                <input
                  type="checkbox"
                  checked={ignoreArmors[name] !== 0}
                  onChange={() => { toggleIgnoreArmors(name) }}
                />
              }
            </td>
          )}
          {Array.from({ length: 5 - list.length }).map((_, i) =>
            <td key={i}></td>
          )}
        </tr>
      )}
    </tbody>
  </Table>

export default ArmorTable
