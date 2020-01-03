import React, { useMemo, useState } from 'react'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import { Decos } from '~/app/modules/decos'
import toNumber from '~/app/util/toNumber'
import decoData from '~/generated/deco.json'

require('./Decos.css')

interface Props {
}

const createList = (filter: string, decos: Decos, isInputedOnly: boolean) => {
  const list = Object.keys(decoData).filter(name => name.includes(filter))

  return isInputedOnly ? list.filter(name => decos[name] != null) : list
}

const Decos: React.FC<Props> = () => {
  const decos = useDecos()
  const { set } = useDecosActions()
  const [filter, setFilter] = useState('')
  const [isInputedOnly, setInputedOnly] = useState(false)

  // decosはdepsに入れない
  const decoList = useMemo(() => createList(filter, decos, isInputedOnly), [filter, isInputedOnly])

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
        placeholder="フィルタ: 装飾品名"
      />
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
