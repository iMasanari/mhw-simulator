import React, { useCallback, useState } from 'react'
import { arm, body, charm, head, leg, wst } from '~/app/data'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import Modal from '../modal/Modal'

require('./ArmorName.css')

interface Props {
  id: string | undefined
}

const list: Record<string, Record<string, string>> = {
  xa: arm,
  xb: body,
  xh: head,
  xw: wst,
  xl: leg,
  xc: charm,
}

const ArmorName: React.FC<Props> = ({ id }) => {
  const name = id ? list[id.slice(0, 2)][id] : '装備なし'

  const ignoreArmor = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const toggleArmor = useCallback(() => id && toggle(id), [id])

  const isIgnore = id && ignoreArmor[id] === 0

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  return (
    <>
      <span className={`ArmorName ${id ? 'on' : ''}`} onClick={id ? toggleModal : undefined}>
        {name}
      </span>
      {isModalOpen &&
        <Modal title="装備設定" onClose={toggleModal}>
          <p>検索で防具を除外する場合、下記のチェックを外してください。</p>
          <label>
            <input type="checkbox" checked={!isIgnore} onChange={toggleArmor} />
            {name}
          </label>
        </Modal>
      }
    </>
  )
}

export default ArmorName
