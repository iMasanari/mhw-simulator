import React from 'react'
import { Equipment } from '~/worker/service/calc'
import Table from '../common/Table'
import ArmorName from './ArmorName'
import CharmName from './CharmName'
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
        <td><ArmorName type="head" name={equipment.head} /></td>
      </tr>
      <tr>
        <th>胴</th>
        <td><ArmorName type="body" name={equipment.body} /></td>
      </tr>
      <tr>
        <th>腕</th>
        <td><ArmorName type="arm" name={equipment.arm} /></td>
      </tr>
      <tr>
        <th>腰</th>
        <td><ArmorName type="wst" name={equipment.wst} /></td>
      </tr>
      <tr>
        <th>足</th>
        <td><ArmorName type="leg" name={equipment.leg} /></td>
      </tr>
      <tr>
        <th>護石</th>
        <td><CharmName name={equipment.charm} /></td>
      </tr>
      <tr>
        <th>装飾品</th>
        <td>
          <ul className="EquipmentTable-decos">
            {equipment.decos.map(({ name, value }) =>
              <li key={name}><DecoName name={name} />x{value}</li>
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
