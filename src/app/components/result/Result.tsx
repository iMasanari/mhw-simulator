import { useTranslation } from 'react-i18next'
import HeadingTitle from '../common/HeadingTitle'
import Equipment from './Equipment'
import { useResult } from '~/app/hooks/result'

interface Props {
}

const Result: React.FC<Props> = () => {
  const { t } = useTranslation()
  const list = useResult()

  return (
    <>
      <HeadingTitle title={t('検索結果')} />
      {list.filter(Boolean).map((result, i) =>
        <Equipment
          key={i}
          title={`${t('10件検索: 装備')}${i + 1}`}
          result={result}
          initState={i === 0}
        />
      )}
    </>
  )
}

export default Result
