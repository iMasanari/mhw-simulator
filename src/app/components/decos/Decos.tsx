import React, { useMemo, useState } from 'react'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import useId from '~/app/hooks/useId'
import { Decos } from '~/app/modules/decos'
import { flat, unique } from '~/app/util/array'
import { deco } from '~/app/util/generatedUtil'
import toNumber from '~/app/util/toNumber'

require('./Decos.css')

interface Props {
}

const allDecoList = Object.keys(deco)

const skillList = unique(flat(allDecoList.map(key => deco[key].skill.map(s => s.name))))

const createList = (filter: string, inputed: Decos, isInputedOnly: boolean) => {
  const decoList = isInputedOnly ? allDecoList.filter(name => inputed[name] != null) : allDecoList

  const matchList = decoList.filter(name =>
    name.includes(filter) || deco[name].skill.some(s => s.name === filter)
  )

  return matchList
}

const Decos: React.FC<Props> = () => {
  const decos = useDecos()
  const { set } = useDecosActions()
  const [filter, setFilter] = useState('')
  const [isInputedOnly, setInputedOnly] = useState(false)
  const listId = useId()

  // decosはdepsに入れない
  const decoList = useMemo(() => (
    createList(filter, decos, isInputedOnly)
  ), [filter, isInputedOnly])

  return (
    <div>
      <p>
        検索で装飾品の所持数を制限する場合、下記にその個数を指定してください。
        <br />
        内容は自動的に保存されますが、開発の都合でリセットされることがあります。
      </p>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 装飾品名 or スキル"
        list={listId}
      />
      <datalist id={listId}>
        {skillList.map((item) =>
          <option key={item} value={item} />
        )}
      </datalist>
      <br />
      <label>
        <input type="checkbox" checked={isInputedOnly} onChange={() => setInputedOnly(!isInputedOnly)} />
        {' '}
        入力済みの装飾品のみを表示
      </label>
      <div className="Decos-contents">
        <ul>
          {decoList.map(name =>
            <li key={name}>
              {name}
              <input
                className="Decos-numberInput"
                type="number"
                min="0"
                max="9"
                value={decos[name] ?? ''}
                onChange={e => set(name, toNumber(e.currentTarget.value))}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Decos
