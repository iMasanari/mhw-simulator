import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import { Decos as IDecos } from '~/app/modules/decos'
import { flat, unique } from '~/app/util/array'
import { deco } from '~/app/util/generatedUtil'
import TextFild from '../common/TextFild'
import DecoTable from './DecoTable'

require('./Decos.css')

interface Props {
}

const allDecoList = Object.keys(deco)

const skillList = unique(flat(allDecoList.map(key => deco[key].skill.map(s => s.name))))

const createList = (filter: string, inputed: IDecos, isInputedOnly: boolean) => {
  const decoList = isInputedOnly ? allDecoList.filter(name => inputed[name] != null) : allDecoList

  const matchList = decoList.filter(name =>
    name.includes(filter) || deco[name].skill.some(s => s.name === filter)
  )

  return matchList
}

const Decos: React.FC<Props> = () => {
  const { t } = useTranslation()
  const decos = useDecos()
  const { set } = useDecosActions()
  const [filter, setFilter] = useState('')
  const [isInputedOnly, setInputedOnly] = useState(false)

  // decosはdepsに入れない
  const decoList = useMemo(() => (
    createList(filter, decos, isInputedOnly)
  ), [filter, isInputedOnly])

  return (
    <div>
      <p>
        {t('検索で装飾品の所持数を制限する場合、下記にその個数を指定してください。')}
        <br />
        {t('内容は自動的に保存されますが、開発の都合でリセットされることがあります。')}
      </p>
      <TextFild
        type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder={t('フィルタ: 装飾品名 or スキル')}
        datalist={skillList}
      />
      <div className="Decos-actions">
        <label>
          <input
            type="checkbox"
            checked={isInputedOnly}
            onChange={() => setInputedOnly(!isInputedOnly)}
          />
          {' '}
          {t('入力済みの装飾品のみを表示')}
        </label>
      </div>
      <DecoTable decoList={decoList} decos={decos} setDeco={set} />
    </div>
  )
}

export default Decos
