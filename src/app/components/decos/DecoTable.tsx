import React from 'react'
import { useTranslation } from 'react-i18next'
import { Decos } from '~/app/modules/decos'
import { deco } from '~/app/util/generatedUtil'
import toNumber from '~/app/util/toNumber'
import Table from '../common/Table'
import TextFild from '../common/TextFild'

require('./DecoTable.css')

interface Props {
  decoList: string[]
  decos: Decos
  setDeco: (deco: string, value: number | null) => void
}

const DecoTable: React.FC<Props> = ({ decoList, decos, setDeco }) => {
  const { t } = useTranslation()
  const [tDeco] = useTranslation('decos')
  const [tSkill] = useTranslation('skills')

  return (
    <Table className="DecoTable" hoverable>
      <tbody>
        <tr>
          <th></th>
          <th>{t('個数')}</th>
        </tr>
        {decoList.map((name) =>
          <tr key={name}>
            <td>
              {tDeco(name)}
              <span className="DecoTable-skills">
                {deco[name].skill.map(v => tSkill(v.name)).join(' ')}
              </span>
            </td>
            <td key={name}>
              <TextFild
                className="DecoTable-numberInput"
                type="number"
                min="0"
                max="99"
                value={decos[name] ?? ''}
                onChange={e => setDeco(name, toNumber(e.currentTarget.value))}
              />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default DecoTable
