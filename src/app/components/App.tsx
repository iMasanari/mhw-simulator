import React, { useState } from 'react'
import useSkill from '~/app/hooks/useSkill'
import { Result as IResult } from '../service/search'
import Result from './result/Result'
import SearchButton from './SearchButton'
import Skill from './skill/Skill'

require('./App.css')

const App: React.FC = () => {
  const [activeSkill, updateActiveSkill] = useSkill()
  const [result, setResult] = useState(null as IResult | null)

  return (
    <div className="App">
      <div className="App-inputArea">
        <div className="App-skill">
          <Skill activeSkill={activeSkill} updateActiveSkill={updateActiveSkill} />
        </div>
        <div className="App-searchButton">
          <SearchButton skill={activeSkill} setResult={setResult} />
        </div>
      </div>
      <div className="App-outputArea">
        {!!result && <Result result={result} />}
      </div>
    </div>
  )
}

export default App
