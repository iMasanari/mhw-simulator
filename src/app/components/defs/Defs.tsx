import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Accordion from '../common/Accordion'
import { useDefs, useDefsActions } from '~/app/hooks/defs'
import { DEF, DRAGON, FIRE, ICE, THUNDER, WATER } from '~/app/util/baseLp/modules/def'
import { SLOT_1, SLOT_2, SLOT_3, SLOT_4 } from '~/app/util/baseLp/modules/slots'
import toNumber from '~/app/util/toNumber'

require('./Defs.css')

interface Props {
}

const Defs: React.FC<Props> = () => {
  const { t } = useTranslation()
  const defs = useDefs()
  const { set } = useDefsActions()
  const isActive = useMemo(() => Object.keys(defs).length != 0, [defs])

  return (
    <Accordion title={`${t('追加条件')} ${isActive ? t('あり') : t('なし')}`}>
      <div className="Defs-content">
        <table className="Defs-table">
          <tbody>
            <tr>
              <th className="Defs-text">
                {t('防御力')}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  min="1"
                  className="Defs-input"
                  value={defs[DEF] ?? ''}
                  onChange={(e) => set(DEF, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('火')}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  className="Defs-input"
                  value={defs[FIRE] ?? ''}
                  onChange={(e) => set(FIRE, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('水')}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  className="Defs-input"
                  value={defs[WATER] ?? ''}
                  onChange={(e) => set(WATER, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('雷')}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  className="Defs-input"
                  value={defs[THUNDER] ?? ''}
                  onChange={(e) => set(THUNDER, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('氷')}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  className="Defs-input"
                  value={defs[ICE] ?? ''}
                  onChange={(e) => set(ICE, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('龍')}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  className="Defs-input"
                  value={defs[DRAGON] ?? ''}
                  onChange={(e) => set(DRAGON, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('空きスロット数 Lv{{level}}以上', { level: 1 })}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  min="1"
                  className="Defs-input"
                  value={defs[SLOT_1] ?? ''}
                  onChange={(e) => set(SLOT_1, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('空きスロット数 Lv{{level}}以上', { level: 2 })}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  min="1"
                  className="Defs-input"
                  value={defs[SLOT_2] ?? ''}
                  onChange={(e) => set(SLOT_2, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('空きスロット数 Lv{{level}}以上', { level: 3 })}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  min="1"
                  className="Defs-input"
                  value={defs[SLOT_3] ?? ''}
                  onChange={(e) => set(SLOT_3, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
            <tr>
              <th className="Defs-text">
                {t('空きスロット数 Lv{{level}}以上', { level: 4 })}
              </th>
              <td className="Defs-slot">
                <input
                  type="number"
                  min="1"
                  className="Defs-input"
                  value={defs[SLOT_4] ?? ''}
                  onChange={(e) => set(SLOT_4, toNumber(e.currentTarget.value))}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Accordion>
  )
}

export default Defs
