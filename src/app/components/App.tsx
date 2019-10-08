import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import allSkillList from '~/app/data/skill.json'
import useAddableSkill from '~/app/hooks/useAddableSkill'
import useResult from '~/app/hooks/useResult'
import useSkill, { Skill as ISkill } from '~/app/hooks/useSkill'
import useDecos from '../hooks/useDecos'
import useIgnoreArmors from '../hooks/useIgnoreArmors'
import useWeaponSlots from '../hooks/useWeaponSlots'
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

const STORAGE_KEY = 'mhw-simulator/skillLog/v1.1'

const initSkillLogState: ISkill = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

const tabKeyList = ['result', 'armors', 'decos']

const App: React.FC = () => {
  const [activeSkill, updateActiveSkill, clearActiveSkill] = useSkill()
  const [addableSkill, calcAddableSkill, clearAddableSkill] = useAddableSkill()
  const [skillLog, setSkillLog] = useState(initSkillLogState)
  const [weaponSlots, setWeaponSlot] = useWeaponSlots()
  const [ignoreArmors, toggleIgnoreArmors] = useIgnoreArmors()
  const [decos, setDeco] = useDecos()
  const [skillFilter, setSkillFilter] = useState('')
  const [tab, setTab] = useState(tabKeyList[0])
  const [result, search] = useResult()
  const skillRef = useRef<HTMLDivElement>(null)
  const outputAreaRef = useRef(null as HTMLDivElement | null)

  const skillList = useMemo(() => {
    return allSkillList
      .filter((v) => !skillFilter || ~v.name.indexOf(skillFilter) || v.category === skillFilter)
      .sort((a, b) => (skillLog[b.id] || 0) - (skillLog[a.id] || 0))
  }, [skillFilter, skillLog])

  const onSearch = useCallback(() => {
    clearAddableSkill()

    const time = Date.now()
    const log = Object.keys(activeSkill).reduce(
      (acc, key) => (acc[key] = time + activeSkill[key], acc),
      {} as ISkill
    )

    setSkillLog(state => ({ ...state, ...log }))

    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    search(activeSkill, weaponSlots, ignoreArmors, decos)
    setTab('result')

    if (outputAreaRef.current) {
      window.scrollTo(0, window.pageYOffset + outputAreaRef.current.getBoundingClientRect().top)
    }
  }, [activeSkill, weaponSlots, ignoreArmors, decos, skillList, search, calcAddableSkill])

  const searchAddableSkill = useCallback(() => {
    if (skillRef.current) {
      skillRef.current.scrollTo(0, 0)
    }

    calcAddableSkill(activeSkill, weaponSlots, ignoreArmors, decos, skillList.map(({ id }) => id))
  }, [activeSkill, weaponSlots, ignoreArmors, decos, skillList])

  const clear = useCallback(() => {
    clearActiveSkill()
    onSearch()
  }, [clearActiveSkill, onSearch])

  // 初回検索
  useEffect(() => {
    search(activeSkill, weaponSlots, ignoreArmors, decos)
  }, [])

  // skillLog変更時
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skillLog))
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
              addableSkill={addableSkill}
              updateActiveSkill={updateActiveSkill}
            />
          </div>
          <Weapon slots={weaponSlots} setSlot={setWeaponSlot} />
          <div className="App-actions">
            <ActionButton label="検索" onClick={onSearch} primary />
            <ActionButton label="クリア" onClick={clear} />
            <ActionButton label="追加スキル検索β" onClick={searchAddableSkill} />
          </div>
        </div>
        <div className="App-outputArea" ref={outputAreaRef}>
          <div className="App-outputTab">
            <Tab value={tab} list={tabKeyList} onSelect={setTab} />
          </div>
          <div className="App-outputContent">
            {tab === 'result' &&
              <div>
                {!!result.def &&
                  <Result
                    title={`防御力最大: ${result.def.def}`}
                    result={result.def}
                    initState={true}
                  />
                }
                {!!result.slot1 &&
                  <Result
                    title={`空きスロット最大: ${result.slot1.slot1 + result.slot1.slot2 + result.slot1.slot3 + result.slot1.slot4}`}
                    result={result.slot1}
                  />
                }
                {!!result.slot2 &&
                  <Result
                    title={`空きスロット(Lv2以上)最大: ${result.slot2.slot2 + result.slot2.slot3 + result.slot2.slot4}`}
                    result={result.slot2}
                  />
                }
                {!!result.slot3 &&
                  <Result
                    title={`空きスロット(Lv3以上)最大: ${result.slot3.slot3 + result.slot3.slot4}`}
                    result={result.slot3}
                  />
                }
                {!!result.slot4 &&
                  <Result
                    title={`空きスロット(Lv4)最大: ${result.slot4.slot4}`}
                    result={result.slot4}
                  />
                }
              </div>
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
