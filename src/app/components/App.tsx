import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import baseSkillList from '~/generated/skillList.json'
import { useSkillLog } from '../hooks/skillLog'
import { partition } from '../util/array'
import About from './about/About'
import Actions from './actions/Actions'
import Defs from './defs/Defs'
import EmptySlots from './emptySlots/EmptySlots'
import Header from './header/Header'
import PageTop from './pageTop/PageTop'
import Result from './result/Result'
import Skill from './skill/Skill'
import Weapon from './weapon/Weapon'

require('./App.css')

const allSkillList = baseSkillList.slice()

const App: React.FC = () => {
  const skillLog = useSkillLog()
  const [skillFilter, setSkillFilter] = useState('')
  const [isShowAbout, hideAbout] = useReducer(() => false, true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const outputAreaRef = useRef<HTMLDivElement>(null)

  const skillList = useMemo(() => {
    const sorted = allSkillList.sort((a, b) =>
      (skillLog[b.name] || 0) - (skillLog[a.name] || 0)
    )

    const [t, f] = partition(sorted, (v) =>
      !skillFilter || v.name.includes(skillFilter) || v.category === skillFilter
    )

    return [...t, ...f]
  }, [skillFilter, skillLog])

  const resetSkillScroll = useCallback(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [])

  const scrollOutputArea = useCallback(() => {
    hideAbout()

    if (outputAreaRef.current) {
      window.scrollTo(0, window.pageYOffset + outputAreaRef.current.getBoundingClientRect().top)
    }
  }, [])

  // スキルの並びが変更したとき、スキルのスクロールをリセットする
  useEffect(() => { scrollRef.current?.scrollTo(0, 0) }, skillList.map(v => v.name))

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="App-inputArea">
          <div className="App-inputScroll" ref={scrollRef}>
            <Weapon />
            <Skill skillList={skillList} skillFilter={skillFilter} setSkillFilter={setSkillFilter} />
          </div>
          <div className="App-sticky">
            <Defs />
            <Actions
              skillList={skillList.map((skill => skill.name))}
              resetSkillScroll={resetSkillScroll}
              scrollOutputArea={scrollOutputArea}
            />
            <EmptySlots />
          </div>
        </div>
        <div className="App-outputArea" ref={outputAreaRef}>
          {isShowAbout ? <About /> : <Result />}
        </div>
      </main>
      <PageTop />
    </div>
  )
}

export default App
