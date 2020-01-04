import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import useId from '~/app/hooks/useId'
import { flat, unique } from '~/app/util/array'
import { arm, body, getEquip, head, leg, wst } from '~/app/util/generatedUtil'
import armorGroup from '~/generated/armorGroup.json'
import Button from '../common/Button'
import ArmorTable from './ArmorTable'

require('./Armors.css')

interface Props {
}

const armorGroupEntries = Object.entries(armorGroup)

const skillList = unique(
  flat(
    Object.values({ ...head, ...body, ...arm, ...wst, ...leg })
      .map(a => a.skill.map(s => s.name))
  )
)

const isMatchFilter = (name: string | null, filter: string) =>
  !name || name.includes(filter) || getEquip(name).skill.some(v => v.name === filter)

const getDisplayList = (armorGroups: (readonly [string, (string | null)[]])[]) =>
  flat(armorGroups.map(([_, equips]) => equips.filter(Boolean) as string[]))

const Armors: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle, ignoreFromList, clearFromList } = useIgnoreArmorsActions()
  const [filter, setFilter] = useState('')
  const listId = useId()

  const armorGroups = useMemo(() => (
    armorGroupEntries
      .map(([group, equips]) => [group, equips.map(name => isMatchFilter(name, filter) ? name : null)] as const)
      .filter(([group, equips]) => equips.some(Boolean))
  ), [filter])

  const checkFromDisplay = () => {
    if (!confirm('表示をすべてチェックしますか')) return

    clearFromList(getDisplayList(armorGroups))
  }

  const uncheckFromDisplay = () => {
    if (!confirm('表示をすべて除外しますか')) return

    ignoreFromList(getDisplayList(armorGroups))
  }

  return (
    <div>
      <p>
        検索で防具を除外する場合、下記のチェックを外してください。
        <br />
        内容は自動的に保存されますが、開発の都合でリセットされることがあります。
      </p>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 防具名 or スキル"
        list={listId}
      />
      <datalist id={listId}>
        {skillList.map((item) =>
          <option key={item} value={item} />
        )}
      </datalist>
      <Button label="表示をすべて除外" onClick={uncheckFromDisplay} />
      <Button label="表示をすべてチェック" onClick={checkFromDisplay} />
      <ArmorTable armorGroups={armorGroups} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Armors
