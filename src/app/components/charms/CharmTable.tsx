import { useTranslation } from 'react-i18next'
import Table from '../common/Table'
import { Armors } from '~/app/modules/ignoreArmors'
import { charm } from '~/app/util/generatedUtil'

require('./CharmTable.css')

interface Props {
  charmGroups: [string, string[]][]
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}

// TODO: i18n
const levelList = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']

const CharmTable: React.FC<Props> = ({ charmGroups, ignoreArmors, toggleIgnoreArmors }) => {
  const [tEquips] = useTranslation('equips')
  const [tSkill] = useTranslation('skills')

  return (
    <Table className="CharmTable" hoverable>
      <tbody>
        <tr>
          <th></th>
          {levelList.map((v) =>
            <th key={v} className="CharmTable-checkboxCell">{v}</th>
          )}
        </tr>
        {charmGroups.map(([group, list]) =>
          <tr key={group}>
            <td>
              {tEquips(group)}
              <span className="CharmTable-skills">
                {charm[list[0]].skill.map(v => tSkill(v.name)).join(', ')}
              </span>
            </td>
            {list.map((name) =>
              <td key={name} className="CharmTable-checkboxCell">
                <input
                  type="checkbox"
                  checked={ignoreArmors[name] !== 0}
                  onChange={() => { toggleIgnoreArmors(name) }}
                />
              </td>
            )}
            {Array.from({ length: 5 - list.length }).map((_, i) =>
              <td key={i}></td>
            )}
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default CharmTable
