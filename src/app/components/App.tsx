import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import allSkillList from '~/app/data/skill.json'
import useSkill, { Skill as ISkill } from '~/app/hooks/useSkill'
import search, { Result as IResult } from '../service/search'
import ClearButton from './actions/ClearButton'
import SearchButton from './actions/SearchButton'
import Header from './header/Header'
import Result from './result/Result'
import Skill from './skill/Skill'
import SkillFilter from './skill/SkillFilter'

require('./App.css')

const STORAGE_KEY = 'mhw-simulator/skillLog/v1'

const initSkillLogState: ISkill = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

const App: React.FC = () => {
  const [activeSkill, updateActiveSkill, clearActiveSkill] = useSkill()
  const [skillLog, setSkillLog] = useState(initSkillLogState as ISkill)
  const [skillFilter, setSkillFilter] = useState('')
  const [result, setResult] = useState(null as IResult | null)
  const skillRef = useRef<HTMLDivElement>(null)

  const skillList = useMemo(() => {
    return allSkillList
      .filter((v) => !skillFilter || ~v.name.indexOf(skillFilter) || v.category === skillFilter)
      .sort((a, b) => (skillLog[b.id] || 0) - (skillLog[a.id] || 0))
  }, [skillFilter, skillLog])

  // 初回検索
  useEffect(() => {
    search(activeSkill).then(setResult)
  }, [])

  // skillLog変更時
  useLayoutEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skillLog))

    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }
  }, [skillLog])

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="App-inputArea">
          <SkillFilter value={skillFilter} setValue={setSkillFilter} />
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
