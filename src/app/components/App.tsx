import React, { useCallback, useMemo, useRef, useState } from 'react'
import baseSkillList from '~/generated/skillList.json'
import { useSkillLog } from '../hooks/skillLog'
import { useTab } from '../hooks/tab'
import { partition } from '../util/array'
import Actions from './actions/Actions'
import Armors from './armors/Armors'
import Charms from './charms/Charms'
import Decos from './decos/Decos'
import Header from './header/Header'
import Result from './result/Result'
import Skill from './skill/Skill'
import SkillFilter from './skill/SkillFilter'
import Tab from './tab/Tab'
import Weapon from './weapon/Weapon'

require('./App.css')

const allSkillList = baseSkillList.slice()

const App: React.FC = () => {
  const skillLog = useSkillLog()
  const [skillFilter, setSkillFilter] = useState('')
  const tab = useTab()
  const skillRef = useRef<HTMLDivElement>(null)
  const outputAreaRef = useRef<HTMLDivElement>(null)

  const skillList = useMemo(() => {
    const sorted = allSkillList.sort((a, b) =>
      (skillLog[b.name] || 0) - (skillLog[a.name] || 0)
    )

    const [t, f] = partition(sorted, (v) =>
      !skillFilter || ~v.name.indexOf(skillFilter) || v.category === skillFilter
    )

    return [...t, ...f]
  }, [skillFilter, skillLog])

  const resetSkillScroll = useCallback(() => {
    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }
  }, [])

  const scrollOutputArea = useCallback(() => {
    if (outputAreaRef.current) {
      window.scrollTo(0, window.pageYOffset + outputAreaRef.current.getBoundingClientRect().top)
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="App-inputArea">
          <SkillFilter value={skillFilter} setValue={setSkillFilter} />
          <div className="App-skill" ref={skillRef}>
            <Skill skillList={skillList} />
          </div>
          <Weapon />
          <div className="App-actions">
            <Actions
              skillList={skillList.map((skill => skill.name))}
              resetSkillScroll={resetSkillScroll}
              scrollOutputArea={scrollOutputArea}
            />
          </div>
        </div>
        <div className="App-outputArea" ref={outputAreaRef}>
          <div className="App-outputTab">
            <Tab />
          </div>
          <div className="App-outputContent">
            {tab === 'result' &&
              <Result />
            }
            {tab === 'armors' &&
              <Armors />
            }
            {tab === 'charms' &&
              <Charms />
            }
            {tab === 'decos' &&
              <Decos />
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
