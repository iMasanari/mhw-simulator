import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import baseSkillList from '../data/skill.json'
import { useActiveSkill, useActiveSkillActions } from '../hooks/activeSkill'
import { useAddableSkillActions } from '../hooks/addableSkill'
import { useDecos } from '../hooks/decos'
import { useIgnoreArmors } from '../hooks/ignoreArmors'
import { useResultActions } from '../hooks/result'
import { useSkillLog, useSkillLogActions } from '../hooks/skillLog'
import { useTab, useTabActions } from '../hooks/tab'
import { useWeaponSlots } from '../hooks/weaponSlots'
import { partition } from '../util/array'
import { terminate } from '../util/calc'
import ActionButton from './actions/ActionButton'
import Armors from './armors/armors'
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
  const activeSkill = useActiveSkill()
  const { clear: clearActiveSkill } = useActiveSkillActions()
  const { search: searchAddableSkill, clear: clearAddableSkill } = useAddableSkillActions()
  const skillLog = useSkillLog()
  const { update: updateSkillLog } = useSkillLogActions()
  const weaponSlots = useWeaponSlots()
  const ignoreArmors = useIgnoreArmors()
  const decos = useDecos()
  const [skillFilter, setSkillFilter] = useState('')
  const tab = useTab()
  const { set: setTab } = useTabActions()
  const { searchSummary, searchList } = useResultActions()
  const skillRef = useRef<HTMLDivElement>(null)
  const outputAreaRef = useRef<HTMLDivElement>(null)

  const skillList = useMemo(() => {
    const sorted = allSkillList.sort((a, b) =>
      (skillLog[b.id] || 0) - (skillLog[a.id] || 0)
    )

    const [t, f] = partition(sorted, (v) =>
      !skillFilter || ~v.name.indexOf(skillFilter) || v.category === skillFilter
    )

    return [...t, ...f]
  }, [skillFilter, skillLog])

  const onSearchSummary = useCallback(() => {
    clearAddableSkill()
    updateSkillLog(activeSkill)

    searchSummary(activeSkill, weaponSlots, ignoreArmors, decos)
    setTab('result')

    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    if (outputAreaRef.current) {
      window.scrollTo(0, window.pageYOffset + outputAreaRef.current.getBoundingClientRect().top)
    }
  }, [activeSkill, weaponSlots, ignoreArmors, decos, searchSummary])

  const onSearchList = useCallback(() => {
    clearAddableSkill()
    updateSkillLog(activeSkill)

    searchList(activeSkill, weaponSlots, ignoreArmors, decos)
    setTab('result')

    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    if (outputAreaRef.current) {
      window.scrollTo(0, window.pageYOffset + outputAreaRef.current.getBoundingClientRect().top)
    }
  }, [activeSkill, weaponSlots, ignoreArmors, decos, searchList])

  const onSearchAddableSkill = useCallback(() => {
    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    searchAddableSkill(activeSkill, weaponSlots, ignoreArmors, decos, skillList.map(({ id }) => id))
  }, [activeSkill, weaponSlots, ignoreArmors, decos, skillList])

  const clear = useCallback(() => {
    clearActiveSkill()
    clearAddableSkill()
    terminate()
  }, [])

  // 初回検索
  useEffect(() => {
    searchSummary(activeSkill, weaponSlots, ignoreArmors, decos)
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
            <ActionButton label="検索" onClick={onSearchSummary} primary />
            <ActionButton label="クリア" onClick={clear} />
            <ActionButton label="10件検索β" onClick={onSearchList} />
            <ActionButton label="追加スキルβ" onClick={onSearchAddableSkill} />
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
