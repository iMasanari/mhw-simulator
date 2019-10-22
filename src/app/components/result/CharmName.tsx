import React, { useCallback, useState } from 'react'
import { charm } from '~/app/data'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { getCharmInfo } from '~/app/util/generatedUtil'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'

require('./CharmName.css')

interface Props {
  id: string | undefined
}

const CharmName: React.FC<Props> = ({ id }) => {
  const name = id ? (charm as Record<string, string>)[id] : '装備なし'

  const ignoreArmor = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const toggleArmor = useCallback(() => id && toggle(id), [id])

  const isIgnore = id && ignoreArmor[id] === 0

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? getCharmInfo(name) : null

  return (
    <>
      <span className={`CharmName ${id ? 'on' : ''}`} onClick={id ? toggleModal : undefined}>
        {name}
      </span>
      {info &&
        <Modal title={name} onClose={toggleModal}>
          <SkillTable skillList={info.skill} />
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

export default CharmName
