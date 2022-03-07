import { useTranslation } from 'react-i18next'
import Table from '../common/Table'
import { Armors } from '~/app/modules/ignoreArmors'

require('./ArmorTable.css')

interface Props {
  armorGroups: (readonly [string, (string | null)[]])[]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
  equip?: string
}

const ArmorTable: React.FC<Props> = ({ armorGroups, ignoreArmors, toggleIgnoreArmors, equip = '' }) => {
  const { t } = useTranslation()
  const [tEquips] = useTranslation('equips')
  const armorList = [t('頭'), t('胴'), t('腕'), t('腰'), t('足')]

  // hit
  const getArmorListIndex = (group: (readonly [string, (string | null)[]])) => group[1].indexOf(equip)
  const hitArmorList = armorGroups.reduce((p, c, i) => -1 !== getArmorListIndex(c) ? getArmorListIndex(c) : p, -1)
  const hitArmorGroup = armorGroups.reduce((p, c, i) => -1 !== getArmorListIndex(c) ? i : p, -1)

  return (
    <Table className="ArmorTable" hoverable>
      <tbody>
        <tr>
          <th></th>
          {armorList.map((v, i) =>
            <th key={v} className={`ArmorTable-checkboxCell ${i === hitArmorList ? 'hit-text' : ''}`}>{v}</th>
          )}
        </tr>
        {armorGroups.map(([group, list], i1) =>
          <tr key={group}>
            <td className={`${i1 === hitArmorGroup ? 'hit-text' : ''}`}>{tEquips(group)}</td>
            {list.map((name, i2) =>
              <td key={i2} className={`ArmorTable-checkboxCell ${i1 === hitArmorGroup && i2 === hitArmorList ? 'hit-background' : ''}`}>
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
