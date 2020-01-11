import React from 'react'
import { Decos } from '~/app/modules/decos'
import { deco } from '~/app/util/generatedUtil'
import toNumber from '~/app/util/toNumber'
import Table from '../common/Table'

require('./DecoTable.css')

interface Props {
  decoList: string[]
  decos: Decos
  setDeco: (deco: string, value: number | null) => void
}

const DecoTable: React.FC<Props> = ({ decoList, decos, setDeco }) =>
  <Table className="DecoTable" hoverable>
    <tbody>
      <tr>
        <th></th>
        <th>個数</th>
      </tr>
      {decoList.map((name) =>
        <tr key={name}>
          <td>
            {name}
            <span className="DecoTable-skills">
              {deco[name].skill.map(v => v.name).join(' ')}
            </span>
          </td>
          <td key={name}>
            <input
              className="DecoTable-numberInput"
              type="number"
              min="0"
              max="99"
              value={decos[name] ?? ''}
              onChange={e => setDeco(name, toNumber(e.currentTarget.value))}
            />
          </td>
        </tr>
      )}
    </tbody>
  </Table>

export default DecoTable
