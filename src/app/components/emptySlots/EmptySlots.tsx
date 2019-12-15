import React, { useCallback, useEffect, useState } from 'react'
import { useActiveSkill } from '~/app/hooks/activeSkill'
import { useDecos } from '~/app/hooks/decos'
import { useIgnoreArmors } from '~/app/hooks/ignoreArmors'
import { useWeaponSkill } from '~/app/hooks/weaponSkill'
import { useWeaponSlots } from '~/app/hooks/weaponSlots'
import { ActiveSkill } from '~/app/modules/activeSkill'
import { Decos } from '~/app/modules/decos'
import { Armors } from '~/app/modules/ignoreArmors'
import { WeaponSkill } from '~/app/modules/weaponSkill'
import { WeaponSlots } from '~/app/modules/weaponSlots'
import calc, { Equipment } from '~/app/util/calc'
import { Condition } from '~/app/util/calc/execute'
import Accordion from '../common/Accordion'

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
  const weaponSlots = useWeaponSlots()
  const weaponSkill = useWeaponSkill()
  const ignoreArmors = useIgnoreArmors()
  const decos = useDecos()

  const searchSummary = useCallback(async (skill: ActiveSkill, weaponSlots: WeaponSlots, weaponSkills: WeaponSkill, armors: Armors, decos: Decos) => {
    setSlots({})

    const condition: Condition = { skill, weaponSlots, weaponSkill, armors, decos, prev: [] }

    for (const [key, objective] of list) {
      const value = await calc(objective, condition)

      if (!value) return

      setSlots(slots => ({ ...slots, [key]: value }))
    }
  }, [])

  // 初回検索
  useEffect(() => {
    searchSummary(activeSkill, weaponSlots, weaponSkill, ignoreArmors, decos)
  }, [activeSkill, weaponSkill, weaponSlots])

  return slots
}

interface Props {
}

const EmptySlots: React.FC<Props> = () => {
  const { slot1, slot2, slot3, slot4 } = useSlots()

  const slot1Count = slot1 ? slot1.z : '-'
  const slot2Count = slot2 ? slot2.z : '-'
  const slot3Count = slot3 ? slot3.z : '-'
  const slot4Count = slot4 ? slot4.z : '-'

  return (
    <Accordion title={`空きスロット数 ${slot1 ? slot1.z : ''}`}>
      <div className="EmptySlots-content">
        <table className="EmptySlots-table">
          <tbody>
            <tr>
              <th className="EmptySlots-text">空きスロット数 Lv1以上</th>
              <td className="EmptySlots-slot">{slot1Count}</td>
            </tr>
            <tr>
              <th className="EmptySlots-text">空きスロット数 Lv2以上</th>
              <td className="EmptySlots-slot">{slot2Count}</td>
            </tr>
            <tr>
              <th className="EmptySlots-text">空きスロット数 Lv3以上</th>
              <td className="EmptySlots-slot">{slot3Count}</td>
            </tr>
            <tr>
              <th className="EmptySlots-text">空きスロット数 Lv4以上</th>
              <td className="EmptySlots-slot">{slot4Count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Accordion>
  )
}

export default EmptySlots
