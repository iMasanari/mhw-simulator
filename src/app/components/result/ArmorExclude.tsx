import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Armors from '../armors/Armors'
import Modal from '../modal/Modal'
import { arm, body, charm, head, leg, wst } from '~/app/util/generatedUtil'

require('./ArmorExclude.css')

const info: Record<string, typeof arm> = { arm, body, charm, head, leg, wst }

const getEquipInfo = (type: string, name: string) => {
  const ref = info[type]

  return ref ? ref[name] : null
}

interface Props {
  name: string
  type: string
}

const ArmorExclude: React.FC<Props> = ({ name, type }) => {
  const { t } = useTranslation()
  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])
  const info = isModalOpen ? getEquipInfo(type, name!) : null
  return (
    <>
      <button className={`ArmorExclude ${name ? 'on' : 'off'}`} onClick={name ? toggleModal : undefined}>E</button>
      {info &&
        <Modal className="ArmorExclude-modal" title={t(`防具設定`)} onClose={toggleModal}>
          <Armors init_filter={name}/>
        </Modal>
      }
    </>
  )
}

export default ArmorExclude
