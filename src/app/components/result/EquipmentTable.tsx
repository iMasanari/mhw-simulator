import React from 'react'
import { Equipment } from '~/worker/service/calc'
import Table from '../common/Table'
import ArmorName from './ArmorName'
import DecoName from './DecoName'

require('./EquipmentTable.css')

interface Props {
  equipment: Equipment
}

const EquipmentTable: React.FC<Props> = ({ equipment }) =>
  <Table className="EquipmentTable">
    <tbody>
      <tr>
        <th>防御力</th>
        <td>{equipment.def}</td>
      </tr>
      <tr>
        <th>頭</th>
        <td><ArmorName id={equipment.head} /></td>
      </tr>
      <tr>
        <th>胴</th>
        <td><ArmorName id={equipment.body} /></td>
      </tr>
      <tr>
        <th>腕</th>
        <td><ArmorName id={equipment.arm} /></td>
      </tr>
      <tr>
        <th>腰</th>
        <td><ArmorName id={equipment.wst} /></td>
      </tr>
      <tr>
        <th>足</th>
        <td><ArmorName id={equipment.leg} /></td>
      </tr>
      <tr>
        <th>お守り</th>
        <td><ArmorName id={equipment.charm} /></td>
      </tr>
      <tr>
        <th>装飾品</th>
        <td>
          <ul className="EquipmentTable-decos">
            {equipment.decos.map(({ id, count }) =>
              <li key={id}><DecoName id={id} />x{count}</li>
            )}
            {!!equipment.slot1 &&
              <li>空きスロット【１】x{equipment.slot1}</li>
            }
            {!!equipment.slot2 &&
              <li>空きスロット【２】x{equipment.slot2}</li>
            }
            {!!equipment.slot3 &&
              <li>空きスロット【３】x{equipment.slot3}</li>
            }
            {!!equipment.slot4 &&
              <li>空きスロット【４】x{equipment.slot4}</li>
            }
          </ul>
        </td>
      </tr>
    </tbody>
  </Table>

export default EquipmentTable
