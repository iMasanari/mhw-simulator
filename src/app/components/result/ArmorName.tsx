import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { arm, body, charm, head, leg, wst } from '~/app/util/generatedUtil'
import Table from '../common/Table'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'
import SlotTable from './SlotTable'

require('./ArmorName.css')

const info: Record<string, typeof arm> = { arm, body, charm, head, leg, wst }

const getEquipInfo = (type: string, name: string) => {
  const ref = info[type]

  return ref ? ref[name] : null
}

interface Props {
  name: string | undefined
  type: string
}

const ArmorName: React.FC<Props> = ({ name, type }) => {
  const { t } = useTranslation()
  const ignoreArmor = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const toggleArmor = useCallback(() => name && toggle(name), [name])

  const isIgnore = name && ignoreArmor[name] === 0

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? getEquipInfo(type, name!) : null

  return (
    <>
      <span className={`ArmorName ${name ? 'on' : ''}`} onClick={name ? toggleModal : undefined}>
        {name || t('装備なし')}
      </span>
      {info &&
        <Modal title={name} onClose={toggleModal}>
          <Table className="ArmorName-table">
            <tbody>
              <tr>
                <th colSpan={3}>{t('防御力')}</th>
                <th colSpan={5}>{t('属性耐性')}</th>
              </tr>
              <tr>
                <th>{t('初期')}</th>
                <th>{t('最大')}</th>
                <th>{t('ｶｽﾀﾑ')}</th>
                <th>{t('火')}</th>
                <th>{t('水')}</th>
                <th>{t('雷')}</th>
                <th>{t('氷')}</th>
                <th>{t('龍')}</th>
              </tr>
              <tr>
                <td>{info.def}</td>
                <td>{info.maxDef}</td>
                <td>{info.customDef}</td>
                <td>{info.fire}</td>
                <td>{info.water}</td>
                <td>{info.thunder}</td>
                <td>{info.ice}</td>
                <td>{info.dragon}</td>
              </tr>
            </tbody>
          </Table>
          <SlotTable slots={[info.slot1, info.slot2, info.slot3]} />
          <SkillTable skillList={info.skill} />
          <p>{t('検索で防具を除外する場合、下記のチェックを外してください。')}</p>
          <label>
            <input type="checkbox" checked={!isIgnore} onChange={toggleArmor} />
            {' '}
            {name}
          </label>
        </Modal>
      }
    </>
  )
}

export default ArmorName
