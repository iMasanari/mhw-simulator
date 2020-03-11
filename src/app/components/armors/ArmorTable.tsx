import React from 'react'
import { useTranslation } from 'react-i18next'
import { Armors } from '~/app/modules/ignoreArmors'
import Table from '../common/Table'

require('./ArmorTable.css')

interface Props {
  armorGroups: (readonly [string, (string | null)[]])[]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}

const ArmorTable: React.FC<Props> = ({ armorGroups, ignoreArmors, toggleIgnoreArmors }) => {
  const { t } = useTranslation()
  const [tEquips] = useTranslation('equips')
  const armorList = [t('頭'), t('胴'), t('腕'), t('腰'), t('足')]

  return (
    <Table className="ArmorTable" hoverable>
      <tbody>
        <tr>
          <th></th>
          {armorList.map((v) =>
            <th key={v} className="ArmorTable-checkboxCell">{v}</th>
          )}
        </tr>
        {armorGroups.map(([group, list]) =>
          <tr key={group}>
            <td>{tEquips(group)}</td>
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
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default ArmorTable
