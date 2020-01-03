import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { flat } from '~/app/util/array'
import charmGroup from '~/generated/charmGroup.json'
import Button from '../common/Button'
import CharmTable from './CharmTable'

interface Props {
}

const getDisplayList = (armorGroups: (readonly [string, (string | null)[]])[]) =>
  flat(armorGroups.map(([_, equips]) => equips.filter(Boolean) as string[]))

const Charms: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle, ignoreFromList, clearFromList } = useIgnoreArmorsActions()

  const [filter, setFilter] = useState('')

  const charmList = useMemo(() => Object.entries(charmGroup).filter(([name]) => ~name.indexOf(filter)), [filter])

  const checkFromDisplay = () => {
    if (!confirm('表示をすべてチェックしますか')) return

    clearFromList(getDisplayList(charmList))
  }

  const uncheckFromDisplay = () => {
    if (!confirm('表示をすべて除外しますか')) return

    ignoreFromList(getDisplayList(charmList))
  }

  return (
    <div>
      <p>
        検索で護石を除外する場合、下記のチェックを外してください。
        <br />
        内容は自動的に保存されますが、開発の都合でリセットされることがあります。
        </p>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 護石名"
      />
      <Button label="表示をすべて除外" onClick={uncheckFromDisplay} />
      <Button label="表示をすべてチェック" onClick={checkFromDisplay} />
      <CharmTable charmGroups={charmList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Charms
