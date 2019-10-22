import React from 'react'
import Table from '../common/Table'

require('./SkillTable.css')

interface Props {
  skillList: (readonly [string, number])[]
}

const SkillTable: React.FC<Props> = ({ skillList }) =>
  <Table>
    <tbody>
      <tr>
        <th>スキル名</th>
        <th className="SkillTable-number">ポイント</th>
      </tr>
      {skillList.map(([name, count]) =>
        <tr key={name}>
          <td>{name}</td>
          <td className="SkillTable-number">{count}</td>
        </tr>
      )}
    </tbody>
  </Table>

export default SkillTable
