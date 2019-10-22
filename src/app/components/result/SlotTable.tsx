import React from 'react'
import Table from '../common/Table'

require('./SlotTable.css')

interface Props {
  slots: number[]
}

const SlotTable: React.FC<Props> = ({ slots }) =>
  <Table className="SlotTable">
    <tbody>
      <tr>
        <td>スロット</td>
        <td className="SlotTable-slot">
          {slots.filter(Boolean).map(slot => `【${slot}】`).join('')}
        </td>
      </tr>
    </tbody>
  </Table>

export default SlotTable
