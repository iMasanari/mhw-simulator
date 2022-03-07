import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../common/Button'
import TextFild from '../common/TextFild'
import ArmorTable from './ArmorTable'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { flat, unique } from '~/app/util/array'
import { arm, body, getEquip, head, leg, wst } from '~/app/util/generatedUtil'
import armorGroup from '~/generated/armorGroup.json'

interface Props {
  init_filter?: string
}

const armorGroupEntries: [string, (string | null)[]][] = Object.entries(armorGroup)

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

const Armors: React.FC<Props> = ({ init_filter = '' }) => {
  const { t } = useTranslation()
  const ignoreArmors = useIgnoreArmors()
  const { toggle, ignoreFromList, clearFromList } = useIgnoreArmorsActions()
  const [filter, setFilter] = useState(init_filter)

  const armorGroups = useMemo(() => (
    armorGroupEntries
      .map(([group, equips]) => [group, equips.map(name => isMatchFilter(name, filter) ? name : null)] as const)
      .filter(([group, equips]) => equips.some(Boolean))
  ), [filter])

  const checkFromDisplay = () => {
    if (!confirm(t('表示をすべてチェックしますか'))) return

    clearFromList(getDisplayList(armorGroups))
  }

  const uncheckFromDisplay = () => {
    if (!confirm(t('表示をすべて除外しますか'))) return

    ignoreFromList(getDisplayList(armorGroups))
  }

  if (init_filter && filter === init_filter) {
    const uniq = [...new Set(Object.keys(armorGroup).map(v => v.replace(/EX|α|β|γ/g, '')).filter(group => init_filter.match(group)))]
    setFilter(1 === uniq.length ? uniq[0] : init_filter)
  }

  return (
    <div>
      <p>
        {t('検索で防具を除外する場合、下記のチェックを外してください。')}
        <br />
        {t('内容は自動的に保存されますが、開発の都合でリセットされることがあります。')}
      </p>
      <TextFild
        type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder={t('フィルタ: 防具名 or スキル')}
        datalist={skillList}
      />
      <div>
        <Button label={t('表示をすべてチェック')} onClick={checkFromDisplay} />
        <Button label={t('表示をすべて除外')} onClick={uncheckFromDisplay} />
      </div>
      <ArmorTable armorGroups={armorGroups} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} equip={init_filter} />
    </div>
  )
}

export default Armors
