import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import baseSkillList from '~/app/data/skill.json'
import useAddableSkill from '~/app/hooks/useAddableSkill'
import useResult from '~/app/hooks/useResult'
import useSkill from '~/app/hooks/useSkill'
import useDecos from '../hooks/useDecos'
import useIgnoreArmors from '../hooks/useIgnoreArmors'
import useSkillLog from '../hooks/useSkillLog'
import useWeaponSlots from '../hooks/useWeaponSlots'
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

const tabKeyList = ['result', 'armors', 'decos']
const allSkillList = baseSkillList.slice()

const App: React.FC = () => {
  const [activeSkill, updateActiveSkill, clearActiveSkill] = useSkill()
  const [addableSkill, calcAddableSkill, clearAddableSkill] = useAddableSkill()
  const [skillLog, updateSkillLog] = useSkillLog()
  const [weaponSlots, setWeaponSlot] = useWeaponSlots()
  const [ignoreArmors, toggleIgnoreArmors] = useIgnoreArmors()
  const [decos, setDeco] = useDecos()
  const [skillFilter, setSkillFilter] = useState('')
  const [tab, setTab] = useState(tabKeyList[0])
  const [result, search, searchList] = useResult()
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

  const onSearch = useCallback(() => {
    clearAddableSkill()
    updateSkillLog(activeSkill)

    search(activeSkill, weaponSlots, ignoreArmors, decos)
    setTab('result')

    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    if (outputAreaRef.current) {
      window.scrollTo(0, window.pageYOffset + outputAreaRef.current.getBoundingClientRect().top)
    }
  }, [activeSkill, weaponSlots, ignoreArmors, decos, search])

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

  const searchAddableSkill = useCallback(() => {
    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    calcAddableSkill(activeSkill, weaponSlots, ignoreArmors, decos, skillList.map(({ id }) => id))
  }, [activeSkill, weaponSlots, ignoreArmors, decos, skillList])

  const clear = useCallback(() => {
    clearActiveSkill()
    clearAddableSkill()
    terminate()
  }, [])

  // 初回検索
  useEffect(() => {
    search(activeSkill, weaponSlots, ignoreArmors, decos)
  }, [])

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
              addableSkill={addableSkill}
              updateActiveSkill={updateActiveSkill}
            />
          </div>
          <Weapon slots={weaponSlots} setSlot={setWeaponSlot} />
          <div className="App-actions">
            <ActionButton label="検索" onClick={onSearch} primary />
            <ActionButton label="クリア" onClick={clear} />
            <ActionButton label="10件検索β" onClick={onSearchList} />
            <ActionButton label="追加スキルβ" onClick={searchAddableSkill} />
          </div>
        </div>
        <div className="App-outputArea" ref={outputAreaRef}>
          <div className="App-outputTab">
            <Tab value={tab} list={tabKeyList} onSelect={setTab} />
          </div>
          <div className="App-outputContent">
            {tab === 'result' &&
              <Result
                def={result.def}
                slot1={result.slot1}
                slot2={result.slot2}
                slot3={result.slot3}
                slot4={result.slot4}
                list={result.list}
              />
            }
            {tab === 'armors' &&
              <Armors
                ignoreArmors={ignoreArmors}
                toggleIgnoreArmors={toggleIgnoreArmors}
              />
            }
            {tab === 'decos' &&
              <Decos
                decos={decos}
                setDeco={setDeco}
              />
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
