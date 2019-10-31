import React from 'react'
import Table from '../common/Table'

require('./SkillTable.css')

interface Props {
  skillList: { name: string, value: number }[]
}

const SkillTable: React.FC<Props> = ({ skillList }) =>
  <Table>
    <tbody>
      <tr>
        <th>スキル名</th>
        <th className="SkillTable-number">ポイント</th>
      </tr>
      {skillList.map(({ name, value }) =>
        <tr key={name}>
          <td>{name}</td>
          <td className="SkillTable-number">{value}</td>
        </tr>
      )}
    </tbody>
  </Table>

export default SkillTable
