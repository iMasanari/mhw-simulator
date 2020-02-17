import React, { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import Armors from '../armors/Armors'
import Charms from '../charms/Charms'
import Decos from '../decos/Decos'
import Modal from '../modal/Modal'

require('./HeaderNav.css')

interface Props {
}

const HeaderNav: React.FC<Props> = () => {
  const { t } = useTranslation()
  const [state, dispatch] = useReducer((state: Record<string, boolean>, type: string) => (
    { ...state, [type]: !state[type] }
  ), {})

  const list: [string, React.FC][] = [
    [t('防具設定'), Armors],
    [t('護石設定'), Charms],
    [t('装飾品設定'), Decos],
  ]

  return (
    <ul className="HeaderNav">
      {list.map(([name, Component]) =>
        <React.Fragment key={name}>
          <li className="HeaderNav-li" onClick={() => dispatch(name)}          >
            {name}
          </li>
          {state[name] &&
            <Modal className="HeaderNav-modal" title={name} onClose={() => dispatch(name)}>
              <Component />
            </Modal>
          }
        </React.Fragment>
      )}
    </ul>
  )
}

export default HeaderNav
