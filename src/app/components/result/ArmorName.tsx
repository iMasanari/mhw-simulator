import React, { useCallback, useState } from 'react'
import { arm, body, charm, head, leg, wst } from '~/app/data'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import { getArmInfo, getBodyInfo, getCharmInfo, getHeadInfo, getLegInfo, getWstInfo } from '~/app/util/generatedUtil'
import Table from '../common/Table'
import Modal from '../modal/Modal'
import SkillTable from './SkillTable'
import SlotTable from './SlotTable'

require('./ArmorName.css')

const info: Record<string, typeof getHeadInfo> = {
  xa: getArmInfo,
  xb: getBodyInfo,
  xh: getHeadInfo,
  xw: getWstInfo,
  xl: getLegInfo,
  xc: getCharmInfo,
}

const getEquipInfo = (type: string | undefined, name: string) => {
  const fn = info[type!]

  return fn ? fn(name) : null
}

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
  const type = id && id.slice(0, 2)
  const name = id ? list[type!][id] : '装備なし'

  const ignoreArmor = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const toggleArmor = useCallback(() => id && toggle(id), [id])

  const isIgnore = id && ignoreArmor[id] === 0

  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = useCallback(() => setModalOpen(state => !state), [])

  const info = isModalOpen ? getEquipInfo(type, name) : null

  return (
    <>
      <span className={`ArmorName ${id ? 'on' : ''}`} onClick={id ? toggleModal : undefined}>
        {name}
      </span>
      {info &&
        <Modal title={name} onClose={toggleModal}>
          <Table className="ArmorName-table">
            <tbody>
              <tr>
                <th colSpan={3}>防御力</th>
                <th colSpan={5}>属性耐性</th>
              </tr>
              <tr>
                <th>初期</th>
                <th>最大</th>
                <th>ｶｽﾀﾑ</th>
                <th>火</th>
                <th>水</th>
                <th>雷</th>
                <th>氷</th>
                <th>龍</th>
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
