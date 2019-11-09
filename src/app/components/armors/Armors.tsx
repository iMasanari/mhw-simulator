import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { arm, body, head, leg, wst } from '~/app/util/generatedUtil'
import ArmorList from './ArmorList'

require('./Armors.css')

interface Props {
}

const createList = (armorData: Record<string, unknown>, filter: string) =>
  Object.keys(armorData).filter(name => ~name.indexOf(filter))

const Armors: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()

  const [filter, setFilter] = useState('')

  const deps = [filter]

  const headList = useMemo(() => createList(head, filter), deps)
  const bodyList = useMemo(() => createList(body, filter), deps)
  const armList = useMemo(() => createList(arm, filter), deps)
  const wstList = useMemo(() => createList(wst, filter), deps)
  const legList = useMemo(() => createList(leg, filter), deps)

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
        placeholder="フィルタ: 防具名"
      />
      <div className="Armors-contents">
        <ArmorList armors={headList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
        <ArmorList armors={bodyList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
        <ArmorList armors={armList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
        <ArmorList armors={wstList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
        <ArmorList armors={legList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
      </div>
    </div>
  )
}

export default Armors
