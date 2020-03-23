import React from 'react'
import { useTranslation } from 'react-i18next'
import { Equipment } from '~/app/util/calc'
import Table from '../common/Table'
import ArmorName from './ArmorName'
import CharmName from './CharmName'
import DecoName from './DecoName'

require('./EquipmentTable.css')

interface Props {
  equipment: Equipment
}

const EquipmentTable: React.FC<Props> = ({ equipment }) => {
  const { t } = useTranslation()
  const [tSkill] = useTranslation('skills')

  return (
    <Table className="EquipmentTable">
      <tbody>
        <tr>
          <th>{t('防御力')}</th>
          <td>{equipment.def}</td>
        </tr>
        {equipment.weaponSkill !== 'none' && (
          <tr>
            <th>{t('覚醒スキル')}</th>
            <td>
              {equipment.weaponSkill === 'なし'
                ? t('なし')
                : tSkill(equipment.weaponSkill!)
              }
            </td>
          </tr>
        )}
        <tr>
          <th>{t('頭装備')}</th>
          <td><ArmorName type="head" name={equipment.head} /></td>
        </tr>
        <tr>
          <th>{t('胴装備')}</th>
          <td><ArmorName type="body" name={equipment.body} /></td>
        </tr>
        <tr>
          <th>{t('腕装備')}</th>
          <td><ArmorName type="arm" name={equipment.arm} /></td>
        </tr>
        <tr>
          <th>{t('腰装備')}</th>
          <td><ArmorName type="wst" name={equipment.wst} /></td>
        </tr>
        <tr>
          <th>{t('足装備')}</th>
          <td><ArmorName type="leg" name={equipment.leg} /></td>
        </tr>
        <tr>
          <th>{t('護石')}</th>
          <td><CharmName name={equipment.charm} /></td>
        </tr>
        <tr>
          <th>{t('装飾品例')}</th>
          <td>
            <ul className="EquipmentTable-decos">
              {equipment.decos.map(({ name, value }) =>
                <li key={name}><DecoName name={name} /> x{value}</li>
              )}
              {!!equipment.slot1 &&
                <li>{t('空きスロット【{{level}}】', { level: 1 })} x{equipment.slot1}</li>
              }
              {!!equipment.slot2 &&
                <li>{t('空きスロット【{{level}}】', { level: 2 })} x{equipment.slot2}</li>
              }
              {!!equipment.slot3 &&
                <li>{t('空きスロット【{{level}}】', { level: 3 })} x{equipment.slot3}</li>
              }
              {!!equipment.slot4 &&
                <li>{t('空きスロット【{{level}}】', { level: 4 })} x{equipment.slot4}</li>
              }
            </ul>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default EquipmentTable
