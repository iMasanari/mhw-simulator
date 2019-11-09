import React from 'react'
import { Armors } from '~/app/modules/ignoreArmors'
import Table from '../common/Table'

require('./CharmTable.css')

interface Props {
  charmGroups: [string, string[]][]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}


const levelList = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']

const CharmTable: React.FC<Props> = ({ charmGroups, ignoreArmors, toggleIgnoreArmors }) =>
  <Table className="CharmTable">
    <tbody>
      <tr>
        <th></th>
        {levelList.map((v) =>
          <th key={v} className="CharmTable-checkboxCell">{v}</th>
        )}
      </tr>
      {charmGroups.map(([group, list]) =>
        <tr key={group}>
          <td>{group}</td>
          {list.map((name) =>
            <td key={name} className="CharmTable-checkboxCell">
              <input
                type="checkbox"
                checked={ignoreArmors[name] !== 0}
                onChange={() => { toggleIgnoreArmors(name) }}
              />
            </td>
          )}
          {Array.from({ length: 5 - list.length }).map((_, i) =>
            <td key={i}></td>
          )}
        </tr>
      )}
    </tbody>
  </Table>

export default CharmTable
