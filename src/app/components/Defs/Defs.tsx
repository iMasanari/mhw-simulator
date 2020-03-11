import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDefs, useDefsActions } from '~/app/hooks/defs'
import { DEF, DRAGON, FIRE, ICE, THUNDER, WATER } from '~/app/util/baseLp/modules/def'
import toNumber from '~/app/util/toNumber'
import Accordion from '../common/Accordion'

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
          </tbody>
        </table>
      </div>
    </Accordion>
  )
}

export default Defs
