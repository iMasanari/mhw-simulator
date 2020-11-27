import { useTranslation } from 'react-i18next'
import Table from '../common/Table'

require('./SlotTable.css')

interface Props {
  slots: number[]
}

const SlotTable: React.FC<Props> = ({ slots }) => {
  const { t } = useTranslation()

  return (
    <Table className="SlotTable">
      <tbody>
        <tr>
          <td>{t('スロット')}</td>
          <td className="SlotTable-slot">
            {slots.filter(Boolean).map(slot => `【${slot}】`).join('')}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default SlotTable
