import { useTranslation } from 'react-i18next'
import Table from '../common/Table'

require('./SkillTable.css')

interface Props {
  skillList: { name: string, value: number }[]
}

const SkillTable: React.FC<Props> = ({ skillList }) => {
  const { t } = useTranslation()
  const [tSkill] = useTranslation('skills')

  return (
    <Table>
      <tbody>
        <tr>
          <th>{t('スキル名')}</th>
          <th className="SkillTable-number">{t('ポイント')}</th>
        </tr>
        {skillList.map(({ name, value }) =>
          <tr key={name}>
            <td>{tSkill(name)}</td>
            <td className="SkillTable-number">{value}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default SkillTable
