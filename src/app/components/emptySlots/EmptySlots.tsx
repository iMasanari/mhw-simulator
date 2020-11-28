import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Accordion from '../common/Accordion'
import { useActiveSkill } from '~/app/hooks/activeSkill'
import { useDecos } from '~/app/hooks/decos'
import { useDefs } from '~/app/hooks/defs'
import { useIgnoreArmors } from '~/app/hooks/ignoreArmors'
import { useWeapon } from '~/app/hooks/weapon'
import { ActiveSkill } from '~/app/modules/activeSkill'
import { Decos } from '~/app/modules/decos'
import { Defs } from '~/app/modules/defs'
import { Armors } from '~/app/modules/ignoreArmors'
import { Weapon } from '~/app/modules/weapon'
import calc, { Equipment } from '~/app/util/calc'
import { Condition } from '~/app/util/calc/execute'

require('./EmptySlots.css')

interface Slots {
  slot1?: Equipment
  slot2?: Equipment
  slot3?: Equipment
  slot4?: Equipment
}

const list = Object.entries({
  slot1: 'y_1',
  slot2: 'z_2',
  slot3: 'z_3',
  slot4: 'z_4',
})

const useSlots = () => {
  const [slots, setSlots] = useState({} as Slots)
  const activeSkill = useActiveSkill()
  const weapon = useWeapon()
  const ignoreArmors = useIgnoreArmors()
  const decos = useDecos()
  const defs = useDefs()

  const searchSummary = useCallback(async (skill: ActiveSkill, weapon: Weapon, armors: Armors, decos: Decos, defs: Defs) => {
    setSlots({})

    const condition: Condition = { skill, weapon, armors, decos, defs, prev: [] }

    for (const [key, objective] of list) {
      const value = await calc(objective, condition)

      if (!value) return

      setSlots(slots => ({ ...slots, [key]: value }))
    }
  }, [])

  // 初回検索
  useEffect(() => {
    searchSummary(activeSkill, weapon, ignoreArmors, decos, defs)
  }, [activeSkill, decos, defs, ignoreArmors, searchSummary, weapon])

  return slots
}

interface Props {
}

const EmptySlots: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { slot1, slot2, slot3, slot4 } = useSlots()

  const slot1Count = slot1?.z ?? '-'
  const slot2Count = slot2?.z ?? '-'
  const slot3Count = slot3?.z ?? '-'
  const slot4Count = slot4?.z ?? '-'

  return (
    <Accordion title={`${t('空きスロット数')} ${slot1 ? slot1.z : ''}`}>
      <div className="EmptySlots-content">
        <table className="EmptySlots-table">
          <tbody>
            <tr>
              <th className="EmptySlots-text">{t('空きスロット数 Lv{{level}}以上', { level: 1 })}</th>
              <td className="EmptySlots-slot">{slot1Count}</td>
            </tr>
            <tr>
              <th className="EmptySlots-text">{t('空きスロット数 Lv{{level}}以上', { level: 2 })}</th>
              <td className="EmptySlots-slot">{slot2Count}</td>
            </tr>
            <tr>
              <th className="EmptySlots-text">{t('空きスロット数 Lv{{level}}以上', { level: 3 })}</th>
              <td className="EmptySlots-slot">{slot3Count}</td>
            </tr>
            <tr>
              <th className="EmptySlots-text">{t('空きスロット数 Lv{{level}}以上', { level: 4 })}</th>
              <td className="EmptySlots-slot">{slot4Count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Accordion>
  )
}

export default EmptySlots
