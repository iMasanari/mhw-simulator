import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TextFild from '../common/TextFild'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'
import SlotTable from './SlotTable'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import { deco } from '~/app/util/generatedUtil'
import toNumber from '~/app/util/toNumber'

require('./DecoName.css')

interface Props {
  name: string
}

const DecoName: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation()
  const [tDeco] = useTranslation('decos')
  const decos = useDecos()
  const { set } = useDecosActions()

  const setDeco = useCallback((e: React.ChangeEvent<HTMLInputElement>) => (
    name && set(name, toNumber(e.currentTarget.value))
  ), [name, set])

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? deco[name] : null

  return (
    <>
      <span className={`DecoName ${name ? 'on' : ''}`} onClick={name ? toggleModal : undefined}>
        {tDeco(name)}
      </span>
      {info &&
        <Modal title={tDeco(name)} onClose={toggleModal}>
          <SlotTable slots={[info.slot1]} />
          <SkillTable skillList={info.skill} />
          <p>{t('検索で装飾品の所持数を制限する場合、下記にその個数を指定してください。')}</p>
          <label>
            {tDeco(name)}
            {' '}
            <TextFild
              className="DecoName-numberInput"
              type="number"
              min="0"
              max="9"
              value={decos[name!] ?? ''}
              onChange={setDeco}
            />
          </label>
        </Modal>
      }
    </>
  )
}

export default DecoName
