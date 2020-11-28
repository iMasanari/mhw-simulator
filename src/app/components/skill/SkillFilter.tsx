import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import TextFild from '../common/TextFild'
import skillList from '~/generated/skillList.json'

require('./SkillFilter.css')

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const categories = Array.from(new Set(skillList.map(v => v.category)))

const SkillFilter: React.FC<Props> = ({ value, setValue }) => {
  const { t } = useTranslation()
  const [tSkill] = useTranslation('skills')

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [setValue])

  return (
    <div className="SkillFilter">
      <TextFild
        className="SkillFilter-input"
        value={value}
        onChange={onChange}
        placeholder={t('フィルタ: スキル名 or カテゴリ')}
        datalist={value ? undefined : categories.map(name => tSkill(name))}
      />
    </div>
  )
}

export default SkillFilter
