import React, { useCallback, useState } from 'react'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import { getDecoInfo } from '~/app/util/generatedUtil'
import toNumber from '~/app/util/toNumber'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'
import SlotTable from './SlotTable'

require('./DecoName.css')

interface Props {
  name: string
}

const DecoName: React.FC<Props> = ({ name }) => {
  const decos = useDecos()
  const { set } = useDecosActions()

  const setDeco = useCallback((e: React.ChangeEvent<HTMLInputElement>) => (
    name && set(name, toNumber(e.currentTarget.value))
  ), [name])

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? getDecoInfo(name) : null

  return (
    <>
      <span className={`DecoName ${name ? 'on' : ''}`} onClick={name ? toggleModal : undefined}>
        {name}
      </span>
      {info &&
        <Modal title={name} onClose={toggleModal}>
          <SlotTable slots={[info.slot1]} />
          <SkillTable skillList={info.skill} />
          <p>検索で装飾品の所持数を制限する場合、下記にその個数を指定してください。</p>
          <label>
            {name}
            <input
              className="Decos-numberInput"
              type="number"
              min="0"
              max="9"
              value={decos[name!] != null ? decos[name!] : ''}
              onChange={setDeco}
            />
          </label>
        </Modal>
      }
    </>
  )
}

export default DecoName
