import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { flat, unique } from '~/app/util/array'
import { charm } from '~/app/util/generatedUtil'
import charmGroup from '~/generated/charmGroup.json'
import Button from '../common/Button'
import TextFild from '../common/TextFild'
import CharmTable from './CharmTable'

interface Props {
}

const skillList = unique(flat(Object.values(charm).map(c => c.skill.map(s => s.name))))

const getDisplayList = (armorGroups: (readonly [string, (string | null)[]])[]) =>
  flat(armorGroups.map(([_, equips]) => equips.filter(Boolean) as string[]))

const Charms: React.FC<Props> = () => {
  const { t } = useTranslation()
  const ignoreArmors = useIgnoreArmors()
  const { toggle, ignoreFromList, clearFromList } = useIgnoreArmorsActions()
  const [filter, setFilter] = useState('')

  // フィルタを適応した、護石のリスト
  // スキル名によるフィルタは、護石のレベルでスキルが変動しないことが前提
  const charmList = useMemo(() => (
    Object.entries(charmGroup).filter(([name, [child]]) =>
      name.includes(filter) || charm[child].skill.some(s => s.name === filter)
    )
  ), [filter])

  const checkFromDisplay = () => {
    if (!confirm(t('表示をすべてチェックしますか'))) return

    clearFromList(getDisplayList(charmList))
  }

  const uncheckFromDisplay = () => {
    if (!confirm(t('表示をすべて除外しますか'))) return

    ignoreFromList(getDisplayList(charmList))
  }

  return (
    <div>
      <p>
        {t('検索で護石を除外する場合、下記のチェックを外してください。')}
        <br />
        {t('内容は自動的に保存されますが、開発の都合でリセットされることがあります。')}
      </p>
      <TextFild
        type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder={t('フィルタ: 護石名 or スキル')}
        datalist={skillList}
      />
      <div>
        <Button label={t('表示をすべてチェック')} onClick={checkFromDisplay} />
        <Button label={t('表示をすべて除外')} onClick={uncheckFromDisplay} />
      </div>
      <CharmTable charmGroups={charmList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Charms
