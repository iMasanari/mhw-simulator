import React, { useState } from 'react'
import useSkill from '~/app/hooks/useSkill'
import { Result as IResult } from '../service/search'
import ClearButton from './actions/ClearButton'
import SearchButton from './actions/SearchButton'
import Header from './header/Header'
import Result from './result/Result'
import Skill from './skill/Skill'

require('./App.css')

const App: React.FC = () => {
  const [activeSkill, updateActiveSkill, clearActiveSkill] = useSkill()
  const [result, setResult] = useState(null as IResult | null)

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="App-inputArea">
          <div className="App-skill">
            <Skill activeSkill={activeSkill} updateActiveSkill={updateActiveSkill} />
          </div>
          <div className="App-searchButton">
            <SearchButton skill={activeSkill} setResult={setResult} />
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
