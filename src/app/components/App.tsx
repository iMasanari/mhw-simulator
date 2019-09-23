import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import allSkillList from '~/app/data/skill.json'
import useSkill, { Skill as ISkill } from '~/app/hooks/useSkill'
import { Result as IResult } from '../service/search'
import ClearButton from './actions/ClearButton'
import SearchButton from './actions/SearchButton'
import Header from './header/Header'
import Result from './result/Result'
import Skill from './skill/Skill'

require('./App.css')

const App: React.FC = () => {
  const [activeSkill, updateActiveSkill, clearActiveSkill] = useSkill()
  const [skillLog, setSkillLog] = useState({} as ISkill)
  const [result, setResult] = useState(null as IResult | null)
  const skillRef = useRef<HTMLDivElement>(null)

  const skillList = useMemo(() => {
    return allSkillList.slice()
      .sort((a, b) => (skillLog[b.id] || 0) - (skillLog[a.id] || 0))
  }, [skillLog])

  useLayoutEffect(() => {
    if (!skillRef.current) return

    skillRef.current.scrollTo(0, 0)
  }, [skillLog])

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="App-inputArea">
          <div className="App-skill" ref={skillRef}>
            <Skill
              skillList={skillList}
              activeSkill={activeSkill}
              updateActiveSkill={updateActiveSkill}
            />
          </div>
          <div className="App-searchButton">
            <SearchButton
              skill={activeSkill}
              setResult={setResult}
              setSkillLog={setSkillLog}
            />
            <ClearButton onClick={clearActiveSkill} />
          </div>
        </div>
        <div className="App-outputArea">
          {!!result && <Result result={result} />}
        </div>
      </main>
    </div>
  )
}

export default App
